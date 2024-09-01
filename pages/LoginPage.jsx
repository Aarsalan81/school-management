import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useFormik } from 'formik'
import { Alert, Button, Container, Grid, Snackbar, TextField, Typography } from '@mui/material'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';


export default function LoginPage(props) {
    const [opensnack , setOpensnack] = useState(false)
    const [errormassage , setErrormassage] = useState("")
    const formik = useFormik({
        initialValues: {
            UserName:"" , 
            Password:"" ,
        },

        onSubmit:(values) => {
            axios.post("http://localhost:5000/api/user/login", values)
                .then(function(response){
                    Cookies.set("user_data", response.data.jwtToken, { Secure: false, SameSite: "Strict" });
                    window.location.reload();
                    props.setIslogin(true)
                })
                .catch(function(error){
                    setOpensnack(true)
                    if (error.response) {
                        setErrormassage(error.response.data.error);
                    } else {
                        setErrormassage("ارتباط با سرور برقرار نشد");
                    }
                });
        }
    })
    return(
        <div className='login_body'>
            <Container maxWidth = "xs" component={"main"}>
                <form className='login_form' onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <AccountCircleOutlinedIcon color='success' sx={{fontSize: 80}} />
                            <Typography variant='h6' sx={{color:"#039BE5", fontFamily:"bold", marginBottom:1}}>
                                نرم افزار تحت وب آموزشکده
                            </Typography>
                            <Typography variant='body2' sx={{color:"rgb(120, 144, 156)" , fontFamily:"light"}}>
                                لطفا نام کاربری و رمز عبور خود را وارد نمایید
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id='UserName'
                                name='UserName'
                                label='نام کاربری'
                                fullWidth
                                error={formik.isSubmitting && formik.values.UserName === ""}
                                onChange={formik.handleChange}
                                value={formik.values.UserName}
                            />                        
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                id='Password'
                                name='Password'
                                label='رمز عبور'
                                fullWidth
                                type='password'
                                onChange={formik.handleChange}
                                value={formik.values.Password}
                            />                        
                        </Grid>
                        <Grid item xs={12}>
                            <Button fullWidth type='submit' variant='contained' color='success' sx ={{border:"none",fontFamily:"medium"}} >
                                ورود به برنامه
                            </Button>                                                    
                        </Grid>
                    </Grid>
                </form>
            </Container>
            <Snackbar open={opensnack} autoHideDuration={3000} onClose={() => setOpensnack(false)} anchorOrigin={{vertical:"top" , horizontal:"left"}}>
                <Alert variant="filled" severity="error">
                    {errormassage}
                </Alert>

            </Snackbar>
            
        </div>
    )
  
}

