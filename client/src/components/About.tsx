import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';

const About: React.FunctionComponent = (props) => {
  const classes = useStyles(props);
  return (
    <div style={{ background: '#212121' }}>      
      <Box maxWidth='sm' className={classes.container}>
        <Typography variant="h4" align="center">The Team</Typography>
        <Grid container spacing={6} className={classes.peopleContainer}>
          <Grid item xs={6} className={classes.personCard}>
            <img alt='Steve Frend' src={'/b.jpg'} className={classes.headshot} />
            <Box className={classes.infoBox}>
              <Typography variant='h6'>Steve Frend</Typography>
              <Typography variant='body1'>Software Engineer</Typography>
              <div className={classes.socialLinks}>
                <Link href="https://github.com/stevefrend">
                  <GitHubIcon className={classes.socialLink} />
                </Link>
                <Link href="https://www.linkedin.com/in/steve-christersson-frend-697a8588/?challengeId=AQFt2bFbYRc1VgAAAXJYOO69aCyo9V4gGpvY90j6pa-bGoczsjqtYz75k-lCMGimMDcUSicooFNXhEg4TM8KYHsCssbxnhSGHA&submissionId=92b607a4-aa02-1316-d08f-e00aaa96e902">
                  <LinkedInIcon className={classes.socialLink} />
                </Link>
              </div>
            </Box>
          </Grid>
          <Grid item xs={6} className={classes.personCard}>
            <img alt='Todd Alexander' src={'/c.jpg'} className={classes.headshot} />
            <Box className={classes.infoBox}>
              <Typography variant='h6'>Todd Alexander</Typography>
              <Typography variant='body1'>Software Engineer</Typography>
              <div className={classes.socialLinks}>
                <Link href="https://github.com/toddalex">
                  <GitHubIcon className={classes.socialLink} />
                </Link>
                <Link href="http://www.linkedin.com/in/toddmalexander">
                  <LinkedInIcon className={classes.socialLink} />
                </Link>
                <Link href="https://twitter.com/toddpants">
                  <TwitterIcon className={classes.socialLink} />
                </Link>
              </div>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={6} className={classes.peopleContainer}>
          <Grid item xs={6} className={classes.personCard}>
            <img alt='Cary Chan' src={'/d.jpg'} className={classes.headshot} />
            <Box className={classes.infoBox}>
              <Typography variant='h6'>Cary Chan</Typography>
              <Typography variant='body1'>Software Engineer</Typography>
              <div className={classes.socialLinks}>
                <Link href="https://github.com/caryLchan">
                  <GitHubIcon className={classes.socialLink} />
                </Link>
                <Link href="https://www.linkedin.com/in/cary-chan-2b7933b/">
                  <LinkedInIcon className={classes.socialLink} />
                </Link>
              </div>
            </Box>
          </Grid>
          <Grid item xs={6} className={classes.personCard}>
            <img alt='Alexander Infante' src={'/a.jpg'} className={classes.headshot} />
            <Box className={classes.infoBox}>
              <Typography variant='h6'>Alex Infante</Typography>
              <Typography variant='body1'>Software Engineer</Typography>
              <div className={classes.socialLinks}>
                <Link href="https://github.com/Alexander-Infante">
                  <GitHubIcon className={classes.socialLink} />
                </Link>
                <Link href="https://www.linkedin.com/in/alexanderinfante/">
                  <LinkedInIcon className={classes.socialLink} />
                </Link>
                <Link href="https://twitter.com/portaraQL">
                  <TwitterIcon className={classes.socialLink} />
                </Link>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};


const useStyles = makeStyles(() => ({
  container: {
    backgroundSize: 'contain',
    padding: '25px',
    margin: '0 10%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  peopleContainer: {
    padding: '1rem',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  personCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '10px',
    maxWidth: '300px',
    minWidth: '200px',
  },
  headshot: {
    borderRadius: '50%',
    margin: '10px',
    width: '85%',
  },
  infoBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  socialLinks: {
    display: 'flex',
  },
  socialLink: {
    margin: '4px',
    '&:hover': {
      opacity: '.4',
      position: 'relative',
      bottom: '1px',
    },
  },
}));

export default About;