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
    <div style={{ background: '#212121', padding: '2rem'}}>
      {/* <hr style={{ width: '80%', marginBottom: '30px', opacity: '.2' }}></hr> */}
      <Box maxWidth='sm' className={classes.container}>
        <Typography variant="h4" align="center">The Team</Typography>
        <Grid container spacing={6} className={classes.peopleContainer}>
          <Grid item xs={6} className={classes.personCard}>
            <img alt='Peve' src={'/a.png'} className={classes.headshot}/>
            <Box className={classes.infoBox}>
              <Typography variant='h5'>Peve</Typography>
              <Typography variant='body1'>Swedish Fuck Boi</Typography>
              <div className={classes.socialLinks}>
                <Link href="https://github.com/oslabs-beta/portara">
                  <GitHubIcon className={classes.socialLink} />
                </Link>
                <Link href="https://www.linkedin.com/company/teamportara">
                  <LinkedInIcon className={classes.socialLink} />
                </Link>
                <Link href="https://twitter.com/portaraQL">
                  <TwitterIcon className={classes.socialLink} />
                </Link>
              </div>
            </Box>
          </Grid>
          <Grid item xs={6} className={classes.personCard}>
            <img alt='Podd' src={'/b.png'} className={classes.headshot}/>
            <Box className={classes.infoBox}>
              <Typography variant='h5'>Podd</Typography>
              <Typography variant='body1'>Man of the Mountains</Typography>
              <div className={classes.socialLinks}>
                <Link href="https://github.com/oslabs-beta/portara">
                  <GitHubIcon className={classes.socialLink} />
                </Link>
                <Link href="https://www.linkedin.com/company/teamportara">
                  <LinkedInIcon className={classes.socialLink} />
                </Link>
                <Link href="https://twitter.com/portaraQL">
                  <TwitterIcon className={classes.socialLink} />
                </Link>
              </div>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={6} className={classes.peopleContainer}>
          <Grid item xs={6} className={classes.personCard}>
            <img alt='Pary' src={'/c.png'} className={classes.headshot}  />
            <Box className={classes.infoBox}>
              <Typography variant='h5'>Pary</Typography>
              <Typography variant='body1'>Pizza Hut Aficionado.</Typography>
              <div className={classes.socialLinks}>
                <Link href="https://github.com/oslabs-beta/portara">
                  <GitHubIcon className={classes.socialLink} />
                </Link>
                <Link href="https://www.linkedin.com/company/teamportara">
                  <LinkedInIcon className={classes.socialLink} />
                </Link>
                <Link href="https://twitter.com/portaraQL">
                  <TwitterIcon className={classes.socialLink} />
                </Link>
              </div>
            </Box>
          </Grid>
          <Grid item xs={6} className={classes.personCard}>
            <img alt='Palex' src={'/d.png'} className={classes.headshot}/>
            <Box className={classes.infoBox}>
              <Typography variant='h5'>Palex</Typography>
              <Typography variant='body1'>50% of LinkedIn Traffic</Typography>
              <div className={classes.socialLinks}>
                <Link href="https://github.com/oslabs-beta/portara">
                  <GitHubIcon className={classes.socialLink} />
                </Link>
                <Link href="https://www.linkedin.com/company/teamportara">
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
  },
  headshot: {
    width: '85%',
    borderRadius: '100%',
    margin: '10px',
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