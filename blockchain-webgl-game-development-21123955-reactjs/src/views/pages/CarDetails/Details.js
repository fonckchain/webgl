import React from "react";
import { Typography, Box, makeStyles, Grid } from "@material-ui/core";
import { Link } from "react-router-dom"

export default function Users(props) {
  const { type, data } = props;


  return (
    <Box>
     
      <Grid container spacing={2}>
        <Grid item xs={6} md={6}>
        <Box className="main-box" mt={2}>
        <small style={{ color: "rgb(166 166 166)", }}>Owner</small>
        <Typography variant="h6" style={{ color: "#fff", }} > Black</Typography>
      </Box>
        </Grid>
        <Grid item xs={6} md={6}>
        <Box className="main-box" mt={2}>
        <small style={{ color: "rgb(166 166 166)", }}>Age</small>
        <Typography variant="h6" style={{ color: "#fff", }}> Kid</Typography>
      </Box>
        </Grid>
        <Grid item xs={6} md={6}>
        <Box className="main-box" mt={2}>
        <small style={{ color: "rgb(166 166 166)", }}>Clothes</small>
        <Typography variant="h6" style={{ color: "#fff", }}> Hoodie</Typography>
      </Box>
        </Grid>
        <Grid item xs={6} md={6}>
        <Box className="main-box" mt={2}>
        <small style={{ color: "rgb(166 166 166)", }}>Clothes</small>
        <Typography variant="h6" style={{ color: "#fff", }}> Hoodie</Typography>
      </Box>
        </Grid>
        <Grid item xs={6} md={6}>
        <Box className="main-box" mt={2}>
        <small style={{ color: "rgb(166 166 166)", }}>Type</small>
        <Typography variant="h6" style={{ color: "#fff", }}> Animal</Typography>
      </Box>
        </Grid>
        <Grid item xs={6} md={6}>
        <Box className="main-box" mt={2}>
        <small style={{ color: "rgb(166 166 166)", }}>Charecter</small>
        <Typography variant="h6" style={{ color: "#fff", }}> Gray</Typography>
      </Box>
        </Grid>
        <Grid item xs={6} md={6}>
        <Box className="main-box" mt={2}>
        <small style={{ color: "rgb(166 166 166)", }}>Clothes Color</small>
        <Typography variant="h6" style={{ color: "#fff", }}> Black</Typography>
      </Box>
        </Grid>
        <Grid item xs={6} md={6}>
        <Box className="main-box" mt={2}>
        <small style={{ color: "rgb(166 166 166)", }}>Clothes Pattern</small>
        <Typography variant="h6" style={{ color: "#fff", }}> Fire</Typography>
      </Box>
        </Grid>
      </Grid>
    
    
   
    
     
    
     
    </Box>
  );
}