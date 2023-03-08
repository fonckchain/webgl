import React from 'react'
import {
  Box,
  Typography,
  Container,
  Grid,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import StudCard from 'src/component/StudCard'
const TeamMap = [
  {
    image1: './images/smallcar.png',
    image2: './images/smallenigma.png',
    text1: 'Z20 - Stallion - Buterin',
    text2: '$76.55 ',
    text3: 'USD',
  },
  {
    image1: './images/smallcar.png',
    image2: './images/smallenigma.png',
    text1: 'Z20 - Stallion - Buterin',
    text2: '$76.55 ',
    text3: 'USD',
  },
  {
    image1: './images/smallcar.png',
    image2: './images/smallenigma.png',
    text1: 'Z20 - Stallion - Buterin',
    text2: '$76.55 ',
    text3: 'USD',
  },
  {
    image1: './images/smallcar.png',
    image2: './images/smallenigma.png',
    text1: 'Z20 - Stallion - Buterin',
    text2: '$76.55 ',
    text3: 'USD',
  },
  {
    image1: './images/smallcar.png',
    image2: './images/smallenigma.png',
    text1: 'Z20 - Stallion - Buterin',
    text2: '$76.55',
    text3: 'USD',
  },
  {
    image1: './images/smallcar.png',
    image2: './images/smallenigma.png',
    text1: 'Z20 - Stallion - Buterin',
    text2: '$76.55',
    text3: 'USD',
  },
  {
    image1: './images/smallcar.png',
    image2: './images/smallenigma.png',
    text1: 'Z20 - Stallion - Buterin',
    text2: '$76.55',
    text3: 'USD',
  },
  {
    image1: './images/smallcar.png',
    image2: './images/smallenigma.png',
    text1: 'Z20 - Stallion - Buterin',
    text2: '$76.55 ',
    text3: 'USD',
  },
  {
    image1: './images/smallcar.png',
    image2: './images/smallenigma.png',
    text1: 'Z20 - Stallion - Buterin',
    text2: '$76.55',
    text3: 'USD',
  },
  {
    image1: './images/smallcar.png',
    image2: './images/smallenigma.png',
    text1: 'Z20 - Stallion - Buterin',
    text2: '$76.55',
    text3: 'USD',
  },
  {
    image1: './images/smallcar.png',
    image2: './images/smallenigma.png',
    text1: 'Z20 - Stallion - Buterin',
    text2: '$76.55',
    text3: 'USD',
  },
  {
    image1: './images/smallcar.png',
    image2: './images/smallenigma.png',
    text1: 'Z20 - Stallion - Buterin',
    text2: '$76.55',
    text3: 'USD',
  },
]
const useStyles = makeStyles((theme) => ({
  mainbox: {
    backgroundColor: '#120720',
    padding:"50px 0",
    '& h1': {
      fontSize: '50px',
      fontWeight: '400',
      color: '#ffffff',
      textAlign: 'center',
      marginBottom: '20px',
    },
    '& p': {
      fontSize: '16px',
      fontWeight: '400',
      color: '#979494',
    },
  },
  borderbg: {
    marginBottom: '80px',
  },
}))

function Stud() {
  const classes = useStyles()
  return (
    <Box className={classes.mainbox}>
      <Container maxWidth="lg">
      <Box className="subtext" textAlign="center">
          <Typography variant="h3" title="IN STUD">IN STUD</Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          className={classes.borderbg}
        >
          <img
            src="./images/borderbg.png"
            alt=""
            width="100%"
            style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}
          />
        </Box>
        <Grid container spacing={3}>
          {TeamMap.map((data, i) => {
            return (
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <StudCard data={data} index={i} />
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Box>
  )
}

export default Stud
