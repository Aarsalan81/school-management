import React from "react";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ArticleIcon from '@mui/icons-material/Article';
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useNavigate } from "react-router-dom";



export default function NavBar() {
    const navigate = useNavigate()
    return(
        <List component={"nav"} sx={{paddingTop:10 , width:280}}>
            <ListItem>
                <ListItemButton onClick={() => navigate("/tutorials")}>
                    <ListItemIcon>
                        <ArticleIcon/>
                    </ListItemIcon>
                    <ListItemText sx={{fontFamily:"medium"}} primary="آموزش ها"/>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton onClick={() => navigate("/courses")}>
                    <ListItemIcon>
                        <MenuBookIcon/>
                    </ListItemIcon>
                    <ListItemText sx={{fontFamily:"medium"}} primary="دوره ها"/>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton onClick={() => navigate("/students")}>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="دانشجویان"/>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton onClick={() => navigate("/teacher")}>
                    <ListItemIcon>
                        <AssignmentIndIcon  />
                    </ListItemIcon>
                    <ListItemText primary="اساتید"/>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton>
                    <ListItemIcon>
                        <PeopleIcon/>
                    </ListItemIcon>
                    <ListItemText primary="کاربران"/>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton>
                    <ListItemIcon>
                        <BarChartIcon/>
                    </ListItemIcon>
                    <ListItemText primary="گزارشات"/>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton>
                    <ListItemIcon>
                        <LayersIcon/>
                    </ListItemIcon>
                    <ListItemText primary="تنظیمات"/>
                </ListItemButton>
            </ListItem>
        </List>
    )
}