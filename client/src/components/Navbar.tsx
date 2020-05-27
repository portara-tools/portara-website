import * as React from 'react';
import { AppBar, Link as LinkM, Button, Box } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const oauthLogin_Github = 'http://localhost:4000/githublogin'

const Navbar: React.FunctionComponent = (props) => {
  const classes = useStyles(props);
  const uuid = Cookies.get('GitHubID');
  console.log('GITHUB INFO HERE: ===========',uuid)

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
              <Link to="/about" className={classes.linkStyle}>
                ABOUT
              </Link>
            </Button>
            { uuid ?
              <Button >
                <Link to="/account" className={classes.linkStyle}>
                  ACCOUNT
                </Link>
              </Button>
              : <div />
            }
          </ul>
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
                SIGN IN WITH
                <GitHubIcon style={{ fontSize: 'large', marginLeft: '8px' }}></GitHubIcon>
              </Button>
            </LinkM>
          </ul>
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
