import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, Divider, Snackbar, Typography } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie'
import DeleteIcon from "@mui/icons-material/DeleteForever"


export default function DeleteTeacher(props) {
    
    const {deleteTeacher , setDeleteTeacher , item , setIsSuccess} = props;
    const [opensnackbar, setOpensnackbar] = useState(false)
    const [alertType, setAlertType] = useState('error')
    const [alertMassage, setAlertMassage] = useState("")

    const deleteItem = () => {
        const jwtToken = Cookies.get("user_data")
        axios.delete(
            `http://localhost:5000/api/teachers/${item.teacherID}`,
            { headers: { Authorization: `Bearer ${jwtToken}` } }
        ).then(function (response) {
            setOpensnackbar(true)
            setAlertType('error')
            setAlertMassage("اطلاعات با موفقیت حذف گردید")
            setIsSuccess(true)
            setDeleteTeacher(false)
        }).catch(function (error) {
            setOpensnackbar(true)
            setAlertType("error")
            setAlertMassage(error.response.data.error);

        })
    }
    
    return (
        <>
            <Dialog maxWidth="md" open={deleteTeacher}>
                    <DialogTitle sx={{fontFamily:"medium"}}>
                        حذف استاد
                    </DialogTitle>
                    <DialogContent sx={{textAlign:"center"}}>
                        <DeleteIcon color='error' sx={{fontSize:"2.5rem"}}/>
                        <Typography sx={{marginTop:"10px" ,fontFamily:"medium" , fontSize:"1rem"}}>
                            آیا از حذف استاد ({item.firstName+" "+item.lastName}) مطمئن هستید ؟
                        </Typography>
                    </DialogContent>
                    <Divider variant='middle' />
                    <DialogActions>
                        <Button sx={{ fontFamily: "medium" }} variant='text' color='primary' onClick={() => setDeleteTeacher(false) }>انصراف</Button>
                        <Button sx={{ fontFamily: "medium" }} variant='text' color='error' type='button' onClick={() => deleteItem()}>
                            حذف
                        </Button>
                    </DialogActions>

            </Dialog>
            <Snackbar open={opensnackbar} autoHideDuration={3000} onClose={() => setOpensnackbar(false)} anchorOrigin={{ vertical: "top", horizontal: "left" }}>
                <Alert severity={alertType} onClose={() => setOpensnackbar(false)} sx={{fontFamily:"medium"}}>
                    {alertMassage}
                </Alert>
            </Snackbar>
        </>
    )
}
