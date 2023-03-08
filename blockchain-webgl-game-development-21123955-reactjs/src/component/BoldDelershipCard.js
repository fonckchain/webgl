import { makeStyles } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { Box, Typography, Grid } from "@material-ui/core";
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
const useStyles = makeStyles((theme) => ({
  manCard: {
    backgroundColor: "#120720",
    padding: "0px 20px 10px 20px",
  },
  manCardcolor: {
    padding: "50px",
    backgroundColor: "#1d0e33",
  },
  youtext: {
    color: "#ffffff",
    "& h3": {
      fontSize: "40px",
      fontFamily: "Dismedia",
      textAlign: "center",
    },
  },
  tireBox: {
    display: "flex",
    backgroundColor: "#120720",
  },
  imgBox: {
    margin: "0 auto",
    width: "120px",
    height: "120px",
    "& img": {
      width: "100%",
    },
  },
  btnbox: {
    backgroundColor: "#FF2E5F",
    padding: "30 10px 30px 10px",
    fontSize: "25px",
    color: "#ffffff",
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)",
    borderRadius: "5px",
  },
  btnbox1: {
    backgroundColor: "#47DF00",
    padding: "30 10px 30px 10px",
    borderRadius: "5px",

    color: "#ffffff",
    fontSize: "25px",
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)",
  },
}));

export default function BoltDelershipCard(props) {
  const classes = useStyles();
  const { data } = props;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <Box className={classes.manCard}>
        <Box pt={1} pb={1}>
          <Typography
            style={{ color: "#fff", textAlign: "center", fontWeight: "900" }}
          >
            {data?.text1}
          </Typography>
        </Box>
        <Box className={classes.manCardcolor} onClick={handleClickOpen}>
          <img src="images/car2.png" alt="" style={{ width: "100%" }} />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          pt={1}
          pb={1}
          alignItems="center"
        >
          <Box width="30px" height="30px">
            <img src="images/gasv2.png" alt="" style={{ width: "100%" }} />
          </Box>{" "}
          <Box>
            <Typography style={{ color: "#ffffff" }}>15000</Typography>
          </Box>
        </Box>
      </Box>

      {/* modal */}
      <div>
        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <Box p={2}>
            <Box className={classes.youtext}>
              <Typography variant="h3">
                {" "}
                You are about to mint a <br /> costmetic part.
              </Typography>
            </Box>
            <Box pt={2}>
              <Box className={classes.tireBox}>
                <Grid container spacing={4}>
                  <Grid item lg={2} md={6} xs={12}>
                    <Box className={classes.imgBox}>
                      <img src="images/tire.png" alt="" />
                    </Box>
                  </Grid>
                  <Grid item lg={2} md={6} xs={12}>
                    <Box className={classes.imgBox}>
                      <img src="images/tire.png" alt="" />
                    </Box>
                  </Grid>
                  <Grid item lg={2} md={6} xs={12}>
                    <Box className={classes.imgBox}>
                      <img src="images/tire.png" alt="" />
                    </Box>
                  </Grid>
                  <Grid item lg={2} md={6} xs={12}>
                    <Box className={classes.imgBox}>
                      <img src="images/tire.png" alt="" />
                    </Box>
                  </Grid>
                  <Grid item lg={2} md={6} xs={12}>
                    <Box className={classes.imgBox}>
                      <img src="images/tire.png" alt="" />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box pt={4} pb={3}>
              <Typography
                style={{
                  color: "#ffffff",
                  textAlign: "center",
                  fontWeight: "500",
                }}
              >
                $0.00 = 15000
              </Typography>
            </Box>
            <Box pt={1}>
              <Box display="flex">
                <Button
                  style={{ height: "39px" }}
                  fullWidth
                  variant="contained"
                  color="Primary"
                  onClick={handleClose}
                  className={classes.btnbox}
                >
                  Close
                </Button>
                &nbsp; &nbsp; &nbsp;
                <Button
                  style={{ height: "39px" }}
                  variant="contained"
                  color="Primary"
                  fullWidth
                  className={classes.btnbox1}
                >
                  Open
                </Button>
              </Box>
            </Box>
          </Box>
          {/* <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              You are about to mint a costmetic part.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={handleClose} color="primary">
              Agree
            </Button>
          </DialogActions> */}
        </Dialog>
      </div>
    </Box>
  );
}
