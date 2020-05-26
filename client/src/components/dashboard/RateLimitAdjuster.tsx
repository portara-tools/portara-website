import React, {useState} from 'react';
import gql from 'graphql-tag'
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
import RefreshIcon from '@material-ui/icons/Refresh';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { UPDATE_SETTING, READ_DATABASE } from '../../utils/queries'


// interface Props {
//   name: string
//   limit: string
//   per: string
//   throttle: string
// };
let setted = false
const RateLimitAdjuster: React.FunctionComponent = () => {
  const classes = useStyles();
  const [state, setState]:any = useState([])
  
  const { loading, data, refetch } = useQuery(READ_DATABASE, {
    variables: { userID: "5ec9aa3a9057a222f161be33" }, // this needs to change to variable
  });







  const handleDuration = (e: any, name: any, index: any, settingType: any, newValue?: any) => {  
    let value = e.target.value;
    if (newValue) {
      value = newValue;
    }
    const copyOfSetting = {...state[index]}
    copyOfSetting[settingType] = value.toString();
    const copyOfState = [...state];
    copyOfState[index] = copyOfSetting;
    setState(copyOfState);
  };


  if (!loading && data) {
    console.log('DATA FROM QUERY', data)    
    if (!setted){
      setState(data.findUser)
      setted = true
    }
    console.log('CURRENT STATE', state)
    return (
      <div>
        {data.findUser.map((setting: any, index:any) => {
              return (
        <Paper key={index} className={classes.paper}>
          <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
            <Toolbar>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                <Typography color="textPrimary">
                  <h4 className={index}>{setting.name}</h4>
                </Typography>
                </Grid>
                <Grid item>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes.update}
                    onClick={(e) => {
                      e.preventDefault()
                      // setState({ ...state, name: props.name })
                      // triggerMutation()
                      refetch()
                    }}
                  >
                    Update
                  </Button>
                  <Tooltip title="Reset">
                    <IconButton>
                      <RefreshIcon className={classes.block} color="inherit" />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        <div className={classes.contentWrapper}>
          <div className={classes.outerRoot}>
            <div className={classes.margin} />
            <div key={index}>
              <div>
                <Typography color="textSecondary" align="center">
                Current Rate Limit: {setting.limit}
                </Typography>
                <div className={classes.innerRoot}>
                  <div className={classes.margin} />
                  <DemoSlider 
                  name="limit" 
                  valueLabelDisplay="auto" 
                  defaultValue={Number(setting.limit)} 
                  onChange={(e, newValue) => {
                    handleDuration(e, setting.name, index, "limit", newValue)
                  }}
                  />
                  <label>Duration</label>
                    <TextField
                      name="per"
                      placeholder={setting.per}
                      InputProps={{
                        className: classes.searchInput,
                      }}
                      onChange={(e) => {
                        handleDuration(e, setting.name, index, "per")
                      }}
                    />
                </div>
              </div>
              <div className={classes.contentWrapper}>
                <div className={classes.innerRoot}>
                <div className={classes.margin} />
                <Typography>Throttle: </Typography>
                  <TextField
                    name="throttle"
                    placeholder={setting.throttle}
                    InputProps={{
                      className: classes.searchInput,
                    }}
                    onChange={(e) => {
                      handleDuration(e, setting.name, index, "throttle")
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
  } else {
    return (
      <>
        <CircularProgress disableShrink />
      </>
    )
  }
}

export default RateLimitAdjuster;



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
    },
    margin: {
      height: theme.spacing(3),
    },
    searchInput: {
      fontSize: theme.typography.fontSize,
      margin: '1rem',
      maxWidth: 140!,
    },
    paper: {
      maxWidth: 936,
      overflow: 'hidden',
      margin: '2rem auto',
    },
    searchBar: {
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    block: {
      display: 'block',
    },
    update: {
      marginRight: theme.spacing(1),
    },
  }),
);

const DemoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
    margin: '1rem',
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
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



  // const [triggerMutation, { data: newData }] = useMutation(UPDATE_SETTING, {
  //   variables: {
  //     userID: "5ec9aa3a9057a222f161be33",
  //     name: state.name.toString(), 
  //     limit: state.limit.toString(),
  //     per: state.per.toString(), 
  //     throttle: state.throttle.toString(), 
  //   }
  // })