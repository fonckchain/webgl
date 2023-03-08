import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  Button,
  FormControl,
  Input,
  makeStyles,
  InputAdornment,
  IconButton,
  Dialog,
  Slide,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { CSVLink } from "react-csv";

import { BiLockOpen } from "react-icons/bi";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { UserContext } from "src/context/User";
import apiConfig from "src/component/config/ApiConfig";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import axios from "axios";
import { GiCancel } from "react-icons/gi";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  getBase64,
  isUrlValid,
  isValidEmail,
} from "../../../constants/Services";

const useStyles = makeStyles((theme) => ({
  Box: {
    width: "163px",
    border: "1px solid #898989",
    height: "93px",
    borderRadius: "5px",
  },
  imgSvg: {
    "& svg": {
      color: "white",
    },
  },
  boxImagesChanges: {
    width: "102%",
    height: "94px",
    margin: "-1px 4px 0px -1px",
    overflow: "hidden",
    borderRadius: "20px",
    backgroundColor: "#000",
    "& img": {
      width: "100%",
    },
  },

  mainBoxcreate: {
    color: "#fff",
    border: "1px solid #ea1546",
    padding: "25px",
    boxShadow: "0px 4px 8px rgb(0 0 0 / 12%)",

    borderRadius: "5px",
    backgroundColor: "#190A2C",
    "@media(max-width:767px)": {
      height: "auto",
    },
  },
  FAQ: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
  PageHeading: {
    fontWeight: "500",
    fontSize: "32px",
    lineHeight: "39px",
    color: "#fff",
    paddingBottom: "20px",
    [theme.breakpoints.only("xs")]: {
      fontSize: "22px",
    },
  },
  mainboxtext: {
    "& h3": {
      color: "#ffffff",
      textAlign: "center",
      [theme.breakpoints.only("xs")]: {
        fontSize: "22px",
      },
    },
  },
  displayflex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  table: {
    minWidth: 700,
  },
  root: {
    "&:nth-of-type(odd)": {
      // backgroundColor: "#e0e0e0",
    },
  },

  button: {
    minWidth: "initial",
    padding: "6px",
    marginLeft: "7px",
  },
  butm: {
    display: "flex",
    justifyContent: "center",
    // "&:hover": {
    //   background: linear-gradient(124deg, rgba(47, 89, 149, 0.81) 18.76%, rgba(21, 29, 42, 0.87) 43.13%, rgba(0, 88, 241, 0.65) 96.83%)
    // },
  },
  butm1: {
    backgroundColor: "#252d47",
    color: "#fff",
    "&:hover": {
      background:
        "linear-gradient(124deg, rgba(47, 89, 149, 0.81) 18.76%, rgba(21, 29, 42, 0.87) 43.13%, rgba(0, 88, 241, 0.65) 96.83%)",
    },
  },
  butm2: {
    backgroundColor: "#252d47",
    color: "#fff",
    "&:hover": {
      background:
        "linear-gradient(124deg, rgba(47, 89, 149, 0.81) 18.76%, rgba(21, 29, 42, 0.87) 43.13%, rgba(0, 88, 241, 0.65) 96.83%)",
    },
  },
  clearButton: {
    border: "1px solid",
    background: "#313b48",
    borderRadius: "9px",
    width: "100%",
    color: "white",
    height: "48px",
    "&:hover": {
      background:
        "linear-gradient(124deg, rgba(47, 89, 149, 0.81) 18.76%, rgba(21, 29, 42, 0.87) 43.13%, rgba(0, 88, 241, 0.65) 96.83%)",
    },
  },
  csvButton: {
    border: "1px solid",
    background: "#313b48",
    borderRadius: "9px",
    width: "100%",
    color: "white",

    height: "48px",
    "&:hover": {
      background:
        "linear-gradient(124deg, rgba(47, 89, 149, 0.81) 18.76%, rgba(21, 29, 42, 0.87) 43.13%, rgba(0, 88, 241, 0.65) 96.83%)",
    },
  },

  inputBox: {
    display: "flex",
    marginLeft: "46px",
  },
  activeIcon: {
    backgroundColor: "rgb(0, 194, 146)",
    borderRadius: "100%",
    height: "10px",
    width: "10px",
  },
  activeSection: {
    display: "flex",
    alignItems: "center",
  },
  contanerClass: {
    border: "1px solid #5d5665",
    padding: "10px",
    borderRadius: "10px",
  },
  buttonBox: {
    paddingTop: "29px",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "8px",
    },
  },
}));

