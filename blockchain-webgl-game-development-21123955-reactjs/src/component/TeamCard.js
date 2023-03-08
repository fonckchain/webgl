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
import { Box, Typography, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { ethers } from "ethers";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  carbox: {
    padding: "20px 20px 20px 20px",
    backgroundColor: "#110720",
    borderRadius: "5px",
    position: "relative",
  },
  cardcolor: {
    padding: "30px",
    paddingTop: "12px",
    marginBottom: "10px",
    backgroundColor: "#190a2c",
    borderRadius: "5px",
    "& h6": {
      fontSize: "16px",
      fontWeight: "600",
      marginBottom: "15px",
    },
  },
  bannerImg: {
    "& h6": {
      fontSize: "16px",
      fontWeight: "500",
      marginBottom: "15px",
      textAlign: "center",
    },
  },
  mainimg: {
    width: "100%",
    height: "190px !important",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "5px",
    backgroundColor: "#ccc !important",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    zIndex: "-1",
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
export default function TeamCard(data) {
  const classes = useStyles();
  const history = useHistory();
  console.log("data>>>>>", data?.data?.name);
  console.log(
    "data>>>>>12",
    ethers.utils.formatEther(data?.data?.orders?.sell_orders[0]?.buy_quantity)
  );

  const updateDimensions = () => {
    var offsetWidth = document.getElementById(
      "imagecard" + (data?._id ? data?._id : data?.nftId?._id)
    ).offsetWidth;
    var newoofsetWidth = offsetWidth - 80;
    document.getElementById(
      "imagecard" + (data?._id ? data?._id : data?.nftId?._id)
    ).style.height = newoofsetWidth + "px";
  };
  useEffect(() => {
    updateDimensions();
  }, [data, data?._id ? data?._id : data?.nftId?._id]);
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  let price = ethers.utils.formatEther(
    data?.data?.orders?.sell_orders[0]?.buy_quantity
  );
  console.log("price----", price);

  return (
    <Box>
      <Box
        className={classes.carbox}
        onClick={() => {
          history.push({
            pathname: "/cardetails",
            search: data?.data?._id,
            state: {
              data: data?.data?._id,
            },
          });
        }}
      >
        <Box className={classes.cardcolor}>
          <Typography style={{ color: "#fff" }}>{data?.text1}</Typography>
          <Box className={classes.bannerImg} style={{ cursor: "pointer" }}>
            <Box>
              <Typography variant="h6">
                {data?.data?.name ? data?.data?.name : "--"}
              </Typography>
            </Box>
            <Box
              id={`imagecard${data?._id ? data?._id : data?.nftId?._id}`}
              className={classes.mainimg}
              style={
                data?.data?.image_url
                  ? { background: "url(" + data?.data?.image_url + ")" }
                  : { background: "url(" + "images/carimages.png" + ")" }
              }
            >
              {/* <img
                src={
                  data?.data?.image_url
                    ? data?.data?.image_url
                    : "images/carimages.png"
                }
                alt=""
                style={{
                  width: "100%",
                  minHeight: "133px",
                  maxHeight: "133px",
                }}
              /> */}
            </Box>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="images/eth.png"
              alt=""
              style={{ width: "35px", cursor: "pointer" }}
            />
            <Typography
              variant="h6"
              style={{
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              {data?.data?.orders ? price : "hh"}
            </Typography>
          </Box>
          <Box>
            {/* <Typography style={{ color: "#fff" }}>
                {ethers.utils.formatEther(
                  data?.data?.orders?.sell_orders[0]?.buy_quantity
                )}
              </Typography> */}
          </Box>

          <Box>
            <Typography variant="body1" style={{ margin: "-17px" }}>
              <img src="images/bolt.png" />{" "}
              {/* {data?.data?.name ? data?.data?.name.slice(0, 5) : "Dummy"} */}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
