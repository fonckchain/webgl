import React from "react";
import {
  Box,
  Container,
  Typography,
  makeStyles,
  Grid,
  Button,

  TextField,
} from "@material-ui/core";
import Page from "src/component/Page";
const useStyles = makeStyles((theme) => ({
  walletBox:{
    backgroundColor:"#1D0E33",
    padding:"50px 0",
    "& .leftBox":{
     backgroundColor:"#110720",
     padding:"15px",
     borderRadius: "5px",
    },
    "& .rightSideBox":{
      backgroundColor:"#110720",
     padding:"15px",
     borderRadius: "5px",
    },
  },



  
  tokenBox:{
    backgroundColor:"#1D0E33",
    textAlign:"center",
    padding:"10px",
    marginBottom: "10px",
    "& figure":{
      height: "80px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100px",
      margin: "0 auto",
      "& img":{
        width:"auto",
        maxWidth:"100%",
        maxHeight:"80px",
      },
    },
    "& h6":{
      fontSize: "14px",
lineHeight: "16px",
color: "#FFFFFF",
fontWeight: "bold",
    },
  },

  stallion:{
    backgroundColor:" #1D0E33",
borderRadius: "5px",
padding:"15px",
"& figure":{
  height: "80px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position:"relative",
  background: "#110720",
borderRadius: "5px",
  margin: "0 auto",
  "& h5":{
    fontSize: "18px",
    lineHeight: "21px",
    color: "#FFFFFF",
    position:"absolute",
    top:"15px",
    left:"50%",
    fontWeight: "bold",
  },
  "& img":{
    width:"auto",
    maxWidth:"100%",
    maxHeight:"80px",
  },
},
  },
}));
const card = [
  {
    image:"images/token2.png",
    price:"500 $GAS"
  },
  {
    image:"images/ether1.svg",
    price:"0.5 ETH"
  },
  {
    image:"images/car.png",
    price:"5 Cars"
  },
  {
    image:"images/setting.png",
    price:"3 Parts"
  },
  {
    image:"images/racers.png",
    price:"3 Racers"
  }
]
function Wallet(props) {
  const classes = useStyles();
  return (
    <Page title="Wallet">
     <Box className={classes.walletBox}>
       <Container maxWidth="lg">
         <Grid container spacing={3}>
           <Grid item xs={12} sm={3} md={2}>
             <Box className="leftBox">
             {card.map((data, i) => (
               
           <Box className={classes.tokenBox}>
          <figure> <img src={data.image} alt="gasToken" /></figure>
           <Typography variant="h6">
           {data.price}
           </Typography>
         </Box>
          ))}
               
             </Box>
           </Grid>
           <Grid item xs={12} sm={9} md={10}>
             <Box className="rightSideBox">
            
            <Grid container spacing={2}>
            {card.map((data, i) => (
               
               <Grid item xs={12} sm={6} md={4}>
                 <Box className={classes.stallion}>
                   <figure>
                     <img src="images/cargame3.png" alt="images"/>
                     <Typography variant="h5">Z20 Stallion</Typography>
                   </figure>
                   <img src="images/bolt.png" alt="logos" />
                 </Box>
               </Grid>
              ))}
            </Grid>
             </Box>
           </Grid>
         </Grid>
       </Container>
     </Box>
    </Page>
  );
}

export default Wallet;
