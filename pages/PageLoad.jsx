import React from 'react'
import { CircularProgress } from "@mui/material";
import { Typography } from '@mui/material'

export default function PageLoad() {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", gap: "20px" }}>
            <CircularProgress color="success" />
            <Typography variant="body1" fontFamily={"medium"}>
                در حال بارگذاری اطلاعات...
            </Typography>
        </div>
    )
}
