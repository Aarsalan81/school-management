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


export default function DeleteStudent(props) {

    const { deleteStudent, setDeleteStudent, item, setIsSuccess } = props;
    const [opensnackbar, setOpensnackbar] = useState(false)
    const [alertType, setAlertType] = useState('error')
    const [alertMassage, setAlertMassage] = useState("")

    const deleteItem = () => {
        const jwtToken = Cookies.get("user_data")
        axios.delete(
            `http://localhost:5000/api/students/${item.studentID}`,
            { headers: { Authorization: `Bearer ${jwtToken}` } }
        ).then(function (response) {
            setOpensnackbar(true)
            setAlertType('error')
            setAlertMassage("اطلاعات با موفقیت حذف گردید")
            setIsSuccess(true)
            setDeleteStudent(false)
        }).catch(function (error) {
            setOpensnackbar(true)
            setAlertType("error")
            setAlertMassage(error.response.data.error);

        })
    }

    return (
        <>
            <Dialog maxWidth="md" open={deleteStudent}>
                <div>
                    <DialogTitle sx={{ fontFamily: "medium" }}>
                        حذف دانشجو
                    </DialogTitle>
                    <DialogContent sx={{ textAlign: "center" }}>
                        <DeleteIcon color='error' sx={{ fontSize: "2.5rem" }} />
                        <Typography sx={{ marginTop: "10px", fontFamily: "medium", fontSize: "1rem" }}>
                            آیا از حذف دانشجوی ({item.firstName + " " + item.lastName}) مطمئن هستید ؟
                        </Typography>
                    </DialogContent>
                    <Divider variant='middle' />
                    <DialogActions>
                        <Button sx={{ fontFamily: "medium" }} variant='text' color='primary' onClick={() => setDeleteStudent(false)}>انصراف</Button>
                        <Button sx={{ fontFamily: "medium" }} variant='text' color='error' onClick={() => deleteItem()}>
                            حذف
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
            <Snackbar open={opensnackbar} autoHideDuration={3000} onClose={() => setOpensnackbar(false)} anchorOrigin={{ vertical: "top", horizontal: "left" }}>
                <Alert severity={alertType} onClose={() => setOpensnackbar(false)}>
                    {alertMassage}
                </Alert>
            </Snackbar>
        </>
    )
}
