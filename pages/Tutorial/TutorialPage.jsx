import React, { useEffect, useState } from 'react'
import { CardHeader, Grid, IconButton, Paper } from '@mui/material'
import axios from 'axios';
import Cookies from 'js-cookie'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
//ICONS
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/DeleteForever"
//PAGES
import UpdateTutorial from './UpdateTutorial'
import DeleteTutorials from './DeleteTutorials'
import AddTutorial from './AddTutorial'

import Html from "./html.webp"
import Css from "./css.jpg"

export default function TutorialPage() {

  const [response, setResponse] = useState([])
  const [isSuccess, setIsSuccess] = useState(true)
  const [deleteTutorial, setDeleteTutorial] = useState(false)
  const [editTutorial, setEditTutorial] = useState(false)
  const [item, setItem] = useState({})

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  useEffect(() => {
    if (isSuccess) {
      const jwtToken = Cookies.get("user_data")
      axios.get(
        "http://localhost:5000/api/tutorials",
        { headers: { Authorization: `Bearer ${jwtToken}` } })
        .then(function (response) {
          console.log(response.data)
          setResponse(response.data)
        })
        .catch(function (error) {
        })
      setIsSuccess(false)
    }
  }, [isSuccess])


  const handleDelete = (item) => {
    setItem(item)
    setDeleteTutorial(true)
  }


  const handleUpdate = (row) => {
    setItem(row)
    setEditTutorial(true)
  }
  // const handleImage = (name) => {
  //   if(name === "HTML") {
  //     return Html
  //   }else {
  //     return Css
  //   }
  // }

  return (
    <div>
      <Paper sx={{ padding: "10px 10px" }}>
        <AddTutorial setIsSuccess={setIsSuccess}/>
      </Paper>

      <Grid container spacing={2} sx={{ marginTop: "25px" }}>

        {response.map((item) => (
          <Grid item xs={12} sm={6} md={3}
            key={item.tutorialID}
          >
            <Card id='tutorial_box' variant='outlined'>
              <CardHeader title={`آموزش ${item.name}`}
                action={
                  <IconButton onClick={() => handleDelete(item)}>
                    <DeleteIcon color='error' />
                  </IconButton>
                }
              />

              <CardContent>
                <div style={{textAlign:"center"}}>
                  
                  <img src={Html} style={{ width: "150px", height: "100px", objectFit: "cover", borderRadius: "20px", marginBottom: "13px" }} />
                </div>

                <Typography sx={{ fontFamily: "medium" }}>
                  {`تعداد جلسات : ${item.sessions}`}
                </Typography>
                <Typography sx={{ fontFamily: "medium" }}>
                  {`قیمت : ${item.price}`}
                </Typography>
              </CardContent>
              <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                <Button variant='contained' color='warning' startIcon={<EditIcon />} sx={{ borderRadius: "20px", width: "190px", fontFamily: "medium" }} onClick={() => handleUpdate(item)}>
                  ویرایش
                </Button>
              </CardActions>
            </Card>
          </Grid>

        ))}

      </Grid>

      <DeleteTutorials
        deleteTutorial={deleteTutorial}
        setDeleteTutorial={setDeleteTutorial}
        item={item}
        setIsSuccess={setIsSuccess}
      />
      <UpdateTutorial
        editTutorial={editTutorial}
        setEditTutorial={setEditTutorial}
        item={item}
        setItem={setItem}
        setIsSuccess={setIsSuccess}
      />
    </div>
  )
}
