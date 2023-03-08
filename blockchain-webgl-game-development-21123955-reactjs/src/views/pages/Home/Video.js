import React from 'react'
import { Box, Typography, Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  mainbox: {
    // backgroundColor: '#120720',
    position: 'relative',
    zIndex: '9',
    marginTop: '-250px',
  },
  imgbox: {
    textAlign: 'center',
    width: '100%',
    //height: '100vh',
    backgroundColor: '#08111B',
    boxSizing: 'border-box',
    border: '9px solid transparent',
    borderImage: 'linear-gradient(to right,#04D9B2,#0354AA,#F20544)',
    borderImageSlice: '1',
    overflow: 'hidden',
  },
  videobox: {
    width: '100%',
  },
  subtext: {
    '& h3': {
      fontSize: '50px',
      fontWeight: '400',
      color: '#ffffff',
      marginTop: '120px',
      marginBottom: '20px',
    },
  },
  model: {
    marginBottom: '20px',
    marginTop: '50px',
    '& h3': {
      fontSize: '18px',
      fontWeight: '400',
      color: '#ffffff',
      background: ' rgba(0, 0, 0, 0.3)',
      border: '0.5px solid #FFFFFF',
      boxSizing: ' border-box',
      textAlign: 'center',
      padding: '15px 10px',
      display: 'flex',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
}))

function Features() {
  const classes = useStyles()
  return (
    <Box className={classes.mainbox}>
      <Container maxWidth="lg">
        <Grid container className={classes.model} spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            {' '}
            <Typography variant="h3">9000 MINTABLE CAR MODELS</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            {' '}
            <Typography variant="h3">UPGRADE & CUSTOMIZE YOUR CAR</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            {' '}
            <Typography variant="h3">RACE AND COMPETE WITH FRIENDS</Typography>
          </Grid>
        </Grid>
        <Box className={classes.imgbox}>
          <video
            controls
            autoPlay
            muted
            loop
            // loop="true"
            // autoplay="true"
            width="100%"
            className={classes.videobox}
          >
            <source src="images/MetaKnightPromoVideo1.mp4" type="video/mp4" />
          </video>
        </Box>
      </Container>
    </Box>
  )
}

export default Features
