import React, { useState, useContext, useEffect } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Select,
  MenuItem,
  IconButton,
  FormControl,
  InputAdornment,
  InputLabel,
  Input,
  FormHelperText,
  TextField,
} from "@material-ui/core";

import CollectionCreate from "src/views/pages/NFT/CollectionCreate";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import Switch from "@material-ui/core/Switch";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import { MdAddCircle } from "react-icons/md";
import { CgTimelapse } from "react-icons/cg";
import { HiTag } from "react-icons/hi";
import { GiCancel } from "react-icons/gi";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { useHistory } from "react-router";
import moment from "moment";
import { useWeb3React } from "@web3-react/core";
import { UserContext } from "src/context/User";
import {
  addImageHandler,
  approveTokenHandler,
  createNFTBlockchainHanlder,
  createNFTHandler,
  getBase64,
  getDateDiff,
  getTokenId,
  placeOrderAPIHandler,
  placeOrderBlockchainHandler,
  uploadNFTHandler,
} from "src/services/index";
import {
  getMarketplaceContractAddress,
  getNetworkDetails,
  networkList,
} from "src/constants";
import axios from "axios";
import apiConfig from "src/component/config/ApiConfig";
import CollectionCard from "src/component/CollectionCard";
import { toast } from "react-toastify";
import DeployABI from "src/ABI/DeployABI.json";
import MarketPlaceABI from "src/ABI/MarketPlaceABI.json";
import { DataLoading } from "src/component/PageLoading";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
// import TextField
import Stepper from "@material-ui/core/Stepper";
// import { Link } from "react-router-dom";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Slider from "@material-ui/core/Slider";
import { RiTelegramLine } from "react-icons/ri";
import { TiSocialTwitterCircular } from "react-icons/ti";

const useStyles = makeStyles((theme) => ({
  mainBoxcreate: {
    padding: "15px",
    border: "1px solid #3d3d3d",
    background:
      "linear-gradient( 152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    backdropFilter: "blur(42px)",
    borderRadius: " 16px",
    "& label": {
      color: "#fff",
      fontSize: "16px",
      fontWeight: "600",
      marginBottom: "10px",
    },
  },
  customizedButton: {
    position: "absolute",
    top: "0",
    right: "0",
    // color: "#fff",
    color: "#f00",
  },
  paper: {
    overflowY: "unset",
  },
  NftImg: {
    borderRadius: 10,
    display: "block",
    height: "220px",
    position: "relative",
    overflow: "hidden",
    textALign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& img": {
      maxWidth: "100%",
      maxHeight: "220px",
      width: "auto",
    },
  },
  NftBreed: {
    background: "transparent",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(10),
  },
  PageHeading: {
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "39px",
    color: "#898989",
    paddingBottom: "10px",
    display: "flex",
    alignItems: "center",
    "& span": {
      color: "#000",
      lineHeight: "0",
      cursor: "pointer",
      position: "relative",
      "&:hover div": {
        opacity: "1",
      },
      "& svg": {
        paddingLeft: "5px",
        color: "#898989",
      },
    },
  },
  button: {
    marginTop: "10px",
    height: "45px",
    minWidth: "90px",
  },
  createbox: {
    "& .MuiDialog-paperScrollPaper": {
      width: 450,
      maxWidth: 450,
      minWidth: 450,
      [theme.breakpoints.down("sm")]: {
        width: "95%",
        maxWidth: "95%",
        minWidth: "95%",
      },
    },
  },
  innerCollection: {
    position: "absolute",
    width: "calc(100% - 40px)",
    bottom: "0px",
    left: "50%",
    transform: "translateX(-50%)",
    borderRadius: "20px 20px 0 0",
    padding: "20px",
    background: "#1a1919",
  },
  selectOption: {
    width: "300px",
    display: "flex",
    justifyContent: "space-around",

    flexDirection: "row",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "100%",
    margin: "0 10px",
  },
  sectionTitleHead: {
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
    margin: "10px 0 ",
    padding: "0 0",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  title: {
    borderBottom: "1px solid #eaeaea",
  },
  ListItem: {
    "& span": {
      fontSize: "20px",
      lineHeight: "30px",
      color: "#f30065",
      fontWeight: "400",
    },
    "& p": {
      fontSize: "14px",
      lineHeight: "22px",
      color: "#898989",
      fontWeight: "400",
    },
  },

  createIcon: {
    width: 100,
    height: 100,
    color: "#222",
  },
  formControl: {
    padding: 0,
    width: "100%",
  },
  walletSet: {
    padding: "0 15px 0 0",
  },
}));

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 41,
    height: 20,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(19px)",
      color: "#039BE3",
      "& + $track": {
        opacity: 1,
        backgroundColor: "#039BE3",
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 17,
    height: 17,
    backgroundColor: "#fff",
    boxShadow: "none",
  },
  track: {
    borderRadius: 25,
    opacity: 1,
    backgroundColor: "#039BE3",
  },

  checked: {},
}))(Switch);

