// import Link from 'next/link'
import Layout from '../components/Layout';
import { withRedux } from '../lib/withRedux';
import { withApollo } from '../lib/withApollo';
// import { useSelector, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { Button, Typography, Grid, Link as LinkM, Box, Zoom } from '@material-ui/core';
// import { useQuery } from '@apollo/react-hooks';
// import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/styles';
import AnimatedCard from '../components/AnimatedCard'
import DecoratedExpand from '../components/DecorateExpand'
import { useSpring, animated } from 'react-spring'

const IndexPage = () => {
  const classes = useStyles()
  const props = useSpring({
    opacity: 1,
    font: "Roboto",
    fontSize: "60px",
    fontWeight: "lighter",
    from: { opacity: 0, fontSize: "600px" },
    config: { duration: 500 }
  })


  return (
    <>
      <Layout title='Portara | Home'>
        <Box maxWidth='sm' className={classes.container}>
          <Grid className={classes.content}>

            {/* <Typography variant='h2'>Portara</Typography> */}
            <animated.div style={props}>Portara</animated.div>

            {/* <img src={'https://imgur.com/U0PyleJ.png'} alt='wtf' /> */}
            <Typography variant='h5'>The best rate limiter that exists</Typography>


            <Typography
              variant='subtitle2'
              color="textSecondary"
            >This rate limiter accompishes what no other ratelimiter can by using directives for it's application and some serious throttling
          </Typography>


            <Button className={classes.downloadButton}>
              <LinkM target='_blank' href='https://www.npmjs.com/package/portara' underline='none' >
                <Typography color='primary'>Download on NPM</Typography>
              </LinkM>
            </Button>
            <AnimatedCard>
              <img src={"/portaraScreenshot2.png"} height="400px" />
            </AnimatedCard>
          </Grid>
          {/* CARDS */}
          <Grid className={classes.cardsWrapper}>
            <Box className={classes.cardsContainer}>
              <Zoom in style={{ transitionDelay: "500ms" }}>
                <Grid item xs={3} className={classes.card}>
                  <Box className={classes.upperSplit}>
                    <Typography variant="h5">First feature</Typography>
                    <Typography variant="body1">Something you can't be without</Typography>
                  </Box>
                  <Box className={classes.lowerSplit}>
                    <Typography variant="body2" color="textSecondary">Here we discuss the first amazing feature of Portara</Typography>
                  </Box>
                </Grid>
              </Zoom>
              <Zoom in style={{ transitionDelay: "1000ms" }}>
                <Grid item xs={3} className={classes.card}>
                  <Box className={classes.upperSplit}>
                    <Typography variant="h5">Second feature</Typography>
                    <Typography variant="body1">Something you can't be without</Typography>
                  </Box>
                  <Box className={classes.lowerSplit}>
                    <Typography variant="body2" color="textSecondary">Here we discuss the second amazing feature of Portara</Typography>
                  </Box>
                </Grid>
              </Zoom>
              <Zoom in style={{ transitionDelay: "1500ms" }}>
                <Grid item xs={3} className={classes.card}>
                  <Box className={classes.upperSplit}>
                    <Typography variant="h5">Third feature</Typography>
                    <Typography variant="body1">Something you can't be without</Typography>
                  </Box>
                  <Box className={classes.lowerSplit}>
                    <Typography variant="body2" color="textSecondary">Here we discuss the third amazing feature of Portara</Typography>
                  </Box>
                </Grid>
              </Zoom>
            </Box>
            <DecoratedExpand>
              {['abc',]}
            </DecoratedExpand>

          </Grid>
          <br />
        </Box>
        <Box maxWidth='sm' className={classes.gradientContainer}>
          <Box className={classes.images} >
            {/* <img src={'https://imgur.com/viE03IQ.png'} alt='wtf' height='300px' width='600px' /> */}
            {/* <img src={"/portaraScreenshot2.png"} height="400px" /> */}
            <br />
            {/* <img src={'https://imgur.com/HzsaNfY.png'} alt='wtf' height='300px' width='600px' /> */}
          </Box>
        </Box>
      </Layout >
    </>
  );
};

// This may need to change, but basically compose works by combining wrapper functions into one
export default compose(withApollo, withRedux)(IndexPage);


// ------- STYLING FOR THIS PAGE -----
const useStyles = makeStyles(() => ({
  container: {
    // background: `url("https://images.unsplash.com/photo-1486783046960-64d2ef697c46?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80")`,
    backgroundSize: "contain",
    backgroundColor: 'black',
    padding: '25px',
    margin: "0 10%",
    // marginLeft: "200px",
  },
  gradientContainer: {
    background: 'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(0,0,0,1) 100%)',
    padding: '25px',
    // maxWidth: '1000px',
    margin: '0px',
    marginRight: '0px'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  downloadButton: {
    backgroundColor: "#7209b7",
    marginTop: "40px",
    '&:hover': {
      backgroundColor: "rgba(114,111,156,1)",
      // border: "1px solid #7209b7"
    }
  },
  cardsWrapper: {
    marginTop: "100px",
  },
  cardsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "10px",
  },
  card: {
    borderBottomLeftRadius: "0px",
    color: "white",
    backgroundColor: "#7209b7",
    borderRadius: "10px",
    // marginRight: "60px",
    height: "150px",

  },
  upperSplit: {
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "30px",
    padding: "10px",
    width: "100%",
    height: "60%",
    // backgroundColor: "#3a506b",
    background: "linear-gradient(197deg, rgba(114,111,156,1) 0%, rgba(58,80,107,1) 65%, rgba(58,80,107,1) 100%)",

  },
  lowerSplit: {
    borderRadius: "10px",

    padding: "10px",


  },
  images: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: .5,
    flexShrink: .5,
    flexBasis: 'auto',
    alignItems: 'center',
    // backgroundColor: 'white',
    paddingTop: '15px',
    paddingBottom: '15px',
  }
}))