function createData(Account_Name, Address, Bio, Personal_URL, Verified) {
  return { Account_Name, Address, Bio, Personal_URL, Verified };
}

const rows = [
  createData("Rose", "sdaasdasddasds", "Steven Paul", "stevecom", "true"),
  createData("Rose", "sdaasdasddasd", "Steven Paul", "stevecom", "true"),
  createData("Rose", "sdaasdasddasd", "Steven Paul", "stevecom", "true"),
  createData("Rose", "sdaasdasddasd", "Steven Paul", "stevecom", "true"),
  createData("Rose", "sdaasdasddasd", "Steven Paul", "stevecom", "true"),
  createData("Rose", "sdaasdasddasds", "Steven Paul", "stevecom", "true"),
  createData("Rose", "sdaasdasddasd", "Steven Paul", "stevecom", "true"),
  createData("Rose", "sdaasdasddasd", "Steven Paul", "stevecom", "true"),
  createData("Rose", "sdaasdasddasd", "Steven Paul", "stevecom", "true"),
  createData("Rose", "sdaasdasddasd", "Steven Paul", "stevecom", "true"),
];
const userlist = [
  {
    image1: "1",

    text1: "22-05-2022",
    text2: "Crypto",
    text3: "Success",
    text4: "Active",
    text5: "Price",
    text6: "0.2  ETH",
    text7: "4",
  },
  {
    image1: "2",

    text1: "23-05-2022",
    text2: "Fiat",
    text3: "Pending",
    text4: "Deactive",
    text5: "Price",
    text6: "0.2 ETH",
    text7: "4",
  },
];

