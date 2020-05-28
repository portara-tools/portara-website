import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';
const username = Cookies.get('Username');


interface HeaderProps extends WithStyles<typeof styles> {
  onDrawerToggle: () => void
  token: string
  avatarURL: string
}

function Header(props: HeaderProps) {
  const { classes, onDrawerToggle, token, avatarURL } = props;


  return (
    <React.Fragment>
      <AppBar className={classes.appbar} position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs />
            <Grid item>
              <Typography color="inherit" variant="subtitle1">
                Welcome {username}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton color="inherit" className={classes.iconButtonAvatar}>
                <Avatar src={props.avatarURL} alt="My Avatar" />
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
                Portara Unique Token: {props.token}
              </Typography>
              <Typography color="inherit" variant="body1" component="h1">
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
          {/* <Tab textColor="inherit" label="Users" />
          <Tab textColor="inherit" label="Sign-in method" />
          <Tab textColor="inherit" label="Templates" />
          <Tab textColor="inherit" label="Usage" /> */}
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
    }
  });


export default withStyles(styles)(Header);


