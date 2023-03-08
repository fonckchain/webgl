// import React from "react";
// import { Box, makeStyles, Typography } from "@material-ui/core";
// import Tilt from "react-parallax-tilt";

// import { Link } from "react-router-dom";

// const useStyles = makeStyles((theme) => ({
//   bannerImg: {
//     position: "relative",
//     cursor: "pointer",
//     border: "1px solid #3b3b3b",
//     transition: "0.3s",
//     margin: " 0 5px",
//     height: "100%",
//     "&:hover": {
//       borderColor: "#6c0863",
//       filter: "drop-shadow(0px -1px 5px #6c0863)",
//       transform: "translateY(-10px)",
//     },
//     "& img": {
//       width: "100%",
//       borderRadius: "10px",
//     },
//     "& h6": {
//       fontSize: "18px",
//       color: "#fff",
//       fontWeight: 800,
//       marginTop: "10px",
//     },
//   },
//   carbox: {
//     padding: "20px",
//     background: "#120720",
//   },
//   dummybox: {
//     padding: "15px",
//     background: "#120720",
//   },
//   box: {
//     backgroundColor: "#241B30",
//     padding: "20px",
//   },
//   headtext: {
//     "& h5": {
//       color: "#ffffff",
//       letterSpacing: "1px",
//     },
//     "& p": {
//       fontSize: "14px",
//       fontWeight: "400",
//       color: "#9f9f9f",
//     },
//     "& label": {
//       fontSize: "16px",
//       fontWeight: "600",
//       color: "#ffffff",
//     },
//   },
//   logoBox: {
//     display: "flex",
//     justifyContent: "center",
//     height: "30px",
//     alignItems: "center",
//     "& img": {
//       width: "100%",
//       maxWidth: "90px",
//       maxHight: "30px",
//     },
//   },
// }));

// export default function UsersCard(props) {
//   const classes = useStyles();
//   const { data } = props;
//   return (
//     <Box
//       className={classes.gallryBox}
//       component={Link}
//       to="/cardetails"
//       style={{ textDecoration: "none" }}
//     >
//       <Box className={classes.bannerImg}>
//         <Box className={classes.carbox}>
//           <Tilt>
//             <img src={data.productImg} alt="" width="100%" />
//           </Tilt>
//         </Box>
//         <Box className={classes.dummybox}>
//           <Box className={classes.logoBox} mb={1}>
//             <img src={data.logo} alt="" />
//           </Box>
//           <Box className={classes.headtext}>
//             <Typography
//               variant="h5"
//               style={{ textDecoration: "none", color: "#fff" }}
//             >
//               {data.name}
//             </Typography>
//             <Typography variant="body1">{data.discription}</Typography>
//           </Box>
//           <Box className={classes.headtext} align="center" mt={2}>
//             <Typography
//               variant="body2"
//               component="label"
//               className={classes.price}
//             >
//               {data.price}
//             </Typography>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// }
import { Box, Grid, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import { ethers } from "ethers";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  carbox: {
    background: "#1D0E33",
    borderRadius: "5px",
    width: "100%",
    // padding: "20px 20px 20px 20px",
  },
  cardcolor: {
    padding: "30px",
    paddingTop: "12px",
    marginBottom: "10px",
    backgroundColor: "#1D0E33",
    borderRadius: "5px",
    "& p": {
      color: "#fff !important",
      fontWeight: "500 !important",
      fontSize: "14px !important",
      fontFamily: "'Dismedia'",
      letterSpacing: "1px",
    },
  },
  // bannerImg: {
  //   transition: "0.3s",
  //   margin: " 0 5px",
  //   height: "100%",
  //   "&:hover": {
  //     // borderColor: "#6c0863",
  //     filter: "drop-shadow(0px -1px 5px #6c0863)",
  //     transform: "translateY(-10px)",
  //   },
  // },
}));
export default function RaceResultCard({ data }) {
  const classes = useStyles();
  const history = useHistory();
  console.log("data>>>>>", data?.text2);
  return (
    <>
      <Box
        className={classes.carbox}
        // onClick={() => {
        //   history.push({
        //     pathname: "/cardetails",
        //     search: data?.data?._id,
        //     state: {
        //       data: data?.data?._id,
        //     },
        //   });
        // }}
      >
        <Box className={classes.cardcolor}>
          <Typography variant="body2" style={{ color: "14px !important" }}>
            {data.text1}
          </Typography>
          <Box
            className={classes.bannerImg}
            style={{ cursor: "pointer", display: "flex", padding: "20px" }}
          >
            {/* <Box
                mt={0}
                mb={3}
                textAlign="left"
                // style={{
                //   display: "flex",
                //   justifyContent: "center",
                //   color: "#FFFFFF",
                // }}
              >
                {data?.text1}
              </Box> */}
            <img
              src={"images/carimages.png"}
              alt=""
              style={{ margin: "0 auto" }}
            />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Typography
                style={{
                  color: "#fff",
                  fontFamily: "'Dismedia'",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "18px",
                  lineHeight: "18px",
                }}
              >
                {data.text2}
              </Typography>
            </Box>
            <Box>
              {/* <Typography
                  style={{
                    color: "#fff",
                    fontFamily: "'Dismedia'",
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "18px",
                    lineHeight: "18px",
                  }}
                >
                  <img
                    src="images/gasv2.png"
                    alt=""
                    style={{ width: "50%" }}
                    alt=""
                  />
                  &nbsp;&nbsp;
                  {data.text3}
                </Typography> */}
              <Box
                style={{
                  display: "flex",
                  height: "20px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src="images/gasv2.png" alt="" style={{ width: "31px" }} />
                &nbsp;&nbsp;
                <Typography
                  variant="h6"
                  style={{
                    color: "#fff",
                    fontFamily: "'Dismedia'",
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "18px",
                    lineHeight: "18px",
                  }}
                >
                  {data.text3}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
