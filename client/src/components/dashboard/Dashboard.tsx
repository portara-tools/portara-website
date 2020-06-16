import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useQuery } from '@apollo/react-hooks';
import {
  createMuiTheme,
  createStyles,
  ThemeProvider,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Navigator from './Navigator';
import Header from './Header';
import RateLimitAdjuster from './RateLimitAdjuster';
import { FIND_DASHBOARD } from '../../utils/queries';

export interface PaperbaseProps extends WithStyles<typeof styles> {}

const githubID = Cookies.get('GitHubID');

function Paperbase(props: PaperbaseProps) {
  const { classes } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [token, setToken] = React.useState('TOKEN');
  const [avatarURL, setAvatarURL] = React.useState('AVATAR');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { loading, data } = useQuery(FIND_DASHBOARD, {
    variables: { github_ID: githubID },
  });

  useEffect(() => {
    if (data) setToken(data.findDashboard.token);
    if (data) setAvatarURL(data.findDashboard.avatarURL);
  }, data);

  if (loading) return <div>Loading...</div>;

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Hidden smUp implementation='js'>
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant='temporary'
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          </Hidden>
          <Hidden xsDown implementation='css'>
            <Navigator PaperProps={{ style: { width: drawerWidth } }} />
          </Hidden>
        </nav>
        <div className={classes.app}>
          <Header onDrawerToggle={handleDrawerToggle} token={token} avatarURL={avatarURL} />

          <main className={classes.main}>
            <div>
              <RateLimitAdjuster token={token} />
            </div>
          </main>
          <footer className={classes.footer}>
            <Typography variant='body2' align='center'>
              {'Copyright © '}
              <Link color='inherit' href='https://github.com/oslabs-beta/portara'>
                Portara
              </Link>{' '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

let theme = createMuiTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#000',
      },
    },
    MuiButton: {
      label: {
        textTransform: 'none',
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: 'none',
        margin: '0 16px',
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up('md')]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#404854',
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        marginRight: 0,
        '& svg': {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
};

const drawerWidth = 256;

const styles = createStyles({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: '#212121',
    borderLeft: '.5px solid rgba(250,250,250,0.4)',
    borderTop: '.5px solid rgba(250,250,250,0.4)',
  },
  footer: {
    padding: theme.spacing(2),
    background: '#212121',
    borderLeft: '.5px solid rgba(250,250,250,0.4)',
    color: '#fff',
  },
});

export default withStyles(styles)(Paperbase);
