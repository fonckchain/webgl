import React from 'react'
import { Grid, Box, Container, Typography, makeStyles } from '@material-ui/core'
import Slider from 'react-slick'
import CollectionCard from 'src/component/CollectionCard'
const useStyles = makeStyles((theme) => ({
  aboutsection: {
    padding: '80px 0',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      padding: '100px 0',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '50px 0',
    },
  },
  textbox: {
    '& h1': {
      fontSize: '70px',
      fontWeight: '800',
      color: '#fff',
      [theme.breakpoints.down('md')]: {
        fontSize: '60px',
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: '30px',
      },
    },
    '& p': {
      fontSize: '16px',
      marginTop: '20px',
      color: '#fff',
    },
  },
}))
const GalleryCard = [
  {
    image: 'images/collection/1.png ',
  },
  {
    image: 'images/collection/2.png',
  },
  {
    image: 'images/collection/3.png ',
  },
  {
    image: 'images/collection/4.png ',
  },
  {
    image: 'images/collection/5.png ',
  },
  {
    image: 'images/collection/6.png',
  },
]
export default function () {
  const classes = useStyles()
  const settings = {
    dots: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    infinite: false,
    autoplay: true,
    centerMode: false,
    centerPadding: '60px',
    className: 'recomended',
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          centerMode: true,
          centerPadding: '50px',
          autoplay: false,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '40px',
          autoplay: false,
        },
      },
    ],
  }
  return (
    <Box className={classes.aboutsection}>
      <Container maxWidth="lg" className="wow bounceInUp">
        <Box className={classes.textbox} align="center" mb={5} mb={7}>
          <Typography variant="h1" align="center">
            {' '}
            Our Knights
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Slider
            {...settings}
            className="width100"
            style={{ width: '100%', position: 'relative' }}
          >
            {GalleryCard.map((data, i) => {
              return (
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={12}
                  key={i}
                  className="walletSet"
                >
                  <CollectionCard data={data} type="timing" index={i} />
                </Grid>
              )
            })}
          </Slider>
        </Grid>
      </Container>
    </Box>
  )
}
