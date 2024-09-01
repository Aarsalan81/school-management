
import React, { useEffect, useState } from 'react'
import { CardHeader, Grid, IconButton, Paper } from '@mui/material'
import axios from 'axios';
import Cookies from 'js-cookie'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import DeleteIcon from "@mui/icons-material/DeleteForever"
import EditIcon from "@mui/icons-material/Edit"
import AddIcon from '@mui/icons-material/Add';

import AddCourse from './AddCourse'
import DeleteCourse from './DeleteCourse'
import EditCourse from './EditCourse'
import { useNavigate } from 'react-router-dom';

export default function CoursesPage() {
    const navigate = useNavigate()

    const [response, setResponse] = useState([])
    const [isSuccess, setIsSuccess] = useState(true)
    const [deleteCourse, setDeleteCourse] = useState(false)
    const [editCourse , setEditCourse] = useState(false)
    // const [addiStudent , setAddiStudent] = useState (false)
    const [item, setItem] = useState({})



    useEffect(() => {
        if (isSuccess) {
            const jwtToken = Cookies.get("user_data")

            axios.get(
                "http://localhost:5000/api/courses",
                { headers: { Authorization: `Bearer ${jwtToken}` } })
                .then(function (response) {
                    setResponse(response.data)
                    console.log(response.data)
                })
                .catch(function (error) {
                })
            setIsSuccess(false)
        }

    }, [isSuccess])

    

    const handleDelete = (select) => {
        setItem(select)
        setDeleteCourse(true)
    }
    const handleEdit = (select) => {
        setItem(select)
        setEditCourse(true)
    }
    

    return (
        <div>
            <Paper sx={{ padding: "10px 10px" }}>
                <AddCourse setIsSuccess={setIsSuccess} />
            </Paper>
            <Grid container spacing={2} sx={{ marginTop: "25px" }}>

                {response.map((select) => (
                    <Grid item xs={12} sm={6} md={3}
                        key={select.courseID}
                    >
                        <Card id='tutorial_box' variant='outlined'>
                            <CardHeader title={`آموزش  ${select.tutorialName}`}
                                action={
                                    <IconButton onClick={() => handleDelete(select)}>
                                        <DeleteIcon color='error' />
                                    </IconButton>
                                }
                            />
                            <CardContent>

                                <Typography sx={{ fontFamily: "medium" }}>
                                    <b>نام استاد</b> : {select.teacherName}
                                </Typography>

                                <Typography sx={{ fontFamily: "medium", marginTop: "8px" }}>
                                    <b>روز های هفته</b> : {select.dayType === 1 ? "زوج" : "فرد"}
                                </Typography>
                                <Typography sx={{ fontFamily: "medium", marginTop: "8px" }}>
                                    <b>ساعت</b> : {select.startTime} الی {select.endTime}
                                </Typography>
                                <Typography sx={{ fontFamily: "medium", marginTop: "8px" }}>
                                    <b>تاریخ شروع</b> : {select.startDate}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ display: "flex", justifyContent: "center"}}>
                                <Button variant='contained' color='warning' startIcon={<EditIcon />} sx={{ borderRadius: "20px", width: "190px", fontFamily: "medium" }} onClick={() => handleEdit(select)}>
                                    ویرایش
                                </Button>
                                <Button variant='contained' color='inherit' startIcon={<AddIcon/>} sx={{ borderRadius: "20px",width:"350px" , fontFamily: "medium" , paddingLeft:"0px" , paddingRight:"0px"}} onClick={() => navigate('./studentsCourse')}>
                                    افزودن دانشجو
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>

                ))}
            </Grid>
            <DeleteCourse
                deleteCourse={deleteCourse}
                setDeleteCourse={setDeleteCourse}
                item={item}
                setIsSuccess={setIsSuccess}
            />
            <EditCourse
                editCourse={editCourse}
                setEditCourse={setEditCourse}
                item={item}
                setIsSuccess={setIsSuccess}
            />
            

        </div>
    )
}
