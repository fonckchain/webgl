import React from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  Link,
  Button,
  makeStyles,
} from "@material-ui/core";
import NotificationCard from "src/component/NotificationCard";

const FaqDataList2 = [
  {
    img: "images/icon.png ",
    title: "Race Car  ",
    time: "Unicorn Cake Arts ",
    discription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy  ",
  },
  {
    img: "images/icon.png ",
    title: "Race Car  ",
    time: "Race Car ",
    discription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy  ",
  },
  {
    img: "images/icon.png ",
    title: "Race Car  ",
    time: "Race Car ",
    discription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy  ",
  },
  {
    img: "images/icon.png",
    title: "Race Car  ",
    time: "Unicorn Cake Arts ",
    discription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy  ",
  },
];

const useStyles = makeStyles((theme) => ({
  FAQ: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(6),
  },
  PageHeading: {
    fontSize: "45px",
    fontWeight: "bold",
    lineHeight: "55px",
    color: "#fff",
    textAlign: "left",
  },
}));

export default function FAQ() {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.FAQ}>
        {/* featured */}
        <Box mt={2} mb={2}>
          <Container maxWidth="lg" align="left">
            <Box className="subtext" textAlign="center">
              <Typography variant="h3" title="  Notification">
                Notification
              </Typography>
            </Box>

            <Box>
              <Grid container spacing={2}>
                {FaqDataList2.map((data, i) => {
                  return (
                    <Grid item xs={12} sm={12} md={12} key={i}>
                      <NotificationCard data={data} index={i} />
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
            <Box
              mr={4}
              style={{ display: "flex", justifyContent: "end" }}
              align="right"
            >
              <Button variant="containedPrimary" color="primary" size="large">
                DELETE ALL
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}
