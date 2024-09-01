import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, Divider, Grid, Snackbar, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik'
import axios from 'axios';
import Cookies from 'js-cookie'


export default function UpdateStudent(props) {
    const { editStudent, setEditStudent, item, setIsSuccess } = props;
    const [opensnackbar, setOpensnackbar] = useState(false)
    const [alertType, setAlertType] = useState('error')
    const [alertMassage, setAlertMassage] = useState("")

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            studentID: item.studentID ?? 1,
            firstName: item.firstName ?? "",
            lastName: item.lastName ?? "",
            fatherName: item.fatherName ?? "",
            sex: item.sex ?? 1,
            nationalCode: item.nationalCode ?? "",
            birthDay: item.birthDay,
            birthCity: item.birthCity ?? 1,
            mobileNumber: item.mobileNumber ?? "",
            phoneNumber: item.phoneNumber ?? "",
            address: item.address ?? "",
        },

        onSubmit: (values) => {
            const jwtToken = Cookies.get("user_data")
            axios.put(
                "http://localhost:5000/api/students",
                values,
                { headers: { Authorization: `Bearer ${jwtToken}` } }
            )
                .then(function (response) {
                    setOpensnackbar(true)
                    setAlertType('success')
                    setAlertMassage("اطلاعات با موفقیت ویرایش گردید")
                    setEditStudent(false)
                    setIsSuccess(true)
                }).catch(function (error) {
                    setAlertMassage(error.response.data.error);
                    setOpensnackbar(true)
                    setAlertType("error")

                })
            console.log(values)
        }
    })



    return (
        <>
            <Dialog maxWidth="md" open={editStudent} onClose={() => setEditStudent(false)}>
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle sx={{ fontFamily: "medium" }}>
                        ویرایش دانشجو
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography color="gray" fontSize={"1rem"} sx={{ fontFamily: "medium" }}>
                                    لطفا اطلاعات دانشجو را تکمیل کنید.
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    id="firstName"
                                    name="firstName"
                                    label="نام"
                                    fullWidth
                                    error={formik.isSubmitting && formik.values.firstName === ""}
                                    onChange={formik.handleChange}
                                    value={formik.values.firstName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    id="lastName"
                                    name="lastName"
                                    label="نام خانوادگی"
                                    fullWidth
                                    onChange={formik.handleChange}
                                    value={formik.values.lastName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    id="fatherName"
                                    name="fatherName"
                                    label="نام پدر"
                                    fullWidth
                                    onChange={formik.handleChange}
                                    value={formik.values.fatherName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    id="nationalCode"
                                    name="nationalCode"
                                    label="کد ملی"
                                    fullWidth
                                    onChange={formik.handleChange}
                                    value={formik.values.nationalCode}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    id="birthDay"
                                    name="birthDay"
                                    label="تاریخ تولد"
                                    type='date'
                                    fullWidth
                                    onChange={formik.handleChange}
                                    value={formik.values.birthDay}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    id="mobileNumber"
                                    name="mobileNumber"
                                    label="موبایل"
                                    fullWidth
                                    onChange={formik.handleChange}
                                    value={formik.values.mobileNumber}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    label="تلفن"
                                    fullWidth
                                    onChange={formik.handleChange}
                                    value={formik.values.phoneNumber}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    id="sex"
                                    name="sex"
                                    label="جنسیت"
                                    fullWidth
                                    onChange={formik.handleChange}
                                    value={formik.values.sex}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    id="birthCity"
                                    name="birthCity"
                                    label="محل تولد"
                                    fullWidth
                                    onChange={formik.handleChange}
                                    value={formik.values.birthCity}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="address"
                                    name="address"
                                    label="آدرس"
                                    fullWidth
                                    onChange={formik.handleChange}
                                    value={formik.values.address}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <Divider variant='middle' />
                    <DialogActions>
                        <Button sx={{ fontFamily: "medium" }} variant='contained' color='inherit' onClick={() => setEditStudent(false)}>انصراف</Button>
                        <Button sx={{ fontFamily: "medium" }} variant='contained' type='submit'>
                            ثبت
                        </Button>
                    </DialogActions>
                </form>

            </Dialog>
            <Snackbar open={opensnackbar} autoHideDuration={3000} onClose={() => setOpensnackbar(false)} anchorOrigin={{ vertical: "top", horizontal: "left" }}>
                <Alert severity={alertType} onClose={() => setOpensnackbar(false)}>
                    {alertMassage}
                </Alert>
            </Snackbar>
        </>
    )
}
