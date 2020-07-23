import * as React from 'react';
import { AppBar, Link as LinkM, Button, Box } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import { makeStyles } from '@material-ui/core/styles';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

let oauthLogin_Github = 'https://www.portara.io/githublogin'
if (process.env.NODE_ENV === 'development') {
  oauthLogin_Github = 'http://localhost:4000/githublogin'
}

const Navbar: React.FunctionComponent = (props) => {
  const classes = useStyles(props);
  const uuid = Cookies.get('GitHubID');
  const username = Cookies.get('Username');

  return (
    <>
      <Box className={classes.container}>
        <AppBar position='static' className={classes.appBar}>
          <ul className={classes.linksUL}>
            <Button >
              <Link to="/" className={classes.linkStyle}>
                HOME
              </Link>
            </Button>
            <Button >
              <HashLink to="/#about" className={classes.linkStyle}>
                TEAM
              </HashLink>
            </Button>            
          </ul>
          {!uuid ?
            <ul className={classes.loginButton}>
              <LinkM
                href={oauthLogin_Github}
                variant='overline'
                underline='none'
              >
                <Button
                  variant='outlined'
                  size='small'
                >
                  SIGN IN
                <GitHubIcon style={{ fontSize: 'large', marginLeft: '8px' }}></GitHubIcon>
                </Button>
              </LinkM>
            </ul>
            : <div id={'welcome'}>
              `Welcome, ${username}`
            </div>
          }
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;

const useStyles = makeStyles(() => ({
  appBar: {
    flexDirection: 'row',
    backgroundColor: 'black',
    justifyContent: 'space-between',
  },
  container: {
    backgroundColor: 'black',
    padding: '25px',

    margin: '0 10%',
  },
  linksUL: {
    display: 'flex',
    padding: 0,
  },
  linkStyle: {
    textDecoration: 'none',
    color: 'white',
    hoverOpacity: "0.8",
    padding: '5px',
  },
  loginButton: {
    display: 'flex',
    alignItems: 'center',
    margin: '0px',
    padding: '0px',
    '&:hover': {
      color: '#7209b7',
      backgroundColor: 'black',
    },
  },
}));
