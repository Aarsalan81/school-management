import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider, Grid, Typography } from '@mui/material';

export default function DetailStudent(props) {
    const { detailStudent, setDetailStudent, item } = props;

    return (
        <>
            <Dialog maxWidth="md" open={detailStudent}>
                <div style={{backgroundColor:"#81D4FA"}}>

                    <DialogTitle sx={{ fontFamily: "medium" }}>
                        اطلاعات دانشجو
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={6} md={4}>
                                <Typography>
                                    نام : {item.firstName}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography>
                                    نام خانوادگی : {item.lastName}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography>
                                    نام پدر: {item.fatherName}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography>
                                    جنسیت : {item.sex}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography>
                                    کد ملی : {item.nationalCode}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography>
                                    تاریخ تولد : {item.nationalCode}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography>
                                    شهر تولد : {item.nationalCode}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography>
                                    شماره همراه : {item.nationalCode}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography>
                                    تلفن : {item.nationalCode}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    آدرس : {item.nationalCode}
                                </Typography>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <Divider variant='middle' />
                    <DialogActions>

                        <Button sx={{ fontFamily: "medium" }} variant='contained' color='info' onClick={() => setDetailStudent(false)}>بستن</Button>

                    </DialogActions>
                </div>

            </Dialog >

        </>
    )
}