export default function FAQ() {
  const [imageFile, setImageFile] = useState("");
  const [imgBuild, setimgBuild] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [iconOpen, setIconOpen] = useState(false);

  const classes = useStyles();
  const history = useHistory();
  const [editUser, setEditUser] = useState({
    name: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const _onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const temp = { ...editUser, [name]: value };
    setEditUser(temp);
  };
  const user = useContext(UserContext);
  console.log("users", user);
  const [coverBlob, setCoverBlob] = useState("");
  const [coverFile, setCoverFile] = useState("");
  const [coverFileBase, setCoverFileBase] = useState("");
  console.log("coverBlob", coverBlob);

  // const _onProfilePicChange = (e) => {
  //   const name = e.target.id;
  //   const value = URL.createObjectURL(e.target.files[0]);
  //   setImageFile(e.target.files[0]);
  //   setimgBuild(value);
  //   getBase64(e.target.files[0], (result) => {
  //     setImageBase64(result);
  //   });
  // };
  const [tokenAmountErrorMessage, setTokenAmountErrorMessage] = useState("");
  console.log("tokenAmountErrorMessage", tokenAmountErrorMessage);
  useEffect(() => {
    if (user?.profileDetails) {
      setEditUser({
        name: user.profileDetails.name ? user.profileDetails.name : "",
        email: user.profileDetails.email
          ? user.profileDetails.email === "-"
            ? ""
            : user.profileDetails.email
          : "",
      });
      setImageFile(
        user.profileDetails?.profilePic ? user.profileDetails?.profilePic : ""
      );
      setCoverBlob(
        user?.profileDetails?.coverImage ? user?.profileDetails?.coverImage : ""
      );
    }
  }, [user?.profileDetails]);
  const validUsername = (value) => {
    const re = /^\S*$/;
    return re.test(value);
  };
  const isEmailValid =
    editUser.email !== "" ? isValidEmail(editUser.email) : true;
  const Editprofile = async () => {
    setIsSubmit(true);
    // setIsLoading(true);
    if (
      isEmailValid &&
      editUser.name !== "" &&
      editUser.name.length <= 30 &&
      validUsername(editUser.name) &&
      imageFile
    )
      try {
        setIsLoading(true);

        if (sessionStorage.getItem("token")) {
          const formData = new FormData();
          formData.append("name", editUser.name);
          formData.append("email", editUser.email);
          formData.append("profilePic", imageFile);
          if (coverFile) {
            formData.append("coverImage", coverFile);
          }
          console.log("formData", formData);
          const res = await axios.put(apiConfig.updateAdminProfile, formData, {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          });
          if (res.data.statusCode === 200) {
            toast.success(res.data.responseMessage);
            setIsLoading(false);
            history.push({
              pathname: "/profile",
              search: user?.userData?._id,
            });
          } else {
            setIsLoading(false);
            toast.error(res.data.responseMessage);
            setTimeout(() => {
              setTokenAmountErrorMessage(res.data.responseMessage); // count is 0 here
            }, 5000);
            setTokenAmountErrorMessage(res.data.responseMessage);
          }
        }
      } catch (error) {
        setIsLoading(false);
        setTimeout(() => {
          setTokenAmountErrorMessage(error?.response.data.responseMessage); // count is 0 here
        }, 5000);
        setTokenAmountErrorMessage(error?.response.data.responseMessage);
        console.log("ERROR", error);
      }
  };

  return (
    <>
      <Box className={classes.FAQ}>
        {/* featured */}
        <Box>
          <Container maxWidth="lg">
            <Box className="subtext" pt={4} pb={3} align="center">
              <Typography variant="h3" title="UPCOMING RACES">
                {" "}
                Exchange
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <Box className={classes.mainBoxcreate}>
                  {/* form start */}

                  {/* form end */}

                  <Box>
                    <Box className={classes.displayflex}>
                      <Box mb={2}>
                        <Typography
                          variant="h4"
                          style={{ marginLeft: "-11px" }}
                        >
                          Crypto
                        </Typography>
                      </Box>
                      <Box mb={2}>
                        <IconButton>
                          <AccessTimeIcon
                            onClick={() => setIconOpen(!iconOpen)}
                            style={{ color: "#fff" }}
                          />
                        </IconButton>
                      </Box>
                    </Box>
                    <label style={{ marginLeft: "-10px" }}>From :</label>
                    <FormControl fullWidth className={classes.margin}>
                      <Input
                        type="number"
                        onKeyPress={(event) => {
                          if (
                            event?.key === "-" ||
                            event?.key === "+" ||
                            event?.key === "="
                          ) {
                            event.preventDefault();
                          }
                        }}
                        style={{ marginLeft: "-10px" }}
                        id="standard-adornment-amount"
                        placeholder="From"
                        onChange={_onInputChange}
                        name="from"
                        endAdornment={
                          <InputAdornment position="end">
                            <img
                              src="images/ethimg.png"
                              style={{ width: "26px" }}
                            />
                          </InputAdornment>
                        }
                      />
                    </FormControl>

                    <Box mt={2} mb={2}>
                      <label style={{ marginLeft: "-10px" }}>To :</label>
                      <FormControl fullWidth className={classes.margin}>
                        <Input
                          type="number"
                          onKeyPress={(event) => {
                            if (
                              event?.key === "-" ||
                              event?.key === "+" ||
                              event?.key === "="
                            ) {
                              event.preventDefault();
                            }
                          }}
                          id="standard-adornment-amount"
                          style={{ marginLeft: "-10px" }}
                          placeholder="To"
                          onChange={_onInputChange}
                          name="from"
                          endAdornment={
                            <InputAdornment position="end">
                              <img
                                src=" images/gasv2.png"
                                style={{ width: "26px" }}
                              />
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </Box>

                    <Box align="left" mt={3}>
                      <Button
                        variant="contained"
                        color="primary"
                        // onClick={Editprofile}
                      >
                        Echange Crypto
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <Box className={classes.mainBoxcreate}>
                  {/* form start */}

                  {/* form end */}
                  <Box className={classes.displayflex}>
                    <Box mb={2}>
                      <Typography variant="h4" style={{ marginLeft: "-11px" }}>
                        Fiat
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton>
                        <AccessTimeIcon
                          onClick={() => setIconOpen(!iconOpen)}
                          style={{ color: "#fff" }}
                        />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box mt={2}>
                    <label style={{ marginLeft: "-10px" }}>From :</label>
                    <FormControl fullWidth className={classes.margin}>
                      <Input
                        type="number"
                        onKeyPress={(event) => {
                          if (
                            event?.key === "-" ||
                            event?.key === "+" ||
                            event?.key === "="
                          ) {
                            event.preventDefault();
                          }
                        }}
                        id="standard-adornment-amount"
                        placeholder="From"
                        style={{ marginLeft: "-10px" }}
                        onChange={_onInputChange}
                        name="from"
                        endAdornment={
                          <InputAdornment position="end">
                            <img
                              src="images/usd_icon.png"
                              // src="images/usdt2.png"
                              style={{ width: "45px" }}
                            />
                          </InputAdornment>
                        }
                      />
                    </FormControl>

                    <Box mt={2} mb={2}>
                      <label style={{ marginLeft: "-10px" }}>To :</label>
                      <FormControl fullWidth className={classes.margin}>
                        <Input
                          type="number"
                          onKeyPress={(event) => {
                            if (
                              event?.key === "-" ||
                              event?.key === "+" ||
                              event?.key === "="
                            ) {
                              event.preventDefault();
                            }
                          }}
                          id="standard-adornment-amount"
                          placeholder="To"
                          style={{ marginLeft: "-10px" }}
                          onChange={_onInputChange}
                          name="from"
                          endAdornment={
                            <InputAdornment position="end">
                              <img
                                src=" images/gasv2.png"
                                style={{ width: "26px" }}
                              />
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </Box>

                    <Box align="left" mt={3}>
                      <Button
                        variant="contained"
                        color="primary"
                        // onClick={Editprofile}
                      >
                        Pay Now
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            {/*  */}
            <div>
              {/* 
      <Page title="Dashboard">
        <Box p={2} pb={"80px"}>
          <Typography variant="h3" style={{ marginBottom: "10px" }}>
           User LIST
        </Typography>
          <Divider />
        </Box>
      </Page> */}
              {/* <Box pl={4} mt={4}>
                {" "}
                <Typography
                  variant="h3"
                  style={{
                    fontWeight: "500",
                    color: "rgb(37, 45, 71)",
                    marginBottom: "20px",
                    fontSize: "35px",
                  }}
                >
                  {" "}
                  Sub-Admin List &nbsp;
                </Typography>{" "}
              </Box> */}
              {/* <Container> */}
              &nbsp; &nbsp; &nbsp; &nbsp;
              {iconOpen && (
                <>
                  <Box className={classes.contanerClass}>
                    <Grid container spacing={2}>
                      <Grid item lg={2} md={2} sm={4} xs={12}>
                        <Typography style={{ paddingBottom: "7px" }}>
                          Filter
                        </Typography>
                        <TextField
                          id="outlined-basic"
                          label="Filter By"
                          placeholder="Wallet address"
                          size="small"
                          style={{ width: "100%" }}
                          variant="outlined"
                          // onChange={(e) => setsearch(e.target.value)}
                          fullWidth
                        />
                      </Grid>
                      <Grid item lg={3} md={3} sm={4} xs={12}>
                        <Typography>From</Typography>
                        <KeyboardDatePicker
                          className={classes.imgSvg}
                          placeholder="DD/MM/YYYY"
                          // value={selectedDate}
                          // onChange={(date) => {
                          //   setSelectedDate(new Date(date));
                          // }}
                          format="DD/MM/YYYY"
                          inputVariant="outlined"
                          margin="dense"
                          name="startDate"
                          fullWidth
                        />
                      </Grid>
                      <Grid item lg={3} md={3} sm={4} xs={12}>
                        <Typography>To</Typography>
                        <KeyboardDatePicker
                          className={classes.imgSvg}
                          placeholder="DD/MM/YYYY"
                          // value={toDate}
                          // onChange={(date) => {
                          //   setToDate(new Date(date));
                          // }}
                          format="DD/MM/YYYY"
                          inputVariant="outlined"
                          margin="dense"
                          name="startDate"
                          fullWidth
                        />
                      </Grid>
                      <Grid item lg={2} md={2} sm={6} xs={12}>
                        <Box className={classes.buttonBox}>
                          <Button
                            // onClick={hancleClear}
                            className={classes.clearButton}
                          >
                            Clear
                          </Button>
                          {/* <Button
                        // onClick={hancleClear}
                        className={classes.clearButton}
                      >
                        Clear
                      </Button> */}
                        </Box>
                      </Grid>
                      <Grid item lg={2} md={2} sm={6} xs={12}>
                        <Box className={classes.buttonBox}>
                          <Button
                            // onClick={hancleClear}
                            className={classes.clearButton}
                          >
                            Clear
                          </Button>
                          {/* <Button
                        // onClick={hancleClear}
                        className={classes.clearButton}
                      >
                        Clear
                      </Button> */}
                        </Box>
                      </Grid>
                      {/* <Grid item lg={2} md={2} sm={6} xs={12}>
                    <Box className={classes.buttonBox}>
                      <Button className={classes.csvButton}>
                        <CSVLink
                          // data={userlist && userlist}
                          style={{
                            color: "#FFF",
                            display: "flex",
                            justifyContent: "center",
                            textDecoration: "none",
                          }}
                        >
                          Download Csv
                        </CSVLink>
                      </Button>
                    </Box>
                  </Grid> */}
                    </Grid>
                  </Box>
                  {/* </Container> */}
                  <Box m={4}>
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell
                              style={{
                                color: "white",
                                backgroundColor: "#252d47",
                              }}
                              align="left"
                            >
                              S.No
                            </TableCell>

                            <TableCell
                              style={{
                                color: "white",
                                backgroundColor: "#252d47",
                                minWidth: "120px",
                              }}
                            >
                              Type
                            </TableCell>
                            <TableCell
                              style={{
                                color: "white",
                                backgroundColor: "#252d47",
                                minWidth: "150px",
                              }}
                              align="left"
                            >
                              Date
                            </TableCell>
                            <TableCell
                              style={{
                                color: "white",
                                backgroundColor: "#252d47",
                                minWidth: "150px",
                              }}
                              align="left"
                            >
                              Buy
                            </TableCell>
                            <TableCell
                              style={{
                                color: "white",
                                backgroundColor: "#252d47",
                                minWidth: "150px",
                              }}
                              align="left"
                            >
                              Price
                            </TableCell>

                            <TableCell
                              style={{
                                color: "white",
                                backgroundColor: "#252d47",
                              }}
                              align="left"
                            >
                              Status
                            </TableCell>

                            {/* <TableCell
                          style={{
                            color: "white",
                            backgroundColor: "#252d47",
                            minWidth: "180px",
                          }}
                          align="center"
                        >
                          Action
                        </TableCell> */}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {userlist.map((userlist, index) => {
                            return (
                              // {userlist.userType !== ("USER")?():""}
                              <TableRow key={index} className={classes.root}>
                                <TableCell component="th" scope="row">
                                  {userlist?.image1}
                                </TableCell>
                                <TableCell align="left">
                                  {userlist?.text2}
                                </TableCell>
                                <TableCell align="left">
                                  {userlist?.text1}
                                </TableCell>
                                <TableCell align="left">
                                  {userlist?.text4}
                                </TableCell>
                                <TableCell align="left">
                                  {userlist?.text6}
                                </TableCell>
                                <TableCell align="left">
                                  {userlist?.text3}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </>
              )}
            </div>

            {/*  */}
          </Container>
        </Box>
      </Box>
    </>
  );
}