export default function DealerRegistration() {
  const classes = useStyles();
  const history = useHistory();
  const { account, chainId, library } = useWeb3React();
  const [isLoading, setIsLoading] = useState(false);
  const user = useContext(UserContext);
  const [isSubmit, setIsSubmit] = useState(false);
  const [loader, setloader] = useState(false);
  const [loader1, setloader1] = useState(false);
  const [loader2, setloader2] = useState(false);

  const tokenAddress = sessionStorage.getItem("token");
  console.log("tokenAddress", tokenAddress);

  const [formValue, setFormValue] = useState({
    name: "",
    company_name: "",
    contact_email: "",
    email: "",
  });
  console.log("formValue", formValue);
  const _onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const temp = { ...formValue, [name]: value };
    setFormValue(temp);
  };

  const updateRegistration = async () => {
    setIsSubmit(true);

    //   if (
    //     formValue.name !== "" &&
    //     formValue.comapnyName !== "" &&
    //     formValue.contactEmail !== "" &&
    //     formValue.email !== ""
    //   ) {
    setIsLoading(true);
    try {
      setloader(true);
      const formdata = new FormData();
      formdata.append("name", formValue.name);
      formdata.append("company_name", formValue.company_name);
      formdata.append("contact_email", formValue.contact_email);
      formdata.append("email", formValue.email);
      const res = await axios.post(
        apiConfig.projectRegistrationRequest,
        formdata,
        {
          headers: {
            tokenAddress,
          },
        }
      );
      if (res.data.statusCode !== 200) {
        setloader(false);
        toast.error(res.data.responseMessage);
        toast.error("error");
      } else {
        setloader(false);
        toast.success(res.data.responseMessage);
        toast.success("completed");
      }

      console.log("res", res);
      setIsLoading(false);
    } catch (error) {
      setloader(false);
      setIsLoading(false);
      toast.error(error.message);

      console.log("ERROR", error);
    }
  };

  const [formValue1, setFormValue1] = useState({
    name: "",
    description: "",
    owner_public_key: "",
    contract_address: "",
    metadata_api_url: "",
    collection_image_url: "",
    icon_url: "",
    email: "",
  });
  console.log("formValue1", formValue1);
  const _onInputChange1 = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const temp = { ...formValue1, [name]: value };
    setFormValue1(temp);
  };

  const createCollection = async () => {
    setIsSubmit(true);

    //   if (
    //     formValue.name !== "" &&
    //     formValue.comapnyName !== "" &&
    //     formValue.contactEmail !== "" &&
    //     formValue.email !== ""
    //   ) {
    setIsLoading(true);
    try {
      setloader1(true);
      const formdata = new FormData();
      formdata.append("name", formValue1.name);
      formdata.append("description", formValue1.description);
      formdata.append("owner_public_key", formValue1.owner_public_key);
      formdata.append("contract_address", formValue1.contract_address);
      formdata.append("metadata_api_url", formValue1.metadata_api_url);
      formdata.append("collection_image_url", formValue1.collection_image_url);
      formdata.append("icon_url", formValue1.icon_url);
      formdata.append("email", formValue1.email);
      const res = await axios.post(apiConfig.collectionRequest, formdata, {
        headers: {
          tokenAddress,
        },
      });
      if (res.data.statusCode !== 200) {
        setloader1(false);
        toast.error(res.data.responseMessage);
        toast.error("error");
      } else {
        setloader1(false);
        toast.success(res.data.responseMessage);
        toast.success("completed");
      }

      console.log("res", res);
      setIsLoading(false);
    } catch (error) {
      setloader1(false);
      setIsLoading(false);
      toast.error(error.message);

      console.log("ERROR", error);
    }
  };

  const [formValue2, setFormValue2] = useState({
    name: "",
    description: "",
    image_url: "",
    image: "",
    animation_url: "",
    animation_url_mime_type: "",
    youtube_url: "",
    email: "",
  });
  console.log("formValue2", formValue2);
  const _onInputChange2 = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const temp = { ...formValue2, [name]: value };
    setFormValue2(temp);
  };

  const metaDataRequest = async () => {
    setIsSubmit(true);

    //   if (
    //     formValue.name !== "" &&
    //     formValue.comapnyName !== "" &&
    //     formValue.contactEmail !== "" &&
    //     formValue.email !== ""
    //   ) {
    setIsLoading(true);
    try {
      setloader2(true);
      const formdata = new FormData();
      formdata.append("name", formValue2.name);
      formdata.append("description", formValue2.description);
      formdata.append("image_url", formValue2.image_url);
      formdata.append("image", formValue2.image);
      formdata.append("animation_url", formValue2.animation_url);
      formdata.append(
        "animation_url_mime_type",
        formValue2.animation_url_mime_type
      );
      formdata.append("youtube_url", formValue2.youtube_url);
      formdata.append("email", formValue2.email);
      const res = await axios.post(apiConfig.metadataRequest, formdata, {
        headers: {
          tokenAddress,
        },
      });
      if (res.data.statusCode !== 200) {
        setloader2(false);
        toast.error(res.data.responseMessage);
        toast.error("error");
      } else {
        setloader2(false);
        toast.success(res.data.responseMessage);
        toast.success("completed");
      }

      console.log("res", res);
      setIsLoading(false);
    } catch (error) {
      setloader2(false);
      setIsLoading(false);
      toast.error(error.message);

      console.log("ERROR", error);
    }
  };
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Box className={classes.NftBreed}>
            {" "}
            <Box>
              <Container maxWidth="md">
                <Grid container spacing={2} className="sectionHeading">
                  <Grid item xs={12}>
                    &nbsp;&nbsp;&nbsp;
                    <Box>
                      <Typography variant="h2" style={{ color: "#fc4f4f" }}>
                        Dealer Registration
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Box>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {/* featured */}
            <Container maxWidth="md">
              <Grid container spacing={4}>
                <Grid item xs={12} md={8} lg={9} className="order2">
                  <Box mb={2} className={classes.mainBoxcreate}>
                    {/* )}{" "} */}
                    <Box mt={3}>
                      &nbsp;&nbsp;
                      <Box>
                        <label>Name :</label>
                        &nbsp;
                        <TextField
                          style={{ marginTop: "10px" }}
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="Type name"
                          fullWidth
                          value={formValue.name}
                          name="name"
                          onChange={_onInputChange}
                        />
                      </Box>
                      &nbsp;&nbsp;
                      <Box>
                        <label>Company Name :</label>
                        &nbsp;
                        <TextField
                          style={{ marginTop: "10px" }}
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="Type company name"
                          fullWidth
                          value={formValue.company_name}
                          name="company_name"
                          onChange={_onInputChange}
                        />
                      </Box>
                      &nbsp;&nbsp;
                      <Box>
                        <label>Contact Email :</label>
                        &nbsp;
                        <TextField
                          style={{ marginTop: "10px" }}
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="https://ABC.io"
                          fullWidth
                          value={formValue.contact_email}
                          name="contact_email"
                          onChange={_onInputChange}
                        />
                      </Box>
                      &nbsp;&nbsp;
                      <Box>
                        <label>Email :</label>
                        &nbsp;
                        <TextField
                          style={{ marginTop: "10px" }}
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="https://ABC.io"
                          fullWidth
                          value={formValue.email}
                          name="email"
                          onChange={_onInputChange}
                        />
                      </Box>
                    </Box>

                    <Box
                      mt={4}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Button
                        onClick={updateRegistration}
                        variant="contained"
                        color="secondary"
                        // disabled={isLoading || network.chainId != chainId}
                      >
                        {" "}
                        Submit
                        {isLoading && <ButtonCircularProgress />}
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        );
      case 1:
        return (
          <Box className={classes.NftBreed}>
            {" "}
            <Box>
              <Container maxWidth="md">
                <Grid container spacing={2} className="sectionHeading">
                  <Grid item xs={12}>
                    &nbsp;&nbsp;&nbsp;
                    <Box>
                      <Typography variant="h2" style={{ color: "#fc4f4f" }}>
                        Create Collection
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Box>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {/* featured */}
            <Container maxWidth="md">
              <Grid container spacing={4}>
                <Grid item xs={12} md={8} lg={9} className="order2">
                  <Box mb={2} className={classes.mainBoxcreate}>
                    {/* )}{" "} */}
                    <Box mt={3}>
                      &nbsp;&nbsp;
                      <Box>
                        <label>Meta Api Url :</label>
                        <TextField
                          style={{ marginTop: "10px" }}
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="https://discord.com/invite/aB1c234"
                          fullWidth
                          value={formValue1.metadata_api_url}
                          name="metadata_api_url"
                          onChange={_onInputChange1}
                        />
                      </Box>
                      &nbsp;&nbsp;
                      <Box>
                        <label>Collection image url :</label>
                        <TextField
                          style={{ marginTop: "10px" }}
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="https://discord.com/invite/aB1c234"
                          fullWidth
                          value={formValue1.collection_image_url}
                          name="collection_image_url"
                          onChange={_onInputChange1}
                        />
                      </Box>
                      &nbsp;&nbsp;
                      <Box>
                        <label>Icon Url :</label>
                        <TextField
                          style={{ marginTop: "10px" }}
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="https://discord.com/invite/aB1c234"
                          fullWidth
                          value={formValue1.icon_url}
                          name="icon_url"
                          onChange={_onInputChange1}
                        />
                      </Box>
                      <Box>
                        <label>Name :</label>
                        <TextField
                          style={{ marginTop: "10px" }}
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="https://discord.com/invite/aB1c234"
                          fullWidth
                          value={formValue1.name}
                          name="name"
                          onChange={_onInputChange1}
                        />
                      </Box>
                      &nbsp;&nbsp;
                      <Box>
                        <label>Owner Public Key :</label>
                        <TextField
                          style={{ marginTop: "10px" }}
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="https://discord.com/invite/aB1c234"
                          fullWidth
                          value={formValue1.owner_public_key}
                          name="owner_public_key"
                          onChange={_onInputChange1}
                        />
                      </Box>
                      &nbsp;&nbsp;
                      <Box>
                        <label>contract_address :</label>
                        <TextField
                          style={{ marginTop: "10px" }}
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="https://discord.com/invite/aB1c234"
                          fullWidth
                          value={formValue1.contract_address}
                          name="contract_address"
                          onChange={_onInputChange1}
                        />
                      </Box>
                      &nbsp;&nbsp;
                      <Box>
                        <label>Desciption :</label>
                        <TextField
                          style={{ marginTop: "10px" }}
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="https://discord.com/invite/aB1c234"
                          fullWidth
                          value={formValue1.description}
                          name="description"
                          onChange={_onInputChange1}
                        />
                      </Box>
                      &nbsp;&nbsp;
                      <Box>
                        <label>Email :</label>
                        <TextField
                          style={{ marginTop: "10px" }}
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="https://discord.com/invite/aB1c234"
                          fullWidth
                          value={formValue1.email}
                          name="email"
                          onChange={_onInputChange1}
                        />
                      </Box>
                    </Box>

                    <Box
                      mt={4}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Button
                        onClick={createCollection}
                        variant="contained"
                        color="secondary"
                        // disabled={isLoading || network.chainId != chainId}
                      >
                        Submit Collection
                        {isLoading && <ButtonCircularProgress />}
                      </Button>
                      {/* <Typography
                          variant="h2"
                          className={classes.PageHeading}
                        >
                          Following{" "}
                          <span>
                            <AiOutlineQuestionCircle />
                            <Box className="information">Unsaved changes</Box>
                          </span>
                        </Typography> */}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        );

      case 2:
        return (
          <Box className={classes.NftBreed}>
            {" "}
            <Box>
              <Container maxWidth="md">
                <Grid container spacing={2} className="sectionHeading">
                  <Grid item xs={12}>
                    &nbsp;&nbsp;&nbsp;
                    <Box>
                      <Typography variant="h2" style={{ color: "#fc4f4f" }}>
                        Meta Details
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Box>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {/* featured */}
            <Container maxWidth="md">
              <Grid container spacing={4}>
                <Grid item xs={12} md={8} lg={9} className="order2">
                  <Box mb={2} className={classes.mainBoxcreate}>
                    {/* )}{" "} */}
                    <Box mt={3}>
                      &nbsp;&nbsp;
                      <Box>
                        <label>Meta Api Url :</label>
                        <TextField
                          style={{ marginTop: "10px" }}
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="https://discord.com/invite/aB1c234"
                          fullWidth
                          value={formValue2.metadata_api_url}
                          name="metadata_api_url"
                          onChange={_onInputChange2}
                        />
                      </Box>
                      &nbsp;&nbsp;
                      <Box>
                        <label>Name :</label>
                        <TextField
                          style={{ marginTop: "10px" }}
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="https://discord.com/invite/aB1c234"
                          fullWidth
                          value={formValue2.name}
                          name="name"
                          onChange={_onInputChange2}
                        />
                      </Box>
                      &nbsp;&nbsp;
                      <Box>
                        <label>Description :</label>
                        <TextField
                          style={{ marginTop: "10px" }}
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="https://discord.com/invite/aB1c234"
                          fullWidth
                          value={formValue2.description}
                          name="description"
                          onChange={_onInputChange2}
                        />
                      </Box>
                      <Box>
                        <label>Image URL :</label>
                        <TextField
                          style={{ marginTop: "10px" }}
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="https://discord.com/invite/aB1c234"
                          fullWidth
                          value={formValue2.image_url}
                          name="image_url"
                          onChange={_onInputChange2}
                        />
                      </Box>
                      &nbsp;&nbsp;
                      <Box>
                        <label>Image :</label>
                        <TextField
                          style={{ marginTop: "10px" }}
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="https://discord.com/invite/aB1c234"
                          fullWidth
                          value={formValue2.image}
                          name="image"
                          onChange={_onInputChange2}
                        />
                      </Box>
                      &nbsp;&nbsp;
                      <Box>
                        <label>Animation Url :</label>
                        <TextField
                          style={{ marginTop: "10px" }}
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="https://discord.com/invite/aB1c234"
                          fullWidth
                          value={formValue2.animation_url}
                          name="animation_url"
                          onChange={_onInputChange2}
                        />
                      </Box>
                      &nbsp;&nbsp;
                      <Box>
                        <label>Animation Url :</label>
                        <TextField
                          style={{ marginTop: "10px" }}
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="https://discord.com/invite/aB1c234"
                          fullWidth
                          value={formValue2.animation_url_mime_type}
                          name="animation_url_mime_type"
                          onChange={_onInputChange2}
                        />
                      </Box>
                      &nbsp;&nbsp;
                      <Box>
                        <label>Youtube Url :</label>
                        <TextField
                          style={{ marginTop: "10px" }}
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="https://discord.com/invite/aB1c234"
                          fullWidth
                          value={formValue2.youtube_url}
                          name="youtube_url"
                          onChange={_onInputChange2}
                        />
                      </Box>
                      &nbsp;&nbsp;
                      <Box>
                        <label>Email :</label>
                        <TextField
                          style={{ marginTop: "10px" }}
                          id="outlined-basic"
                          variant="outlined"
                          placeholder="https://discord.com/invite/aB1c234"
                          fullWidth
                          value={formValue2.email}
                          name="email"
                          onChange={_onInputChange2}
                        />
                      </Box>
                    </Box>

                    <Box
                      mt={4}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Button
                        onClick={metaDataRequest}
                        variant="contained"
                        color="secondary"
                        // disabled={isLoading || network.chainId != chainId}
                      >
                        Submit Meta Data
                        {isLoading && <ButtonCircularProgress />}
                      </Button>
                      {/* <Typography
                          variant="h2"
                          className={classes.PageHeading}
                        >
                          Following{" "}
                          <span>
                            <AiOutlineQuestionCircle />
                            <Box className="information">Unsaved changes</Box>
                          </span>
                        </Typography> */}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        );
      default:
        return "Unknown step";
    }
  }
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = 3;

  const isStepOptional = (step) => {
    return step === 1;
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <Box className={classes.bannerBox}>
      <Box className={classes.textbox} mt={5} mb={5}>
        <Typography variant="h2" align="center">
          NFT Details
        </Typography>
      </Box>
      <div className={classes.root}>
        <Stepper activeStep={activeStep}>
          <Step>
            <StepLabel>
              <Typography variant="h6" align="left">
                Add NFT Details
              </Typography>
              <Typography variant="caption">
                Enter the information in details about Nft
              </Typography>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              <Typography variant="h6" align="left">
                Add Additional Info
              </Typography>
              <Typography variant="caption">
                Let people know who you are
              </Typography>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              <Typography variant="h6" align="left">
                Finish
              </Typography>
              <Typography variant="caption">Review your information</Typography>
            </StepLabel>
          </Step>
        </Stepper>
        <div>
          {activeStep === steps ? (
            <Box my={3}>
              <Typography
                className={classes.instructions}
                style={{ color: "#fff" }}
              >
                All steps completed - Your Pool is created successfully.
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                style={{ marginTop: "10px" }}
                onClick={handleReset}
                className={classes.button}
              >
                Reset
              </Button>
            </Box>
          ) : (
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
              <div>
                {/* <Button variant="outlined" color="primary" size="large" >
                    ADD
                  </Button> */}
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  style={{ marginRight: "7px" }}
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Back
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  // className={classes.button}
                >
                  {activeStep === steps - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Box mt={5}>
        <Typography
          variant="caption"
          align="left"
          style={{ fontSize: "14px", color: "#a09b9b" }}
        >
          Desclaimer: The information provided shall not in any way constitute a
          recommendation as to whether you should invest in any product
          discussed. We accept no liability for any loss occasioned to any
          person acting or refraining from action as a result of any material
          provided or published.
        </Typography>
      </Box>
    </Box>
  );
}
