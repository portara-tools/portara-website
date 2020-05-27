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
      color: '#fff',
      border: '1px solid rgba(255, 255, 255, 0.8)',
      paddingLeft: '6px',
      borderRadius: '2px',
    }, 
    paper: {
      maxWidth: 936,
      overflow: 'hidden',
      margin: '2rem auto',
      background: 'transparent',
      border: '1px solid rgba(255, 255, 255, 0.8)',
    }, 
    searchBar: {
      borderBottom: '1px solid rgba(255, 255, 255, 0.8)',
      background: 'transparent',
      '&::placeholder': {
        color: 'red',
        opacity: '1',
      },
    },
    block: {
      display: 'block',
    }, 
    update: {
      marginRight: theme.spacing(1),
      background: 'transparent',
      border: '1px solid rgba(255, 255, 255, 0.8)',
    },
    text: {
      color: '#fff'
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

const UPDATE_SETTING = gql`
  mutation ($userID: String!, $name: String!, $limit: ID!, $per: ID!, $throttle: ID!){
    changeSetting(userID: $userID, name: $name, limit: $limit, per: $per, throttle: $throttle) {
      name
      limit
      per
      throttle
    }
  }
`

const READ_DATABASE = gql`
  query findUser($userID: String!){
    findUser(userID: $userID) {
      name
      limit
      per
      throttle
    }
  }
`

interface Props {
  name: string
  limit: string
  per: string
  throttle: string
};

const RateLimitAdjuster: React.FunctionComponent = () => {
  const classes = useStyles();
  const [state, setState] = useState({ 
    name: '',
    limit: '',
    per: '',
    throttle: '',
  });

  const [triggerMutation, { data: newData }] = useMutation(UPDATE_SETTING, {
    variables: {
      userID: "5ec9aa3a9057a222f161be33",
      name: 'hello', 
      limit: state.limit.toString(), 
      per: state.per.toString(), 
      throttle: state.throttle.toString(), 
    }
  })

  const { loading, data } = useQuery(READ_DATABASE, {
    variables: { userID: "5ec9aa3a9057a222f161be33" },
  });

  const updateField = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };
  if (!loading && data) {
    return (
      <div>
        {data.findUser.map((props:Props, index:any) => {
              return (
        <Paper className={classes.paper}>
          <AppBar className={classes.searchBar} color="default" position="static" elevation={0}>
            <Toolbar>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                <Typography className={classes.text}>
                  <h4>{props.name}</h4>
                </Typography>
                </Grid>
                <Grid item>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes.update}
                    onClick={(e) => {
                      e.preventDefault()
                      triggerMutation()
                    }}
                  >
                    Update
                  </Button>
                  {/* <Tooltip title="Reset">
                    <IconButton>
                      <RefreshIcon className={classes.block} color="inherit" />
                    </IconButton>
                  </Tooltip> */}
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        <div className={classes.contentWrapper}>
          <div className={classes.outerRoot}>
            <div className={classes.margin} />
            <div key={index}>
              <div>
                <Typography className={classes.text} align="center">
                Rate Limit: {props.limit}
                </Typography>
                <div className={classes.innerRoot}>
                  <div className={classes.margin} />
                  <DemoSlider name="limit" valueLabelDisplay="auto" defaultValue={Number(props.limit)} onChange={updateField} />
                  <label className={classes.text} >per</label>
                    <TextField
                      name="per"
                      placeholder={props.per}
                      InputProps={{
                        className: classes.searchInput,
                      }}
                      onChange={updateField}
                    />
                </div>
              </div>
              <div className={classes.contentWrapper}>
                <div className={classes.innerRoot}>
                <div className={classes.margin} />
                <Typography className={classes.text}>Throttle: </Typography>
                  <TextField
                    name="throttle"
                    placeholder={props.throttle}
                    InputProps={{
                      className: classes.searchInput,
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
