// import React from "react";
// import { Box, Typography, Container, Button, Grid } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core";
// import TwitterIcon from "@material-ui/icons/Twitter";
// import LinkedInIcon from "@material-ui/icons/LinkedIn";

// const useStyles = makeStyles((theme) => ({
//   boxframe: {
//     width: "100%",
//     transition: "0.3s",
//     "&:hover": {
//       transform: "scale(1.1)",
//     },
//     //minHeight: '66vh',
//     //paddingTop: '200px',
//     //paddingBottom: '200px',
//     "& h2": {
//       fontSize: "18px",
//       fontWeight: "400",
//       color: "#ffffff",
//       //paddingTop: '30px',
//     },
//     "& h4": {
//       fontSize: "14px",
//       fontWeight: "500",
//       color: "#EC0AD7",
//       //paddingTop: '30px',
//     },
//   },
//   bgtop: {
//     backgroundColor: "#120720",
//     paddingTop: "10px",
//     paddingBottom: "10px",
//   },
//   bgbox: {
//     paddingTop: "145px",
//     //paddingBottom: '100px',
//   },
//   icon: {
//     backgroundColor: "#881C99",
//   },
//   lastbox: {
//     display: "flex",
//     justifyContent: "space-evenly",
//     alignItems: "center",
//   },
//   imgbox: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: "32px",
//     paddingBottom: "36px",
//   },
//   iconbox: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingBottom: "30px",
//     color: "#881C99",
//     "& svg": {
//       margin: "0 10px",
//       cursor: "pointer",
//     },
//   },
//   gridbox: {
//     width: "100%",
//     maxWidth: "200px",
//     margin: "0 auto",
//     "@media(max-width:1024px)": {
//       maxWidth: "auto",
//     },
//     "@media(max-width:768px)": {
//       maxWidth: "275px",
//     },
//     "@media(max-width:540px)": {
//       maxWidth: "400px",
//     },
//     "@media(max-width:375px)": {
//       maxWidth: "247px",
//     },
//     "@media(max-width:320px)": {
//       maxWidth: "185px",
//     },
//     "@media(max-width:280px)": {
//       maxWidth: "140px",
//     },
//   },
//   dovcode: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "0 40px 0 30px",
//     [theme.breakpoints.down("md")]: {
//       padding: "0 55px 0 30px",
//     },
//     [theme.breakpoints.down("xs")]: {
//       padding: "0 45px 0 30px",
//     },
//   },
// }));
// function MeetCard(props) {
//   const classes = useStyles();
//   const { data } = props;
//   return (
//     <Box className="d-flex">
//       <Box className={classes.boxframe}>
//         <Box className={classes.dovcode}>
//           <Typography variant="h2" style={{ marginTop: "25px" }}>
//             {data.text1}
//           </Typography>
//           <Typography variant="h4" style={{ marginTop: "25px" }}>
//             {data.text2}
//           </Typography>
//         </Box>
//         {/*</Box>*/}
//         <Box className={classes.imgbox}>
//           <img
//             className={classes.gridbox}
//             src={data.img1}
//             alt=""
//             width="100%"
//           />
//         </Box>
//         <Box className={classes.iconbox}>
//           <LinkedInIcon />
//           <TwitterIcon />
//         </Box>
//         {/*<Box className={classes.bgbox}>
//         <Box style={{ marginTop: '-50px' }} className={classes.lastbox}>
//           <LinkedInIcon className={classes.icon} />
//           <TwitterIcon className={classes.icon} />
//         </Box>
//       </Box>*/}
//       </Box>
//     </Box>
//   );
// }

// export default MeetCard;

import { makeStyles } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { Box, Typography } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles((theme) => ({
  manCard: {
    padding: "8px 20px 10px 20px",
    backgroundColor: "#120720",
    borderRadius: "5px",
  },
  manCardcolor: {
    padding: "0px 16px 5px 19px",
    backgroundColor: "#1d0e33",
    borderRadius: "5px",
  },
}));

export default function MeetCard({ data }) {
  const classes = useStyles();
  return (
    <Box>
      <Box className={classes.manCard}>
        <Box pb={1}>
          <Typography
            style={{ color: "#fff", textAlign: "center", fontWeight: "900" }}
          >
            {data?.text1}
          </Typography>
        </Box>
        <Box className={classes.manCardcolor}>
          <img src={data?.img1} alt="" style={{ width: "100%" }} />
        </Box>
        <Box display="flex" justifyContent="center" pt={2}>
          <a href="https://www.instagram.com/?hl=en" target="_blank">
            <LinkedInIcon style={{ color: "#D3D3D3", marginRight: "6px" }} />
          </a>

          <a href="https://twitter.com/i/flow/login" target="_blank">
            <TwitterIcon style={{ color: "#D3D3D3" }} />
          </a>
        </Box>
      </Box>
    </Box>
  );
}
