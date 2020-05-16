// import Link from 'next/link'
import Layout from '../components/Layout';
import LayoutWhite from '../components/LayoutWhite';
import { withRedux } from '../lib/withRedux';
import { withApollo } from '../lib/withApollo';
// import { useSelector, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { Button, Typography, Grid, Link as LinkM, Box, Card, Container } from '@material-ui/core';
// import { useQuery } from '@apollo/react-hooks';
// import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/styles';

const IndexPage = (props: any) => {
  const classes = useStyles()


  return (
    <>
      <Layout title='Portara | Home'>
        <Box maxWidth='sm' className={classes.container}>
          <Grid className={classes.content}>
            {/* <Typography variant='h2'>Portara</Typography> */}
            <img src={'https://imgur.com/U0PyleJ.png'} alt='wtf' />
            <Typography variant='h5'>The best rate limiter that exists</Typography>


            <Typography
              variant='subtitle2'
            >This rate limiter accompishes what no other ratelimiter can by using directives for it's application and some serious throttling
          </Typography>


            <Button className={classes.button}>
              <LinkM target='_blank' href='https://www.npmjs.com/package/portara' underline='none' >
                <Typography color='primary'>Download Laten Sea</Typography>
              </LinkM>
            </Button>
          </Grid>
          <Grid className={classes.cardsWrapper}>
            <Typography variant="h4" color="primary">Limit server overload</Typography>
            <Box className={classes.cardsContainer}>
              <Grid item xs={3} className={classes.card}>
                <Box className={classes.upperSplit}>
                  <Typography variant="h5">Third feature</Typography>
                  <Typography variant="body1">Something you can't be without</Typography>
                </Box>
                <Box className={classes.lowerSplit}>
                  <Typography variant="body2">Here we discuss the third amazing feature of Portara</Typography>
                </Box>
              </Grid>
              <Grid item xs={3} className={classes.card}>
                <Box className={classes.upperSplit}>
                  <Typography variant="h5">Third feature</Typography>
                  <Typography variant="body1">Something you can't be without</Typography>
                </Box>
                <Box className={classes.lowerSplit}>
                  <Typography variant="body2" color="textSecondary">Here we discuss the third amazing feature of Portara</Typography>
                </Box>
              </Grid>
              <Grid item xs={3} className={classes.card}>
                <Box className={classes.upperSplit}>
                  <Typography variant="h5">Third feature</Typography>
                  <Typography variant="body1">Something you can't be without</Typography>
                </Box>
                <Box className={classes.lowerSplit}>
                  <Typography variant="body2">Here we discuss the third amazing feature of Portara</Typography>
                </Box>
              </Grid>
            </Box>

          </Grid>
          <br />
        </Box>
        <Box maxWidth='sm' className={classes.gradientContainer}>
          <Box className={classes.images} >
            <img src={'https://imgur.com/viE03IQ.png'} alt='wtf' height='300px' width='600px' />
            <br />
            <img src={'https://imgur.com/HzsaNfY.png'} alt='wtf' height='300px' width='600px' />
          </Box>
        </Box>
      </Layout >
      {/* <LayoutWhite> */}
      {/* </LayoutWhite> */}
    </>
  );
};

// This may need to change, but basically compose works by combining wrapper functions into one
export default compose(withApollo, withRedux)(IndexPage);



const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: 'black',
    padding: '25px',
    margin: "0 15%",
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
  button: {
    backgroundColor: "purple",
    '&:hover': {
      color: "white",
      backgroundColor: "blue"
    }
  },
  cardsWrapper: {
    marginTop: "100px"
  },
  cardsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "10px",
  },
  card: {
    border: "1px solid #3a506b",
    color: "white",
    backgroundColor: "#1a535c",
    borderRadius: "10px",
    // marginRight: "60px",
    height: "200px",

  },
  upperSplit: {
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
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
