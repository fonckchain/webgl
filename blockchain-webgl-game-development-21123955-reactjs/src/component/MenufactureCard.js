import { makeStyles } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { Box, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  manCard: {
    backgroundColor: "#120720",
    padding: "0px 17px 10px 17px",
  },
  imgFig: {
    height: "200px",
    // width: "169px",
    cursor: "pointer",
    // margin: "4px",
    "@media(max-width:768px)": {
      height: "200px",
      marginLeft: "22px",
    },
  },
  manCardcolor: {
    backgroundColor: "#1d0e33",
  },
}));

export default function MunufactureCard(props) {
  const classes = useStyles();
  const history = useHistory();

  const { data } = props;
  return (
    <Box>
      <Box className={classes.manCard}>
        <Box pb={1}></Box>
        <Box className={classes.manCardcolor}>
          <Box
            onClick={() => {
              history.push({
                pathname: "/dealer-details",
                search: data?.collection?.name,
                data: data?.collection?.name,
                img: data?.collection.icon_url,
              });
            }}
            width="100%"
            // style={{ margin: "0 auto" }}
          >
            <figure className={classes.imgFig}>
              <img
                style={{
                  maxHeight: "106px",
                  margin: "56px 0px 0px 27px",
                  width: "80%",
                  // marginLeft: "-10px",
                }}
                src={"images/carimages.png"}
                // src={
                //   data?.collection?.icon_url
                //     ? data?.collection?.icon_url
                //     : "images/carimages.png"
                // }
                alt=""
                width="100%"
              />
            </figure>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" pb={1}>
          <Typography
            style={{
              color: "white",
            }}
          >
            {data?.collection?.name}
          </Typography>
          {/* <img src={data.img} alt="" style={{ width: "50%" }} /> */}
        </Box>
      </Box>
    </Box>
  );
}
