import * as React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Link from '@material-ui/core/Link';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';


const Footer: React.FunctionComponent = () => {
  const classes = useStyles();

  return(
    <footer className={classes.footer}>
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
          <Typography variant="subtitle1" align="center">
            Stay up to date with Portara
          </Typography>
          <hr style={{ width: '60%', margin: '50px', opacity: '.2' }}></hr>
        <div className={classes.footerLinks}>
          <Typography variant="body2">
            {'© '}
            {new Date().getFullYear()}{' '}
            <Link color="inherit" href="https://github.com/oslabs-beta/portara">
              Portara.
            </Link>
          </Typography>
          <Typography variant="body2">
            <Link color="inherit" href="https://github.com/oslabs-beta/portara">
              {'Read Me & License'}
            </Link>
          </Typography>
        </div>
      </footer>
  )
}

export default Footer;

const useStyles = makeStyles(() => ({
  footer: {
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '4rem 10%',
    height: '5rem',
  },
  socialLinks: {
    display: 'flex',
  },
  socialLink: {
    margin: '.5rem',
    '&:hover': {
      opacity: '.4',
      position: 'relative',
      bottom: '1px',
    },
  },
  footerLinks: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    margin: '2rem 2rem',
    
  }
}))