import React, { lazy, Suspense, useEffect, useState } from 'react'
import { AppBar, IconButton, Toolbar, Typography, Badge, Drawer, Paper, Button, Snackbar, Alert } from '@mui/material'
import AddAlertIcon from '@mui/icons-material/AddAlert';
import NavBar from '../components/NavBar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie'

import PageLoad from './PageLoad';

const StudentPage = lazy(() => import("./Student/StudentPage"))
const TeacherPage = lazy(() => import("./Teacher/TeacherPage"))
const TutorialPage = lazy(() => import("./Tutorial/TutorialPage"))
const CoursesPage = lazy(() => import("./Course/CoursesPage"))

export default function MainPage(props) {
    const {islogin, setIslogin} = props;
    const [opensnackbar, setOpensnackbar] = useState(false)
    const [alertType, setAlertType] = useState('error')
    const [alertMassage, setAlertMassage] = useState("")
    const location = useLocation()

    function PageName(pathName) {
        if (pathName.includes("students")) { return "لیست دانشجویان" }
        else if (pathName.includes("teacher")) { return "لیست اساتید" }
        else if (pathName.includes("tutorial")) { return "لیست آموزش ها" }
        else if (pathName.includes("course") || pathName.includes("*")) { return "لیست دوره ها" }
        else { return "صفحه اصلی" }
    }

    const handleExit = () => {
        Cookies.remove("user_data")
        window.location.reload()
        setIslogin(false)
    }

    useEffect(() => {
        if(islogin === true){
            alert("شما وارد شدید")
        }
        
        console.log(islogin)
    })


    return (
        <div className='main_body'>
            <AppBar component={"header"} sx={{ zIndex: 1300 }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant='h6' sx={{ fontFamily: "bold" }}>
                        {PageName(location.pathname)}
                    </Typography>
                    <div style={{ display: "flex", gap: "20px" }}>
                        <IconButton>
                            <Badge badgeContent={2} color="success">
                                <AddAlertIcon color='warning' />
                            </Badge>
                        </IconButton>
                        <Button id='exit_accunt' variant='contained' onClick={() => handleExit()}>
                            خروج از حساب کاربری
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer variant='permanent' component={"aside"}>
                <NavBar />
            </Drawer>
            <main className='main'>
                <Routes>
                    <Route
                        path='/students'
                        element={
                            <Suspense fallback={<PageLoad />}>
                                <StudentPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path='/teacher'
                        element={
                            <Suspense fallback={<PageLoad />}>
                                <TeacherPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path='/tutorials'
                        element={
                            <Suspense fallback={<PageLoad />}>
                                <TutorialPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path='*'
                        element={
                            <Suspense fallback={<PageLoad />}>
                                <TutorialPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path='/courses'
                        element={
                            <Suspense fallback={<PageLoad />}>
                                <CoursesPage />
                            </Suspense>
                        }
                    />
                </Routes>
            </main>
            <Snackbar open={opensnackbar} autoHideDuration={3000} onClose={() => setOpensnackbar(false)} anchorOrigin={{ vertical: "top", horizontal: "left" }}>
                <Alert severity={alertType} onClose={() => setOpensnackbar(false)}>
                    {alertMassage}
                </Alert>
            </Snackbar>

        </div>
    )
}




