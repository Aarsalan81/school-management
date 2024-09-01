import React, { useEffect, useState } from 'react'
import { IconButton, Paper } from '@mui/material'
import { TableContainer, Table, TableHead, TableRow, TableBody, TableCell } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie'
//ICONS
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/DeleteForever"
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
//PAGES
import UpdateTeacher from './UpdateTeacher'
import DeleteTeacher from './DeleteTeacher'
import AddTeacher from './AddTeacher'
import DetailTeacher from './DetailTeacher'

export default function TeacherPage() {
  const [response, setResponse] = useState([])
  const [isSuccess, setIsSuccess] = useState(true)
  const [deleteTeacher, setDeleteTeacher] = useState(false)
  const [editTeacher, setEditTeacher] = useState(false)
  const [detailTeacher, setDetailTeacher] = useState(false)
  const [item, setItem] = useState({})

  useEffect(() => {
    if (isSuccess) {
      const jwtToken = Cookies.get("user_data")

      axios.get(
        "http://localhost:5000/api/teachers",
        { headers: { Authorization: `Bearer ${jwtToken}` } })
        .then(function (response) {

          setResponse(response.data)
        })
        .catch(function (error) {

        })
      setIsSuccess(false)
    }

  }, [isSuccess])



  const handleUpdate = (row) => {
    setItem(row)
    setEditTeacher(true)
  }
  const handleDelete = (row) => {
    setItem(row)
    setDeleteTeacher(true)
  }
  const handleDetail = (row) => {
    setItem(row)
    setDetailTeacher(true)

  }

  return (
    <div>
      <Paper elevation={3} sx={{ backgroundColor: "white", padding: "15px 18px" }}>
        <AddTeacher setIsSuccess={setIsSuccess} />
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
                  key={row.teacherID}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{row.teacherID}</TableCell>
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
      <UpdateTeacher
        editTeacher={editTeacher}
        setEditTeacher={setEditTeacher}
        item={item}
        setItem={setItem}
        setIsSuccess={setIsSuccess}
      />
      <DeleteTeacher
        deleteTeacher={deleteTeacher}
        setDeleteTeacher={setDeleteTeacher}
        item={item}
        setIsSuccess={setIsSuccess}
      />
      <DetailTeacher
        detailTeacher={detailTeacher}
        setDetailTeacher={setDetailTeacher}
        item={item}
      />
    </div>
  )
}
