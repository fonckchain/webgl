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
} from "@material-ui/core";
import { BiLockOpen } from "react-icons/bi";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { UserContext } from "src/context/User";
import apiConfig from "src/component/config/ApiConfig";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import axios from "axios";
import { GiCancel } from "react-icons/gi";
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
  boxImagesChanges: {
    width: "111%",
    height: "101px",
    margin: "-4px 4px 0px -8px",
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
    padding: "20px",
    boxShadow: "0px 4px 8px rgb(0 0 0 / 12%)",
    maxHeight: "428px",
    height: "100%",
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
}));

export default function FAQ() {
  const [imageFile, setImageFile] = useState("");
  const [imgBuild, setimgBuild] = useState("");
  const [imageBase64, setImageBase64] = useState("images/editprofilepic.png");
  console.log("imagebaseBlobe", imageBase64);
  const [isSubmit, setIsSubmit] = useState(false);
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
      setImageBase64(
        user.profileDetails?.profilePic
          ? user.profileDetails?.profilePic
          : "images/editprofilepic.png"
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
      imageBase64
    )
      try {
        setIsLoading(true);

        if (sessionStorage.getItem("token")) {
          const formData = new FormData();
          formData.append("name", editUser.name);
          formData.append("email", editUser.email);
          formData.append("profilePic", imageBase64);
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
            user.userProfileDeatils();

            setIsLoading(false);
            history.push({
              pathname: "/profile",
              search: user?.userData?._id,
            });
          } else {
            setIsLoading(false);
            toast.error(res.data.responseMessage);
            user.userProfileDeatils();
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={7}>
                <Box className={classes.mainBoxcreate}>
                  <Typography variant="h2" className={classes.PageHeading}>
                    Edit Profile{" "}
                  </Typography>
                  <Typography variant="body">
                    You can set preferred display name, create your branded
                    profile URL and manage other personal settings{" "}
                  </Typography>

                  {/* form start */}

                  {/* form end */}

                  <Box mt={2}>
                    <label>Display name :</label>
                    <FormControl fullWidth className={classes.margin}>
                      <Input
                        placeholder="Enter your display name"
                        name="name"
                        value={editUser.name}
                        onChange={_onInputChange}
                        error={isSubmit && editUser.name === ""}
                        // helperText={
                        //   isSubmit &&
                        //   editUser.name === "" &&
                        //   "Please Enter name"
                        // }
                      />
                    </FormControl>
                    <Box mt={1}>
                      {(isSubmit && editUser.name === "" && (
                        <Typography
                          variant="body2"
                          style={{ color: "#ff7d68" }}
                        >
                          Please enter name
                        </Typography>
                      )) ||
                        (isSubmit && editUser.name.length > 30 && (
                          <Typography
                            variant="body2"
                            style={{ color: "#ff7d68" }}
                          >
                            Must be only 30 character
                          </Typography>
                        )) ||
                        (isSubmit && !validUsername(editUser.name) && (
                          <Typography
                            variant="body2"
                            style={{ color: "#ff7d68" }}
                          >
                            Please enter valid user name
                          </Typography>
                        ))}
                    </Box>

                    <Box mt={2} mb={2}>
                      <label>Email :</label>

                      <FormControl fullWidth className={classes.margin}>
                        <Input
                          id="standard-adornment-amount"
                          placeholder="Hidden email"
                          onChange={_onInputChange}
                          name="email"
                          value={editUser.email}
                          error={isSubmit && editUser.email === ""}
                          helperText={
                            (isSubmit &&
                              editUser.email === "" &&
                              "Please enter email") ||
                            (!isEmailValid &&
                              "Please enter valid email address")
                          }
                          endAdornment={
                            <InputAdornment position="end">
                              <BiLockOpen />
                            </InputAdornment>
                          }
                        />
                        <Box mt={1}>
                          {(isSubmit && editUser.email === "" && (
                            <Typography
                              variant="body2"
                              style={{ color: "#ff7d68" }}
                            >
                              Email address is required
                            </Typography>
                          )) ||
                            (!isEmailValid && (
                              <Typography
                                variant="body2"
                                style={{ color: "#ff7d68" }}
                              >
                                Please enter valid email address
                              </Typography>
                            ))}
                        </Box>

                        <small style={{ paddingTop: "10px" }}>
                          You must sign message to view or manage your email.{" "}
                          <span>Sign message</span>
                        </small>
                      </FormControl>
                    </Box>
                    {tokenAmountErrorMessage && (
                      <Box
                        textAlign="left"
                        // ml={1}
                        // mt={1}
                        // mb={1}
                        style={{
                          color: "rgb(186, 31, 17)",
                          fontWeight: "500",
                          fontSize: "17px",
                        }}
                      >
                        {tokenAmountErrorMessage}
                      </Box>
                    )}
                    <Box align="left" mt={3}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={Editprofile}
                      >
                        UPDATE PROFILE
                        {isLoading && <ButtonCircularProgress />}
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={5}>
                <Box className={classes.mainBoxcreate}>
                  <Box>
                    <Box pb={2}>
                      <label>Add profile Image</label>
                    </Box>
                    <Box className={classes.Box}>
                      {imageBase64 !== "" && (
                        <Box style={{ position: "relative" }}>
                          <figure className={classes.boxImagesChanges}>
                            <img
                              src={imageBase64}
                              // width="150"
                              // height="90"
                              // style={{ borderRadius: 25 }}
                              alt=""
                            />
                          </figure>
                          <GiCancel
                            onClick={() => {
                              setImageFile("");
                              setImageBase64("");
                              // setcover('')
                            }}
                            style={{
                              position: "absolute",
                              top: "-8px",
                              right: "-1px",
                              height: "1.5em",
                              width: "1.5em",
                            }}
                          />
                        </Box>
                      )}
                    </Box>
                    <Box mt={1} ml={1}>
                      {isSubmit && imageBase64 === "" && (
                        <small style={{ color: "#ff7d68" }}>
                          Image is required
                        </small>
                      )}
                    </Box>
                    <Box>
                      <small>
                        We recommend an image of at least 400x400. Gifs work
                        too.
                      </small>
                    </Box>
                    <Box align="left" mb={2} style={{ marginTop: "10px" }}>
                      <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="raised-button-file"
                        name="profilePic"
                        multiple
                        type="file"
                        // onChange={(e) => {
                        //   setCoverBlob(URL.createObjectURL(e.target.files[0]));
                        //   setCoverFile(e.target.files[0]);
                        //   getBase64(e.target.files[0], (result) => {
                        //     setCoverFileBase(result);
                        //   });
                        // }}
                        onChange={(e) => {
                          setimgBuild(URL.createObjectURL(e.target.files[0]));
                          setImageFile(e.target.files[0]);
                          getBase64(e.target.files[0], (result) => {
                            setImageBase64(result);
                          });
                        }}
                      />
                      <label htmlFor="raised-button-file">
                        <Button
                          variant="contained"
                          color="primary"
                          component="span"
                        >
                          CHOOSE FILE
                        </Button>
                      </label>
                    </Box>
                  </Box>

                  <Box>
                    <Box pb={2}>
                      <label>Add Cover Image</label>
                    </Box>
                    <Box className={classes.Box}>
                      {coverFileBase !== "" && (
                        <Box style={{ position: "relative" }}>
                          <figure className={classes.boxImagesChanges}>
                            <img
                              src={coverFileBase}
                              // width="150"
                              // height="90"
                              // style={{ borderRadius: 25 }}
                              alt=""
                            />
                          </figure>
                          <GiCancel
                            onClick={() => {
                              setCoverFile("");
                              setCoverFileBase("");
                              // setcover('')
                            }}
                            style={{
                              position: "absolute",
                              top: "-8px",
                              right: "-1px",
                              height: "1.5em",
                              width: "1.5em",
                            }}
                          />
                        </Box>
                      )}
                    </Box>
                    <Box style={{ paddingTop: "5px" }}>
                      <small>
                        We recommend an image of at least 400x400. Gifs work
                        too.
                      </small>
                    </Box>
                    <Box align="left" mb={2} style={{ marginTop: "10px" }}>
                      <input
                        // disabled={isLoading}
                        accept="image/*"
                        style={{ display: "none" }}
                        id="raised-button-file-cover"
                        multiple
                        type="file"
                        accept=".jpg,.png,.gif,.webp"
                        onChange={(e) => {
                          setCoverBlob(URL.createObjectURL(e.target.files[0]));
                          setCoverFile(e.target.files[0]);
                          getBase64(e.target.files[0], (result) => {
                            setCoverFileBase(result);
                          });
                        }}
                      />
                      <label htmlFor="raised-button-file-cover">
                        <Button
                          variant="contained"
                          color="primary"
                          component="span"
                        >
                          CHOOSE FILE
                        </Button>
                      </label>
                    </Box>
                  </Box>
                </Box>
                {/* kkkk */}

                {/* gggg */}
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
}
