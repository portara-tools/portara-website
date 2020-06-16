import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import About from './About';
import { Button, Typography, Grid, Link as LinkM, Box, Zoom } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Dashboard from './dashboard/Dashboard';
import BackupIcon from '@material-ui/icons/Backup';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Title from './Title';
import Cookies from 'js-cookie';
import AnimatedCard from './AnimatedCard';
const gitHubID = Cookies.get('GitHubID');

const LandingPage = () => {
  const classes = useStyles();
  const small = useMediaQuery('(max-width:800px)');
  if (gitHubID) {
    return (
      <>
        <Dashboard />
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        <Box maxWidth='sm' className={classes.container}>
          <Grid className={classes.content}>
            <Title>Portara</Title>
            <hr style={{ width: '100%', marginBottom: '30px' }} />
            <Typography variant='h5' color='primary' style={{ marginBottom: '1rem', textAlign: "center" }}>
              GraphQL • Rate Limiter • Throttler
            </Typography>
            {!small && (
              <Grid className={classes.imageWrapper}>
                <AnimatedCard>
                  <img src='/code-editor-svg.svg' style={{ height: '400px' }} />
                </AnimatedCard>
              </Grid>
            )}
            <Button className={classes.downloadButton} variant='outlined'>
              <LinkM target='_blank' href='https://www.npmjs.com/package/portara' underline='none'>
                <Typography color='primary'>Download Beta (v1.0.8)</Typography>
              </LinkM>
            </Button>
          </Grid>
          {/* CARDS */}
          <Grid container>
            <Grid sm={12} container item className={classes.cardsWrapper}>
              <Zoom in style={{ transitionDelay: '500ms' }}>
                <Grid item sm={4} className={classes.card}>
                  <Box style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center' }}>
                    <BackupIcon
                      fontSize='large'
                      style={{ marginTop: '3px', marginRight: '10px' }}
                    />
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
                <Grid item sm={4} className={classes.card}>
                  <Box style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center' }}>
                    <EmojiEmotionsIcon
                      fontSize='large'
                      style={{ marginTop: '3px', marginRight: '10px' }}
                    />
                    <Typography className={classes.textLine}>Easy to use</Typography>
                  </Box>
                  <hr></hr>
                  <Typography className={classes.textLine} gutterBottom>
                    Thanks to schema directives, Portara gives you a lot of flexibility. It can be
                    as easy as applying a limiter to a single field, or to a combination of fields
                    and objects
                  </Typography>
                </Grid>
              </Zoom>
            </Grid>
          </Grid>
          <Grid sm={12} container item className={classes.cardsWrapper}>
            <Zoom in style={{ transitionDelay: '1100ms' }}>
              <Grid item sm={4} className={classes.card}>
                <Box style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center' }}>
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
              <Grid item sm={4} className={classes.card}>
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
        <br id='about' />
        <About />
        <Footer />
      </>
    );
  }
};

export default LandingPage;

// ------- STYLING FOR THIS PAGE -----
const useStyles = makeStyles(() => ({
  container: {
    background: `url("https://images.unsplash.com/photo-1486783046960-64d2ef697c46?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEysmd9&auto=format&fit=crop&w=1650&q=80")`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    maxWidth: '1800px',
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
    backgroundColor: 'dodgerblue',
  },
  cardsWrapper: {
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  imageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
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
    minHeight: '150px',
  },
  cardHeader: {
    textAlign: 'center',
  },
}));
