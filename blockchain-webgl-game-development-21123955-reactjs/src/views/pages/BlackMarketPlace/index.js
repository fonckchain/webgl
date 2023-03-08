import React,{useState,useEffect,useContext} from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  InputAdornment,
  TextField,
  FormControl,
  Divider,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress
} from "@material-ui/core";
import { AiOutlineSearch } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import Slider from "@material-ui/core/Slider";
// import FormControl from '@material-ui/core/FormControl';
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import BlackMaketCard from "src/component/BlackMarketCard";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import apiConfig from "../../../component/config/ApiConfig";
import { UserContext } from "src/context/User";
import NoDataFound from "../NoDataFound";

const useStyles = makeStyles((theme) => ({
  aboutsection: {
    paddingBottom: "100px",
    backgroundColor: "#120720",
  },
  textbox: {
    "& h1": {
      fontSize: "50px",
      fontWeight: "400",
      color: "#fff",
      [theme.breakpoints.down("md")]: {
        fontSize: "30px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "20px",
      },
    },
    "& p": {
      fontSize: "16px",
      marginTop: "20px",
      color: "#fff",
    },
  },
  accordion: { background: "transparent", position: "relative" },

  accordionBox: {
    width: "100%",
  },
  formCheck: {
    "&.MuiFormControlLabel": {
      fontSize: "16px",
      "&.span": {
        color: "#fff",
      },
    },
  },
  formControl: {
    height: "45px",
    backgroundColor: "#120720",
    color: "#fff",
    border: "1px solid #ccc6",
    width: "100%",
    padding: "0 10px",
    borderRadius: 0,
    "&:focus-visible": {
      outline: "none",
    },
  },
}));
const TeamMap = [
  {
    image1: "images/car1.png",
    bPrice: "19",
    text1: "NK20",
    text2: "Alberts",
    text3: "#4023",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car2.png",
    bPrice: "12",
    text1: "BLACK KI",
    text2: "Alberts",
    text3: "#4023",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car3.png",
    bPrice: "84",
    text1: "Eagle (AMC)",
    text2: "Alberts",
    text3: "#4023",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car4.png",
    bPrice: "23",
    text1: "Blackhawk (Stutz)",
    text2: "0/0/0",
    text3: "#4023",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car1.png",
    bPrice: "73",
    text1: "Tiger (Sunbeam)",
    text2: "Alberts",
    text3: "#4023",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car2.png",
    bPrice: "95",
    text1: "Sunbird (Pontiac)",
    text2: "Alberts",
    text3: "#4023",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car3.png",
    bPrice: "85",
    text1: "Borno",
    text2: "Alberts",
    text3: "#4023",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car4.png",
    bPrice: "16",
    text1: "Lark (Studebaker)",
    text2: "Alberts",
    text3: "#4023",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car1.png",
    bPrice: "42",
    text1: "Pinto (Ford)",
    text2: "Alberts",
    text3: "#4023",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car2.png",
    bPrice: "03",
    text1: "McLaren Senna",
    text2: "Alberts",
    text3: "#4023",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car3.png",
    bPrice: "92",
    text1: "Aston Martin Vanquish",
    text2: "Alberts",
    text3: "#4023",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car4.png",
    bPrice: "12",
    text1: "Triumph Spitfire",
    text2: "Alberts",
    text3: "#4023",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car1.png",
    bPrice: "09",
    text1: "Volkswagen Beetle",
    text2: "Alberts",
    text3: "#4023",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car2.png",
    bPrice: "512",
    text1: "AMC Gremlin",
    text2: "Alberts",
    text3: "#4023",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car3.png",
    bPrice: "152",
    text1: "Plymouth Road Runner",
    text2: "0/0/0",
    text3: "#4023",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/car4.png",
    bPrice: "23",
    text1: "Bentley Mulsanne",
    text2: "Alberts",
    text3: "#4023",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
];
export default function () {
  const classes = useStyles();
  const history = useHistory();
  const user = useContext(UserContext);
  const [inventory, setInventory] = useState("");
  const ownedNft = JSON.stringify(inventory?.result);

console.log("ownedNft", ownedNft);
console.log("inventory.result", inventory.result);


  const [age, setAge] = React.useState("");
  const [blackMarket, setblackMarket] = React.useState("Black Market");
  const [value, setValue] = React.useState(30);
  const [loader1, setloader1] = React.useState(false);


  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleChange1 = (event) => {
    setAge(event.target.value);
  };
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [openHostory, setOpenHistory] = React.useState(false);
  const handleClose1 = () => {
    setOpenHistory(false);
  };
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
    wazid: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { gilad, jason, antoine, wazid } = state;
  const error = [gilad, jason, antoine, wazid].filter((v) => v).length !== 2;
const wallet = sessionStorage.getItem("wallet");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setInventory(
      await user?.client.getAssets({ user: wallet, sell_orders: true })
    );
  };

 const [allCollection, setAllCollection] = useState([]);

 console.log("allCollection", allCollection);

  const listBlackMarket = async () => {
    try {
      setloader1(true)
      const response = await axios.get(apiConfig.listBlackMarket);

      if (response.data.statusCode !== 200) {
        console.log("bbb");
        setloader1(false)
      } else {
        setAllCollection(response.data.result);
        setloader1(false)
      }
      console.error("meesse");
    } catch (err) {
      setloader1(false)
      console.error(err.response);
    }
  };
  useEffect(() => {
    listBlackMarket();
  }, []);

  return (
    <Box className={classes.aboutsection}>
      <Container maxWidth="lg" className="wow bounceInUp">
        {/* <Button
          variant="text"
          color="secondary"
          size="large"
          className={classes.button}
          onClick={() => history.goBack()}
          startIcon={<ArrowBackIosIcon />}
        >
          Back
        </Button> */}
        <Box className={classes.textbox} align="center" mb={5} mb={7}>
          <Box mt={5}>
            <Accordion className={classes.accordion}>
              <Grid
                // style={{ position:"absolute" }}
                container
                spacing={2}
              >
                <Grid item lg={1} md={2} sm={3} xs={12}>
                  <AccordionSummary
                    className={classes.AccordionSum}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography variant="h5" style={{ color: "#ccc" }}>
                      {" "}
                      <FiFilter /> Filter
                    </Typography>
                  </AccordionSummary>
                </Grid>
                <Grid item lg={5} md={2} xs={12}></Grid>
                <Grid item lg={3} md={4} sm={6} xs={12}>
                  <Box style={{ textAlign: "start" }}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="Search"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AiOutlineSearch style={{ fontSize: "20px" }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Grid>

                <Grid item lg={3} md={4} sm={6} xs={12}>
                  <select className={classes.formControl}>
                    <option>-- Sort by --</option>
                    <option>Class</option>
                    <option>Entry Fee</option>
                    <option>Start Time</option>
                    <option>Registered</option>
                    <option>Distance</option>
                  </select>
                </Grid>
              </Grid>

              <AccordionDetails>
                <Box className={classes.accordionBox}>
                  <Grid container>
                    <Grid item lg={3} sm={6} md={6}>
                      <Container>
                        <Box pb={2} pt={2}>
                          <Typography variant="body1">Generation</Typography>
                        </Box>
                        <Grid container>
                          <Grid item lg={4} sm={4} md={4} xs={12}>
                            <Box style={{ textAlign: "start", height: "70px" }}>
                              <TextField
                                variant="outlined"
                                fullWidth
                                placeholder="1"
                              />
                            </Box>
                          </Grid>
                          <Grid item lg={4} sm={4} md={4} xs={12}></Grid>
                          <Grid item lg={4} sm={4} md={4} xs={12}>
                            <Box style={{ textAlign: "start", height: "48px" }}>
                              <TextField
                                variant="outlined"
                                fullWidth
                                placeholder="1"
                              />
                            </Box>
                          </Grid>
                          <Grid item sm={12} md={12}>
                            <Slider
                              value={typeof value === "number" ? value : 0}
                              onChange={handleSliderChange}
                              aria-labelledby="input-slider"
                            />
                          </Grid>
                        </Grid>
                        <Box pb={2} textAlign="start" pt={2}>
                          <Button
                            type="submit"
                            style={{
                              border: "1px solid #eb0dca",
                              borderRadius: "22px",
                              width: "120px",
                              padding: "10px",
                            }}
                          >
                            Reset
                          </Button>
                        </Box>
                      </Container>
                    </Grid>

                    <Grid item lg={9} sm={6} md={6}>
                      <Grid container>
                        <Grid item lg={3} sm={6} md={6}>
                          <Box pt={2}>
                            <Typography variant="body1">Engine</Typography>
                          </Box>
                          <Box>
                            <FormControl
                              component="fieldset"
                              className={classes.formCheck}
                            >
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      color="primary"
                                      checked={gilad}
                                      onChange={handleChange}
                                      name="gilad"
                                    />
                                  }
                                  label="Gilad Gray"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      color="primary"
                                      checked={jason}
                                      onChange={handleChange}
                                      name="jason"
                                    />
                                  }
                                  label="Jason Killian"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      color="primary"
                                      checked={antoine}
                                      onChange={handleChange}
                                      name="antoine"
                                    />
                                  }
                                  label="Antoine Llorca"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      color="primary"
                                      checked={wazid}
                                      onChange={handleChange}
                                      name="wazid"
                                    />
                                  }
                                  label="Antoine Llorca"
                                />
                              </FormGroup>
                            </FormControl>
                          </Box>
                        </Grid>
                        <Grid item lg={3} sm={6} md={6}>
                          <Box pt={2}>
                            <Typography variant="body1">Power</Typography>
                          </Box>
                          <Box>
                            <FormControl
                              component="fieldset"
                              className={classes.formCheck}
                            >
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      color="primary"
                                      checked={antoine}
                                      onChange={handleChange}
                                      name="antoine"
                                    />
                                  }
                                  label="Antoine Llorca"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      color="primary"
                                      checked={wazid}
                                      onChange={handleChange}
                                      name="wazid"
                                    />
                                  }
                                  label="Antoine Llorca"
                                />
                              </FormGroup>
                            </FormControl>
                          </Box>
                        </Grid>
                        <Grid item lg={3} sm={6} md={6}>
                          <Box pt={2}>
                            <Typography variant="body1">Tier</Typography>
                          </Box>
                          <Box>
                            <FormControl
                              component="fieldset"
                              className={classes.formCheck}
                            >
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      color="primary"
                                      checked={gilad}
                                      onChange={handleChange}
                                      name="gilad"
                                    />
                                  }
                                  label="Gilad Gray"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      color="primary"
                                      checked={jason}
                                      onChange={handleChange}
                                      name="jason"
                                    />
                                  }
                                  label="Jason Killian"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      color="primary"
                                      checked={antoine}
                                      onChange={handleChange}
                                      name="antoine"
                                    />
                                  }
                                  label="Antoine Llorca"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      color="primary"
                                      checked={wazid}
                                      onChange={handleChange}
                                      name="wazid"
                                    />
                                  }
                                  label="Antoine Llorca"
                                />
                              </FormGroup>
                            </FormControl>
                          </Box>
                        </Grid>
                        <Grid item lg={3} sm={6} md={6}>
                          <Box pt={7}>
                            <FormControl
                              component="fieldset"
                              className={classes.formCheck}
                            >
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      color="primary"
                                      checked={antoine}
                                      onChange={handleChange}
                                      name="antoine"
                                    />
                                  }
                                  label="Antoine Llorca"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      color="primary"
                                      checked={wazid}
                                      onChange={handleChange}
                                      name="wazid"
                                    />
                                  }
                                  label="Antoine Llorca"
                                />
                              </FormGroup>
                            </FormControl>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Divider style={{ borderBottom: "2px solid #190A2C" }} />
          </Box>
        </Box>
        {loader1 ? 
      (  <Box pt={4} textAlign="center" margin={2}>
      <CircularProgress style={{ color: "#311499" }} />
    </Box>)  :(
      <>
			{allCollection && allCollection.length >0 ? 
      (<Grid container spacing={3}>
        {allCollection &&
          allCollection.map((data, i) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <BlackMaketCard
                loader1={loader1}
                  data={data}
                  blackMarket={"Black Market"}
                  index={i}
                />
              </Grid>
            );
          })}
      </Grid>):
      
      (<NoDataFound/>)}
      </>
    )
      }
        
      </Container>
    </Box>
  );
}
