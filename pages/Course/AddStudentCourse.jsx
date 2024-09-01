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


export default function AddStudentCourse(props) {

    const {addiStudent , setAddiStudent} = props;
    const [students, setStudents] = useState([])
    const [opensnackbar, setOpensnackbar] = useState(false)
    const [alertType, setAlertType] = useState('error')
    const [alertMassage, setAlertMassage] = useState("")
    const jwtToken = Cookies.get("user_data")

    
    useEffect(() => {
        axios
            .get("http://localhost:5000/api/students", { headers: { Authorization: `Bearer ${jwtToken}` } })
            .then(function (response) {
                setStudents(response.data)
            }).catch(function (error) {})
    })


    const formik = useFormik({
        initialValues: {
            studrntID: null,
            studentName: null,
            
        },

        onSubmit: (values) => {
            const newValue = {
                ...values,
                studrntID: values.studrntID.studrntID ?? 0,
                studentName: values.studentName.studentName ?? 0,
            };

            axios.post(
                "http://localhost:5000/api/courses",
                newValue,
                { headers: { Authorization: `Bearer ${jwtToken}` } }
            ).then(function (response) {
                setAlertMassage("دانشجو به دوره اضافه شد")
                setAlertType('success')
                setOpensnackbar(true)
                setAddiStudent(false)
                props.setIsSuccess(true)

            }).catch(function (error) {
                setAlertMassage(error.response.data.error);
                setAlertType("error")
                setOpensnackbar(true)

            })

            console.log(values)
        }
    })

    
    return (
        <>
            <Button variant='contained' color='success' sx={{ fontFamily: "medium", display: "flex", gap: "7px" }} onClick={handleClickOpen}>
                <AddIcon />
                افزودن
            </Button>
            <Dialog maxWidth='sm' open={addiStudent} onClose={() => setAddiStudent(false)}>
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle sx={{ fontFamily: "medium" }}>
                        {"انتخاب دوره"}
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <Autocomplete
                                    id='studentName'
                                    fullWidth
                                    disableClearable
                                    value={formik.values.studentName}
                                    options={students}
                                    getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                                    onChange={(e, newValue) => {
                                        formik.setFieldValue("studentName", newValue)
                                    }}
                                    renderInput={(params) => <TextField {...params} label="نام دانشجو" />}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    id='studrntID'
                                    value={formik.values.studrntID}
                                    fullWidth
                                    disableClearable
                                    options={students}
                                    getOptionLabel={(option) => option.studentID}
                                    onChange={(e, newValue) => {
                                        formik.setFieldValue("studrntID", newValue)
                                    }}
                                    renderInput={(params) => <TextField {...params} label="شماره داشجو" />}
                                />
                            </Grid>
                            
                        </Grid>
                    </DialogContent>
                    <Divider variant='middle' />
                    <DialogActions>
                        <Button sx={{ fontFamily: "medium" }} variant='contained' color='inherit' onClick={() => setAddiStudent(false)}>انصراف</Button>
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
