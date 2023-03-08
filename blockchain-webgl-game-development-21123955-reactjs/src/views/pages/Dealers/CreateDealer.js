import React,{useState} from "react";
import {
  Box,
  Container,
  Typography, TextField, Button,
  makeStyles,
  Grid,
  withStyles
} from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import apiConfig from '../../../component/config/ApiConfig'
import ButtonCircularProgress from "../../../component/ButtonCircularProgress";


import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";



import {
  getBase64,
} from "src/services";
const useStyles = makeStyles((theme) => ({
  StakeBox: {
    borderRadius: "10px",
    overflow: "hidden",
    position: "relative",
    background: "linear-gradient( 152.97deg, rgba(255, 255, 255, 0.08) 0%, rgba(232, 66, 76, 0.062) 100%)",
    transition: "0.5s",
    backdropFilter: "blur(42px)",
    padding: "20px 15px",

    '& h6': {
      color: "#FABE25",
    },
    '& label': {
      marginBottom: "5px",
      display: "block",
      color: "#9F9F9F",
      padding: "0",
      lineHeight: "33px",
      fontSize: "14px",
      transition: "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },

    // '& span': {

    //   color: "#9F9F9F",
    // padding: "0",
    // lineHeight: "10px",
    // fontSize: "12px",
    // transition: "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    // },




    "& h1": {
      fontSize: "50px",
      fontWeight: "600",
      lineHeight: "67px",
      letterSpacing: "3px",
      display: "inline-block",
      color: "#fff",
      [theme.breakpoints.down("lg")]: {
        fontSize: "46px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "30px",
        lineHeight: "40px",
      },
    },

    "&:hover": {
      '& .wallet_box': {
        opacity: "1",
        top: "30%",
        right: "-60px",
      },
      '& .wallet_box:first-child': {
        opacity: "1",
        top: "30%",
        right: "-60px",
      },
    },
  },
  box: {
    height: "150px",
    width: "150px",
    borderRadius: "50%",
    background: "#f6a52d4d",
    position: "absolute",
    top: "100%",
    right: "-150px",
    transition: "0.5s all",
  },

  textbox: {
    "& h1": {
      fontSize: "45px",
      fontWeight: "bold",
      lineHeight: "76px",
      color: "#f13a3b",
      [theme.breakpoints.down("xs")]: {
        fontSize: "30px",
      },
    },
    "& p": {
      fontSize: "18px",
      color: "#fff",
    },
  },


  tableBox: {
    padding: "50px 0 30px",
  },
  bottomtext: {
    color: "#9F9F9F",
    display: "block",
    padding: "0",
    fontSize: "12px",
    transition:
      "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    /* line-height: 33px; */
    marginBottom: "5px",
    marginTop: "8px",
  },
  // uploadBox: {
  //     border: "1px dashed #898989",
  //     boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.12)",
  //     borderRadius: "15px",
  //     height:"100px",
  //   },
}));

function CreateDealer(props) {
  const history = useHistory();
  const classes = useStyles();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imgFileBase, setImgFileBase] = useState("");
  const [imgFile, setImgFile] = useState("");
  const [imgBlob, setImgBlob] = useState("");
  const [profileVideo, setprofileVideo] = useState("");

  const [imageBase64, setImageBase64] = useState("");
  const [imgBuild, setimgBuild] = useState("");
  const [coverBlob, setCoverBlob] = useState("");
  const [coverFile, setCoverFile] = useState("");
  const [coverFileBase, setCoverFileBase] = useState("");

  const token = sessionStorage.getItem("token");
  const address = sessionStorage.getItem("userAddress");
  // console.log("address", address);



// console.log("ProfilePic", imageBase64);
// console.log("imgFileBase", imgFileBase);

  const [formValue, setFormValue] = useState({
    name: "",
    title: "",
    description: "",
    walletddress: "",
  });
  const _onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    const temp = { ...formValue, [name]: value };
    setFormValue(temp);
  };
