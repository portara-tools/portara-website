import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks'
import { withStyles, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { UPDATE_SETTING, READ_DATABASE } from '../../utils/queries'
import Cookies from 'js-cookie';
const gitHubID = Cookies.get('GitHubID');


interface Props {
  token: string
};

let setted = false
const RateLimitAdjuster: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [state, setState]: any = useState([])
  const { loading, data, refetch } = useQuery(READ_DATABASE, {
    variables: { userID: gitHubID },

  });
  const [triggerMutation] = useMutation(UPDATE_SETTING)
  console.log('token', props.token, 'state', state)
  const handleDuration = (e: any, index: any, settingType: any, newValue?: any) => {
    let value = e.target.value;
    if (newValue) {
      value = newValue;
    }
    const copyOfSetting = { ...state[index] }
    copyOfSetting[settingType] = value.toString();
    const copyOfState = [...state];
    copyOfState[index] = copyOfSetting;
    setState(copyOfState);
  };
  if (!loading && data) {
    if (data.findUser.length) {
      if (!setted) {
        setState(data.findUser)
        setted = true
      }
      return (
        <div>
          {data.findUser.map((setting: any, index: any) => {
            return (
              <Paper key={index} className={classes.paper}>
                <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                  <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs>
                        <Typography className={classes.text}>
                          <h3 className={index}>{setting.name}</h3>
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.update}
                          onClick={(e) => {
                            e.preventDefault()
                            triggerMutation({
                              variables: {
                                userID: props.token,
                                name: state[index].name,
                                limit: state[index].limit,
                                per: state[index].per,
                                throttle: state[index].throttle,
                              }
                            })
                            refetch()
                          }}
                        >
                          Update
                    </Button>

                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
          <div className={classes.contentWrapper}>
            <div className={classes.outerRoot}>
              <div className={classes.margin} />
                <div key={index}>
                  <div> 
                    <Typography align="center" variant="h6">
                    Current Rate Limit: {setting.limit}
                    </Typography>
                    <div className={classes.innerRoot}>
                      <div className={classes.margin} />
                      <DemoSlider 
                      name="limit" 
                      valueLabelDisplay="auto" 
                      defaultValue={Number(setting.limit)} 
                      onChange={(e, newValue) => {
                        handleDuration(e, index, "limit", newValue)
                      }}
                      />
                    </div> 
                  </div>
                  <div className={classes.contentWrapper}>
                    <div className={classes.innerRoot}>
                    <div className={classes.margin} />
                      <Typography variant="body1">Duration:</Typography>
                        <TextField
                          name="per"
                          placeholder={setting.per}
                          InputProps={{
                            className: classes.searchInput,
                          }}
                          onChange={(e) => {
                            handleDuration(e, index, "per")
                          }}
                        />
                    </div>
                    <div className={classes.innerRoot}>
                      <Typography variant="body1">Throttle: </Typography>
                        <TextField
                          name="throttle"
                          placeholder={setting.throttle}
                          InputProps={{
                            className: classes.searchInput,
                          }}
                          onChange={(e) => {
                            handleDuration(e, index, "throttle")
                          }}
                        />
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
            )
          })}
        </div>
      );
    } else if (!loading && data.findUser.length === 0) {
      return(
        <Paper className={classes.paper}>
          <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
            <Toolbar>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                  <Typography variant="h6" color="secondary" style={{padding: "5px"}}>
                    You currently have no active rate limiters. Please add the token to your Portara rate limiter. Your token is: {props.token}
                  </Typography>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </Paper>
      )
    }
  }
  return (
    <>
      <CircularProgress disableShrink />
    </>
  )
}


// ---------- STYLING -------------------------
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    outerRoot: {
      width: '100%',
    },
    innerRoot: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
    },
    contentWrapper: {
      margin: '20px 16px',
      display: 'flex',
      justifyContent: 'space-evenly',

    },
    margin: {
      height: theme.spacing(3),
    },
    searchInput: {
      fontSize: '1.2rem',
      margin: '1rem',
      maxWidth: 140!,
      color: '#212121',
      paddingLeft: '6px',
      borderRadius: '2px',
      textAlign: 'right',
      float: 'right',
      '::placeholder': {
        color: '#000',
        opacity: '1',
      },
    },
    paper: {
      maxWidth: 936,
      overflow: 'hidden',
      margin: '2rem auto',
      background: '#f5f5f5',
      border: '8px solid rgba(0, 0, 0, .8)',
    }, 
    searchBar: {
      background: '#000',
    },
    block: {
      display: 'block',
    },
    update: {
      marginRight: theme.spacing(1),
      background: 'transparent',
      border: '1px solid rgba(245, 245, 245, 0.8)',
    },
    text: {
      color: '#f5f5f5'
    }
  }),
);

const DemoSlider = withStyles({
  root: {
    color: '#009be5',
    height: 8,
    margin: '1rem',
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#f5f5f5',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -10,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export default RateLimitAdjuster;