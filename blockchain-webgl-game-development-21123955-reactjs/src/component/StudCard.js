import React from 'react'
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  makeStyles,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
  mainbox: {
    textDecoration: "none",
  },
  bgbox: {
    backgroundColor: '#120720',
    padding: '10px',
    border: '1px solid #6C0863',
    borderRadius: '10px',
    "&:hover":{
      backgroundColor: "#241a2f",
      filter: "drop-shadow(0px -1px 5px #6c0863)",
    },
  },
  smallimg: {
    width: '100%',
    maxWidth: '80px',
    margin: '0 auto',
  },
  textimg: {
    width: '100%',
    maxWidth: '100px',
    margin: '0 auto',
  },
  pricetype: {
    fontSize: '21px',
    fontWeight: '400',
    color: '#1CE9E9 !important',
  },
  currency: {
    fontSize: '16px',
    fontWeight: '400',
  },
}))

function StudCard(props) {
  const classes = useStyles()
  const { data } = props
  return (
    <Box className={classes.mainbox} component={Link} to="/race-details">
      <Box className={classes.bgbox}>
        <Grid container alignItems="center">
          <Grid item lg={2} md={2} sm={6} xs={12}>
            <Box>
              <img
                src={data.image1}
                alt=""
                width="100%"
                className={classes.smallimg}
              />
            </Box>
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <Box>
              <img
                src={data.image2}
                alt=""
                width="100%"
                className={classes.textimg}
              />
            </Box>
          </Grid>
          <Grid item lg={5} md={5} sm={6} xs={12}>
            <Box>
              <Typography variant="body1">{data.text1}</Typography>
            </Box>
          </Grid>
          <Grid item lg={2} md={2} sm={6} xs={12}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography className={classes.pricetype}>
                {data.text2}
              </Typography>

              <Typography className={classes.currency}>{data.text3}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default StudCard
