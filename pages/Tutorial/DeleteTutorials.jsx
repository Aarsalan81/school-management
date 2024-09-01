import React, { useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography , Snackbar , Alert , Divider } from '@mui/material';

import DeleteIcon from "@mui/icons-material/DeleteForever"



export default function DeleteTutorials(props) {
    const {setIsSuccess} = props;
    const { deleteTutorial, setDeleteTutorial , item} = props;
    const [opensnackbar , setOpensnackbar] = useState(false)
    const [alertType , setAlertType] = useState("")
    const [alertMassage , setAlertMassage] = useState("")

    const handleDelete = () => {
        const jwtToken = Cookies.get("user_data")

        axios.delete(
            `http://localhost:5000/api/tutorials/${item.tutorialID}`,
            { headers: { Authorization: `Bearer ${jwtToken}` } }
        ).then(function(response){
            setOpensnackbar(true)
            setAlertType("success")
            setAlertMassage(`آموزش ${item.name} با موفقیت حذف گردید`)
            setDeleteTutorial(false)
            setIsSuccess(true)
        }).catch(function(error){
            setOpensnackbar(true)
            setAlertType("error")
            setAlertMassage(error.response.data.error)
        })
    }

    return (
        <>
            <Dialog open={deleteTutorial}>
                <DialogTitle sx={{ fontFamily: "medium" }}>
                    حذف آموزش
                </DialogTitle>
                <DialogContent sx={{textAlign:"center"}}>
                    <DeleteIcon color='error' sx={{fontSize:"2.5rem"}}/>
                    <Typography sx={{fontFamily:"medium" , marginTop:"15px"}}>
                        آیا از حذف آموزش ({item.name}) مطمئن هستید ؟
                    </Typography>
                </DialogContent>
                <Divider variant='middle' />
                <DialogActions sx={{ fontFamily: "light" }}>
                    <Button variant='text' sx={{ fontFamily: "light" }} onClick={() => setDeleteTutorial(false)}>انصراف</Button>
                    <Button variant='text' color='error' sx={{ fontFamily: "light" }} onClick={() => handleDelete()}>
                        حذف
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={opensnackbar} autoHideDuration={3000} onClose={() => setOpensnackbar(false)} anchorOrigin={{ vertical: "top", horizontal: "left" }}>
                <Alert severity={alertType} onClose={() => setOpensnackbar(false)} sx={{fontFamily:"light"}}>
                    {alertMassage}
                </Alert>
            </Snackbar>
        </>
    )
}
