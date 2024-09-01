import React, { useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios';
import { useFormik } from 'formik'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, Divider, Grid, Snackbar, TextField, Typography } from '@mui/material';


export default function AddTutorial(props) {
    const [open, setOpen] = useState(false);
    const [opensnackbar, setOpensnackbar] = useState(false)
    const [alertType, setAlertType] = useState('error')
    const [alertMassage, setAlertMassage] = useState("")

    const formik = useFormik({
        initialValues: {
            name: "",
            sessions: "",
            price: "",

        },

        onSubmit: (values) => {
            const jwtToken = Cookies.get("user_data")
            axios.post(
                "http://localhost:5000/api/tutorials",
                values,
                { headers: { Authorization: `Bearer ${jwtToken}` } }
            ).then(function (response) {
                setAlertMassage("اطلاعات آموزش با موفقیت ثبت گردید")
                setAlertType('success')
                setOpensnackbar(true)
                handleClose()
                props.setIsSuccess(true)

            }).catch(function (error) {
                setAlertMassage(error.response.data.error);
                setAlertType("error")
                setOpensnackbar(true)

            })

            console.log(values)
        }
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant='contained' color='success' sx={{ fontFamily: "medium", display: "flex", gap: "7px" }} onClick={handleClickOpen}>
                <AddIcon />
                افزودن آموزش
            </Button>
            <Dialog maxWidth="xs" open={open} onClose={handleClose}>
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle sx={{ fontFamily: "medium" }}>
                        {"افزودن آموزش"}
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography color="gray" fontSize={"1rem"} sx={{ fontFamily: "light" }}>
                                    لطفا اطلاعات را تکمیل کنید.
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="name"
                                    name="name"
                                    label="نام آموزش"
                                    fullWidth
                                    error={formik.isSubmitting && formik.values.name === ""}
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="sessions"
                                    name="sessions"
                                    label="تعداد جلسات"
                                    fullWidth
                                    onChange={formik.handleChange}
                                    value={formik.values.sessions}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="price"
                                    name="price"
                                    label="قیمت "
                                    fullWidth
                                    onChange={formik.handleChange}
                                    value={formik.values.price}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <Divider variant='middle' />
                    <DialogActions>
                        <Button sx={{ fontFamily: "medium" }} variant='contained' color='inherit' onClick={() => handleClose()}>انصراف</Button>
                        <Button sx={{ fontFamily: "medium" }} variant='contained' type='submit'>
                            افزودن
                        </Button>
                    </DialogActions>
                </form>

            </Dialog >
            <Snackbar open={opensnackbar} autoHideDuration={3000} onClose={() => setOpensnackbar(false)} anchorOrigin={{ vertical: "top", horizontal: "left" }}>
                <Alert sx={{ fontFamily: "light" }} severity={alertType} onClose={() => setOpensnackbar(false)}>
                    {alertMassage}
                </Alert>
            </Snackbar>
        </>
    )
}
