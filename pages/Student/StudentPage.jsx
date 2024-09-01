import React, { useEffect, useState } from 'react'
import { IconButton, Paper } from '@mui/material'
import { TableContainer, Table, TableHead, TableRow, TableBody, TableCell } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie'
import AddStudent from './AddStudent';
//ICONS
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/DeleteForever"
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
//PAGES
import UpdateStudent from './UpdateStudent'
import DeleteStudent from './DeleteStudent'
import DetailStudent from './DetailStudent'

export default function StudentPage() {
  const [response, setResponse] = useState([])
  const [isSuccess, setIsSuccess] = useState(true)
  const [deleteStudent, setDeleteStudent] = useState(false)
  const [editStudent, setEditStudent] = useState(false)
  const [detailStudent, setDetailStudent] = useState(false)
  const [item, setItem] = useState({})

  useEffect(() => {
    if (isSuccess) {
      const jwtToken = Cookies.get("user_data")

      axios.get(
        "http://localhost:5000/api/students",
        { headers: { Authorization: `Bearer ${jwtToken}` } })
        .then(function (response) {
          console.log("run");

          setResponse(response.data)
        })
        .catch(function (error) {

        })
      setIsSuccess(false)
    }


  }, [isSuccess])



  const handleUpdate = (row) => {
    setItem(row)
    setEditStudent(true)
  }
  const handleDelete = (row) => {
    setItem(row)
    setDeleteStudent(true)
  }
  const handleDetail = (row) => {
    setItem(row)
    setDetailStudent(true)

  }

  return (
    <div>
      <Paper elevation={3} sx={{ backgroundColor: "white", padding: "15px 18px" }}>
        <AddStudent setIsSuccess={setIsSuccess} />
        <TableContainer component={Paper} sx={{ margin: "40px 0", backgroundColor: "#E0E0E0" }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontFamily: "medium" }}>شماره دانشجو</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontFamily: "medium" }} align="right">نام</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontFamily: "medium" }} align="right">نام خانوادگی</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontFamily: "medium" }} align="right">نام پدر</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontFamily: "medium" }} align="right">جنسیت</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontFamily: "medium" }} align="right">عملیات</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {response.map((row) => (
                <TableRow
                  key={row.studentID}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{row.studentID}</TableCell>
                  <TableCell align="right">{row.firstName}</TableCell>
                  <TableCell align="right">{row.lastName}</TableCell>
                  <TableCell align="right">{row.fatherName}</TableCell>
                  <TableCell align="right">{row.sex === 1 ? "زن" : "مرد"}</TableCell>
                  <TableCell align="right">
                    <IconButton color='success' onClick={() => handleDetail(row)}>
                      <ManageSearchIcon />
                    </IconButton>
                    <IconButton color='primary' onClick={() => handleUpdate(row)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row)}>
                      <DeleteIcon color='error' />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <UpdateStudent
        setEditStudent={setEditStudent}
        editStudent={editStudent}
        item={item}
        setIsSuccess={setIsSuccess}
      />
      <DeleteStudent
        deleteStudent={deleteStudent}
        setDeleteStudent={setDeleteStudent}
        item={item}
        setIsSuccess={setIsSuccess}
      />
      <DetailStudent
        detailStudent={detailStudent}
        setDetailStudent={setDetailStudent}
        item={item}
      />
    </div>
  )
}
