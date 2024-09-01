import React , {useState} from 'react'
import Cookies from 'js-cookie'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { useFormik } from 'formik'

import { Typography , Grid , TextField , Divider , Button , Snackbar , Alert } from '@mui/material';
import axios from 'axios';

export default function UpdateTutorial(props) {
    const {editTutorial , setEditTutorial , item , setIsSuccess} = props;
    const [opensnackbar, setOpensnackbar] = useState(false)
    const [alertType, setAlertType] = useState('')
    const [alertMassage, setAlertMassage] = useState("")


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            tutorialID:item.tutorialID ?? 1,
            name:item.name ?? "",
            sessions:item.sessions ?? "",
            price:item.price ?? "",
        },

        onSubmit:(values)=>{
            const jwtToken = Cookies.get("user_data")

            axios.put(
                "http://localhost:5000/api/tutorials",
                values,
                { headers: { Authorization: `Bearer ${jwtToken}` } }
            ).then(function(response){
                setEditTutorial(false)
                setIsSuccess(true)
                setOpensnackbar(true)
                setAlertType('success')
                setAlertMassage("ویرایش با موفقیت انجام شد")
            }).catch(function(error){
                setOpensnackbar(true)
                setAlertType('error')
                setAlertMassage(error.response.data.error)
            })

        }

        
    })
    return (
        <div>
            <Dialog maxWidth="xs" open={editTutorial} onClose={() => setEditTutorial(false)}>
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle sx={{ fontFamily: "medium" }}>
                        {"ویرایش آموزش"}
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
                        <Button sx={{ fontFamily: "medium" }} variant='contained' color='inherit' onClick={() => setEditTutorial(false)}>انصراف</Button>
                        <Button sx={{ fontFamily: "medium" }} variant='contained' type='submit'>
                            ویرایش
                        </Button>
                    </DialogActions>
                </form>

            </Dialog >
            <Snackbar open={opensnackbar} autoHideDuration={3000} onClose={() => setOpensnackbar(false)} anchorOrigin={{ vertical: "top", horizontal: "left" }}>
                <Alert severity={alertType} onClose={() => setOpensnackbar(false)} sx={{fontFamily:"light"}}>
                    {alertMassage}
                </Alert>
            </Snackbar>
        </div>
    )
}
