import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';
const username = Cookies.get('Username');


interface HeaderProps extends WithStyles<typeof styles> {
  onDrawerToggle: () => void
  token: string
  avatarURL: string
}

const logout = () => {
  Cookies.remove('GitHubID', { path: 'https:portara.io' });
  Cookies.remove('Username', { path: 'https:portara.io' });
  Cookies.remove('AvatarURL', { path: 'https:portara.io' });
  window.location.reload();
}

function Header(props: HeaderProps) {
  const { classes } = props;


  return (
    <React.Fragment>
      <AppBar className={classes.appbar} position="absolute" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs />
            <Grid item>
              <Typography color="inherit" variant="subtitle1">
                Welcome, {username}!
              </Typography>
            </Grid>
            <Grid item>
              <IconButton
                color="inherit"
                className={classes.iconButtonAvatar}
                onClick={(e) => {
                  e.preventDefault()
                  logout()
                }}
              >
                <Tooltip title="Click image to logout">
                  <Avatar src={props.avatarURL} alt="My Avatar" className={classes.avatar} />
                </Tooltip>
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        position="static"
        elevation={0}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                {username}'s Unique Portara Token:
              </Typography>
              <Typography style={{ color: "#009be5" }} variant="body1" component="h1">
                {props.token}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Tabs value={0} textColor="inherit">
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = (theme: Theme) =>
  createStyles({
    secondaryBar: {
      zIndex: 0,
      background: '000',
      borderLeft: '.5px solid rgba(250,250,250,0.6)',
    },
    menuButton: {
      marginLeft: -theme.spacing(1),
    },
    iconButtonAvatar: {
      padding: 4,
    },
    avatar: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
    link: {
      textDecoration: 'none',
      color: lightColor,
      '&:hover': {
        color: theme.palette.common.white,
      },
    },
    button: {
      borderColor: lightColor,
    },
    appbar: {
      background: '000',
      borderLeft: '.5px solid rgba(250,250,250,0.6)',
    },
    tokenDisplay: {
      color: '#4fc3f7'
    }
  });

export default withStyles(styles)(Header);
