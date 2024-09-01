import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios';
import { useFormik } from 'formik'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, Divider, Grid, Snackbar, TextField} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


export default function AddCourse(props) {
    const [open, setOpen] = useState(false);
    const [tutorials, setTutorials] = useState([])
    const [teachers, setTeachers] = useState([])
    const [opensnackbar, setOpensnackbar] = useState(false)
    const [alertType, setAlertType] = useState('error')
    const [alertMassage, setAlertMassage] = useState("")
    const jwtToken = Cookies.get("user_data")

    const startPart = [
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
    ]

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/tutorials", { headers: { Authorization: `Bearer ${jwtToken}` } })
            .then(function (response) {
                setTutorials(response.data)
            }).catch(function (error) {})
        
        axios
            .get("http://localhost:5000/api/teachers", { headers: { Authorization: `Bearer ${jwtToken}` } })
            .then(function (response) {
                setTeachers(response.data)
            }).catch(function (error) {})
        
    })


    const formik = useFormik({
        initialValues: {
            tutorialID: null,
            teacherID: null,
            startDate: "",
            startTime: null,
            endTime: null,
            dayType : 1,
        },

        onSubmit: (values) => {
            const newValue = {
                ...values,
                tutorialID: values.tutorialID.tutorialID ?? 0,
                teacherID: values.teacherID.teacherID ?? 0,
            };

            axios.post(
                "http://localhost:5000/api/courses",
                newValue,
                { headers: { Authorization: `Bearer ${jwtToken}` } }
            ).then(function (response) {
                setAlertMassage("ثبت دوره با موفقیت انجام شد")
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
                افزودن دوره
            </Button>
            <Dialog maxWidth="sm" open={open} onClose={handleClose}>
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle sx={{ fontFamily: "medium" }}>
                        {"انتخاب دوره"}
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    id='tutorialID'
                                    fullWidth
                                    disableClearable
                                    value={formik.values.tutorialID}
                                    options={tutorials}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(e, newValue) => {
                                        formik.setFieldValue("tutorialID", newValue)
                                    }}
                                    renderInput={(params) => <TextField {...params} label="نام آموزش" />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    id='teacherID'
                                    value={formik.values.teacherID}
                                    fullWidth
                                    disableClearable
                                    options={teachers}
                                    getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                                    onChange={(e, newValue) => {
                                        formik.setFieldValue("teacherID", newValue)
                                    }}
                                    renderInput={(params) => <TextField {...params} label="نام استاد" />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id='startDate'
                                    name='startDate'
                                    label="تاریخ شروع"
                                    type='date'
                                    fullWidth
                                    onChange={formik.handleChange}
                                    value={formik.values.startDate}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    fullWidth
                                    disableClearable
                                    id="startTime"
                                    value={formik.values.startTime}
                                    options={startPart}
                                    getOptionLabel={(option) => option}
                                    onChange={(e, newValue) => {
                                        formik.setFieldValue("startTime", newValue)
                                    }}
                                    renderInput={(params) => <TextField {...params} label="ساعت شروع" />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    fullWidth
                                    disableClearable
                                    id="endTime"
                                    value={formik.values.endTime}
                                    options={startPart}
                                    getOptionLabel={(option) => option}
                                    onChange={(e, newValue) => {
                                        formik.setFieldValue("endTime", newValue)
                                    }}
                                    renderInput={(params) => <TextField {...params} label="ساعت پایان" />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl>
                                    <FormLabel sx={{ fontFamily: "medium", fontSize: "0.9rem" }}>روز های هفته</FormLabel>
                                    <RadioGroup
                                        row
                                        name="dayType"
                                        value={formik.values.dayType}
                                        onChange={formik.handleChange}
                                    >
                                        <FormControlLabel value={0} control={<Radio />} label="فرد" />
                                        <FormControlLabel value={1} control={<Radio />} label="زوج" />
                                        <FormControlLabel value={2} control={<Radio />} label="همه روزه" />
                                    </RadioGroup>
                                </FormControl>
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
