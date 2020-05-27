import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import About from './About';
import { Button, Typography, Grid, Link as LinkM, Box, Zoom } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AnimatedCard from './AnimatedCard';
import BackupIcon from '@material-ui/icons/Backup';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BlockRounded from '@material-ui/icons/BlockRounded';
import AlternateEmail from '@material-ui/icons/AlternateEmail';
import DoneAll from '@material-ui/icons/DoneAll';
import Title from './Title' 


const LandingPage = () => {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Box maxWidth='sm' className={classes.container}>
        <Grid className={classes.content}>
          <Title>Portara</Title>
          {/* <img src={'https://imgur.com/U0PyleJ.png'} alt='wtf' /> */}
          <hr style={{ width: '100%', marginBottom: '30px' }} />
          <Typography variant='h5' color="primary" style={{ marginBottom: '8rem' }}>
            The best rate limiter that exists
          </Typography>
          {/* IMAGE WITH BULLETS */}
          <Grid className={classes.imageWrapper}>
            <Box className={classes.imageContainer}>
              {/* <AnimatedCard>
                <img src={'/portaraScreenshot2.png'} height='400px' />
              </AnimatedCard> */}
              <Grid className={classes.textWrapper}>
                <Typography className={classes.textLine}>
                  <AlternateEmail style={{ marginRight: '5px' }} />
                  Easy to use: decorate at will
                </Typography>
                <Typography className={classes.textLine}>
                  <BlockRounded style={{ marginRight: '5px' }} />
                  Blocks or slows requests
                </Typography>
                <Typography className={classes.textLine}>
                  <DoneAll style={{  marginRight: '5px' }} />
                  Tested & Typescripted
                </Typography>
              </Grid>
            </Box>
          </Grid>
          <Button className={classes.downloadButton} variant='outlined'>
              <LinkM target='_blank' href='https://www.npmjs.com/package/portara' underline='none'>
                <Typography color='primary'>Download on NPM</Typography>
              </LinkM>
            </Button>
        </Grid>
        {/* CARDS */}
        <Grid container spacing={10}>
          <Grid xs={12} container item className={classes.cardsWrapper} spacing={5}>
            <Zoom in style={{ transitionDelay: '500ms' }}>
              <Grid item xs={4} className={classes.card}>
                <Box style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center' }}>
                  <BackupIcon fontSize='large' style={{ marginTop: '3px', marginRight: '10px' }} />
                  <Typography className={classes.textLine}>No re-deploying</Typography>
                </Box>
                <hr></hr> 
                <Typography className={classes.textLine} gutterBottom>
                  The ability to alter rate limiter settings through a user account eliminates the
                  need to re-deploy your application
                </Typography>
              </Grid>
            </Zoom>
            <Zoom in style={{ transitionDelay: '800ms' }}>
              <Grid item xs={4} className={classes.card}>
                <Box style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center' }}>
                  <EmojiEmotionsIcon
                    fontSize='large'
                    style={{ marginTop: '3px', marginRight: '10px' }}
                  />
                  <Typography className={classes.textLine}>Easy to use</Typography>
                </Box>
                <hr></hr>
                <Typography className={classes.textLine} gutterBottom>
                  Thanks to schema directives, Portara gives you a lot of flexibility. It can be as
                  easy as applying a limiter to a single field, or to a combination of fields and
                  objects
                </Typography>
              </Grid>
            </Zoom>
          </Grid>
        </Grid>
        <Grid xs={12} container item className={classes.cardsWrapper} spacing={5}>
          <Zoom in style={{ transitionDelay: '1100ms' }}>
            <Grid item xs={4} className={classes.card}>
              <Box style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center'  }}>
                <AttachMoneyIcon
                  fontSize='large'
                  style={{ marginTop: '3px', marginRight: '10px' }}
                />
                <Typography className={classes.textLine}>Save money</Typography>
              </Box>
              <hr></hr>
              <Typography className={classes.textLine} gutterBottom>
                Prevent malicious entities from causing server overload or rate spikes in services
                like AWS
              </Typography>
            </Grid>
          </Zoom>
          <Zoom in style={{ transitionDelay: '1300ms' }}>
              <Grid item xs={4} className={classes.card}>
                <Box style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center' }}>
                  <DoneOutlineIcon
                    fontSize='large'
                    style={{ marginTop: '3px', marginRight: '10px' }}
                  />
                  <Typography className={classes.textLine}>Safe</Typography>
                </Box>
                <hr></hr>
                <Typography className={classes.textLine} gutterBottom>
                  Built with TypeScript and thoroughly tested to ensure stability
                </Typography>
              </Grid>
            </Zoom>
        </Grid>
      </Box>
      <br /> 
      {/* <Box maxWidth='sm' className={classes.gradientContainer}></Box> */}
      <About />
      <Footer />
    </>  
  ); 
};

export default LandingPage;

// ------- STYLING FOR THIS PAGE -----
const useStyles = makeStyles(() => ({
  container: {
    background: `url("https://images.unsplash.com/photo-1486783046960-64d2ef697c46?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80")`,
    backgroundSize: 'contain',
    // padding: '25px',
    margin: '0 10.5% 5rem',
    backgroundRepeat: 'no-repeat',
  }, 
  gradientContainer: {
    // background: 'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(0,0,0,1) 100%)',
    padding: '25px',
    margin: '0px',
    marginRight: '0px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '6rem',
  }, 
  downloadButton: {
    marginTop: '5rem',
    background: 'rgba(33, 33, 33, .8)',
    padding: '8px 16px',
  },
  cardsWrapper: {
    marginTop: '2rem',
    spacing: '8',
    display: 'flex',
    justifyContent: 'space-evenly',
  }, 
  imageWrapper: {
    marginTop: '6%',
    padding: '1rem',
    spacing: '8',
    display: 'flex',
    justifyContent: "center",
    background: 'rgba(0, 0, 0, .5)',
    width: '100%'
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textLine: {
    fontSize: 'large',
    display: 'flex',
    alignItems: 'center',
  },
  cardsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginTop: '10px',
  },
  card: {
    // color: 'white',
    minHeight: '150px',
    minWidth: '250px',
  }, 
  cardHeader: {
    textAlign: 'center',
  },
  upperSplit: {
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '30px',
    padding: '10px',
    width: '100%',
    height: '60%',
    background:
      'linear-gradient(197deg, rgba(114,111,156,1) 0%, rgba(58,80,107,1) 65%, rgba(58,80,107,1) 100%)',
  },
}));