const addDealer = async () => {
  setIsSubmit(true);
  if (
    formValue.name !== "" &&
    formValue.title !== "" &&
    formValue.description !== "" &&
    // formValue.name !== "" &&
    address !== "" 
    // coverBlob !== ""&&
    // profileVideo !== ""
  ) {
    setIsLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("name", formValue.name);
      formdata.append("headerTitle", formValue.title);
      formdata.append("description", formValue.description);
      formdata.append("walletAddress", formValue.walletddress);
      formdata.append("logo", coverBlob);
      formdata.append("videoURL", profileVideo);
      // console.log("formdata", formdata);
      const res = await axios.post(apiConfig.addDealer, formdata, {
        headers: {
          token,
        },
      });
      if (res.data.statusCode !== 200) {
        toast.error(res.data.responseMessage);
      } else {
        toast.success(res.data.responseMessage);
       
      }
      console.log("res", res);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);

      console.log("ERROR", error);
    }
  }
};
// console.log("isSubmit", isSubmit);
  return (
    <Box mt={5}>
      <Box className={classes.textbox} align="center">
        <Typography variant="h1"> Create Dealer</Typography>
      </Box>
      <Container maxWidth="md">
        <Grid
          container
          spacing={4}
          style={{
            border: "1px solid rgb(33 27 40)",
            boxShadow: "rgb(182 180 180 / 15%) 1.95px 1.95px 2.6px",
          }}
        >
          <Grid item xs={12} md={6} className="order2">
            <Box mb={2}>
              <Box>
                <Grid container spacing={2} className="">
                  <Grid item xs={12} sm={12} lg={12}>
                    <label>logo</label>
                    <Box
                      className="uploadBox"
                      style={{ border: "1px solid #3f374a", padding: "25px" }}
                    >
                      <Typography variant="h6">JPG, PNG. Max 20mb.</Typography>

                      <Typography variant="body2">
                        (620 x 620 recommended)
                      </Typography>
                      <input
                        disabled={isLoading}
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
                        // error={isSubmit && coverBlob === ""}
                        // helperText={
                        //   isSubmit &&
                        //   coverBlob === "" &&
                        //   "Please seect cover image"
                        // }
                      />

                      <label htmlFor="raised-button-file-cover">
                        <Button
                          style={{
                            marginTop: "10px",
                            fontSize: "14px",
                            borderRadius: "30px",
                          }}
                          disabled={isLoading}
                          variant="contained"
                          color="primary"
                          component="span"
                        >
                          Choose File
                        </Button>
                      </label>
                      {isSubmit && coverBlob === "" && (
                        <Typography
                          variant="body2"
                          style={{ color: "#ff7d68" }}
                        >
                          Please select logo
                        </Typography>
                      )}
                    </Box>
                    {/* {uploadBanner ? <label>Upload cover</label> : ""} */}
                    {/* {uploadBanner ? ( */}
                    <Grid item xs={12} sm={12} lg={12}>
                      <Box mt={2} className="mainBox">
                        <label className={classes.labeltext} for="fname">
                          Upload Video
                        </label>
                        <Box
                          className="uploadBox"
                          style={{
                            border: "1px solid #3f374a",
                            padding: "25px",
                          }}
                        >
                          <Typography variant="h6">
                            JPG, PNG, GIF, WEBP, MP4 or MP3. Max 20mb.
                          </Typography>

                          <Typography variant="body2">
                            (620 x 620 recommended)
                          </Typography>
                          <input
                            disabled={isLoading}
                            // accept='image/*'
                            style={{ display: "none" }}
                            id="raised-button-file-img"
                            multiple
                            type="file"
                            accept=".jpg,.mp4,.mp3,.png,.gif,.webp"
                            onChange={(e) => {
                              setprofileVideo(
                                URL.createObjectURL(e.target.files[0])
                              );
                              setImgFile(e.target.files[0]);
                              getBase64(e.target.files[0], (result) => {
                                setImgFileBase(result);
                              });
                            }}
                          />
                          {/* {isSubmit && profileVideo === "" && (
                            <Typography
                              variant="body2"
                              style={{ color: "#ff7d68" }}
                            >
                              Please select image
                            </Typography>
                          )} */}
                          <label htmlFor="raised-button-file-img">
                            <Button
                              style={{
                                marginTop: "10px",
                                fontSize: "14px",
                                borderRadius: "30px",
                              }}
                              //   disabled={isLoading}
                              variant="contained"
                              color="primary"
                              component="span"
                            >
                              Choose File
                            </Button>
                          </label>
                          {/* {isSubmit && imgBlob === "" && (
                          <Typography
                            variant="body2"
                            style={{ color: "#ff7d68" }}
                          >
                            Please select image
                          </Typography>
                        )} */}
                        </Box>
                      </Box>
                    </Grid>
                    <Box mt={4}>
                      <Box mt={4}>
                        <Box>
                          <Box mt={2}>
                            <Grid item xs={12} sm={12} lg={12}>
                              <Box mt={2} className="mainBox">
                                <label
                                  className={classes.labeltext}
                                  for="fname"
                                >
                                  Name
                                </label>
                                <TextField
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder=""
                                  fullWidth
                                  value={formValue.name}
                                  name="name"
                                  onChange={_onInputChange}
                                  error={isSubmit && formValue.name === ""}
                                  helperText={
                                    isSubmit &&
                                    formValue.name === "" &&
                                    "Please enter name"
                                  }
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} lg={12}>
                              <Box mt={2} className="mainBox">
                                <label
                                  className={classes.labeltext}
                                  for="fname"
                                >
                                  Title
                                </label>

                                <TextField
                                  id="outlined-basic"
                                  variant="outlined"
                                  placeholder=""
                                  value={formValue.title}
                                  name="title"
                                  fullWidth
                                  onChange={_onInputChange}
                                  error={isSubmit && formValue.title === ""}
                                  helperText={
                                    isSubmit &&
                                    formValue.title === "" &&
                                    "Please enter title"
                                  }
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} lg={12}>
                              <Box mt={2} className="mainBox">
                                <label
                                  className={classes.labeltext}
                                  for="fname"
                                >
                                  Description
                                </label>

                                <TextField
                                  id="outlined-basic"
                                  variant="outlined"
                                  value={formValue.description}
                                  name="description"
                                  placeholder=""
                                  fullWidth
                                  onChange={_onInputChange}
                                  error={
                                    isSubmit && formValue.description === ""
                                  }
                                  helperText={
                                    isSubmit &&
                                    formValue.description === "" &&
                                    "Please enter description"
                                  }
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} lg={12}>
                              <Box mt={2} className="mainBox">
                                <label
                                  className={classes.labeltext}
                                  for="fname"
                                >
                                  Wallet Address
                                </label>

                                <TextField
                                  id="outlined-basic"
                                  variant="outlined"
                                  value={formValue.walletddress}
                                  name="walletddress"
                                  placeholder=""
                                  fullWidth
                                  onChange={_onInputChange}
                                  error={
                                    isSubmit && formValue.walletddress === ""
                                  }
                                  helperText={
                                    isSubmit &&
                                    formValue.walletddress === "" &&
                                    "Please enter walletddress"
                                  }
                                />
                              </Box>
                            </Grid>
                            <Button
                              style={{
                                marginTop: "20px",
                                borderRadius: "35px",
                              }}
                              onClick={addDealer}
                              variant="contained"
                              size="large"
                              color="primary"
                              disabled={isLoading}
                            >
                              Add Dealer{" "}
                              {isLoading && <ButtonCircularProgress />}
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} className="order1">
            <label>Logo</label>
            <Box className="preiewBox">
              {/* <Typography variant="h6">
              Upload file to preview your brand new NFT
              </Typography> */}
              <Box className="CardBox">
                <Box
                  className="collectionSet "
                  style={{
                    padding: "20px",
                    background: "#2d2439",
                    border: "0",
                    borderRadius: "20px",
                    color: "white",
                    minHeight: "200px",
                    maxWidth: "60%",
                  }}
                >
                  {!coverBlob && (
                    <Box className="card_heading">
                      <Typography>
                        Upload file to preview your brand new NFT
                      </Typography>
                    </Box>
                  )}

                  {/* {imgBlob && ( */}
                  <Box className={classes.NftImg}>
                    {/* <Link href="/nft-details"> */}
                    <img
                      src={coverBlob}
                      // src=""
                      // width='250'
                      // height='200'
                      alt=""
                      style={{
                        borderRadius: "5px",
                        maxWidth: "100%",
                        maxHeight: "100%",
                      }}
                    />
                  </Box>
                  {/* )} */}
                  {/* {imgFileBase && imgFile && imgFile.size < 20000000 && (
                      <Box className={classes.NftImg}>
                        <video controls style={{
                          borderRadius: "5px",
                          maxWidth: "100%",
                          maxHeight: "100%"
                        }}>
  
                          <source src={imgFileBase}
                            type="video/webm" />
  
                          <source src="/media/cc0-videos/flower.mp4"
                            type="video/mp4" />
  
                        </video>
                      </Box>
                    )} */}

                  <Box mt={2}>
                    <Grid container justify="space-between">
                      <Grid item className="NFTDetailsBox"></Grid>
                      <Box className="FooterData">
                        <Box>
                          {/* <Typography variant="h6">{title}</Typography> */}

                          <Typography variant="body2">
                            {/* {isAuction === "timed" ? startPrice : price} */}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Box>
                </Box>
              </Box>
            </Box>
            &nbsp;&nbsp;&nbsp;
            {/* {uploadBanner ? ( */}
            <div>
              &nbsp;&nbsp;&nbsp;
              <label>Cover Preview</label>
              <Box className="preiewBox">
                <Box className="CardBox">
                  <Box
                    className="collectionSet "
                    style={{
                      padding: "20px",
                      background: "#2d2439",
                      border: "0",
                      borderRadius: "20px",
                      color: "white",
                      minHeight: "200px",
                      maxWidth: "60%",
                    }}
                  >
                    {/* {coverFileBase && ( */}
                    <Box className={classes.NftImg}>
                      <img
                        src={profileVideo}
                        alt=""
                        style={{
                          borderRadius: "5px",
                          maxWidth: "100%",
                          maxHeight: "100%",
                        }}
                      />
                    </Box>
                    {/* )} */}
                  </Box>
                </Box>
              </Box>
            </div>
            {/* ) : (
                ""
              )} */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default CreateDealer;
