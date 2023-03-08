import React from 'react'
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  makeStyles,
  InputBase,
  Link,
} from '@material-ui/core'

const useStyles = makeStyles({
  mainbox: {
    "& a":{
      "&:hover":{
        textDecoration: "none",
      },
    },
    backgroundImage: 'url(./images/middlebg.png)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    paddingTop: '70px',
    position: 'relative',
    paddingBottom: '80px',
    zIndex: '1',
    '&::after': {
      content: "''",
      zIndex: '-1',
      position: 'absolute',
      width: '100%',
      bottom: '0',
      background: 'rgb(0,0,0)',
      background:
        '#00000057',
      height: '100%',
    },
    '& h3': {
      fontSize: '24px',
      fontWeight: '400',
      color: '#ffffff',
      marginTop: '20px',
      marginBottom: '40px',
    },
   
  },
  buttonright: {
    // padding: '10px 50px',
    fontSize: '24px',
    fontWeight: '400',
    backgroundColor: '#F83838',
  },
})

function Content() {
  const classes = useStyles()
  return (
    <Box className={classes.mainbox}>
      <Container maxWidth="md">
        <Box className="subtext" textAlign="center">
          <Typography variant="h5" title=" STAY UP TO DATE AND RECEIVE EXCLUSIVE CONTENT"> STAY UP TO DATE AND RECEIVE EXCLUSIVE CONTENT</Typography>
        </Box>
        <Box align="center">
          <Button
            href="https://discord.com/invite/Jjv3xYAqsf" target="_blanck"
            component={Link}
            variant="contained"
            color="primary"
          >
            JOIN OUR COMMUNITY
          </Button>
        </Box>
        {/* <Grid container spacing={4}>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <Box>
              <InputBase
                type="text"
                fullWidth
                placeholder="Email"
                className={classes.text}
                style={{ backgroundColor: '#fff', borderRadius: '3px' }}
              />
            </Box>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className={classes.buttonright}
              >
                SIGN UP
              </Button>
            </Box>
          </Grid>
        </Grid> */}
      </Container>
    </Box>
  )
}

export default Content
