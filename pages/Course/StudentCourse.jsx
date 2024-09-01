import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios';

import AddStudentCourse from './AddStudentCourse'

export default function StudentCourse(props) {

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


    return (
        <>
            <AddStudentCourse  />
            
            <Snackbar open={opensnackbar} autoHideDuration={3000} onClose={() => setOpensnackbar(false)} anchorOrigin={{ vertical: "top", horizontal: "left" }}>
                <Alert sx={{ fontFamily: "light" }} severity={alertType} onClose={() => setOpensnackbar(false)}>
                    {alertMassage}
                </Alert>
            </Snackbar>
        </>
    )
}
