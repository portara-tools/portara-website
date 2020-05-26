import React, {useState} from 'react';
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { withStyles, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
    },
    contentWrapper: {
      margin: '40px 16px',
    },
    margin: {
      height: theme.spacing(3),
    },
    formControl: {
      minWidth: 80,
    },
    searchInput: {
      fontSize: theme.typography.fontSize,
      margin: '1rem',
      maxWidth: 140!,
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
      portara {
        name
        limit
        per
        throttle
      }
    }
  }
`

interface Props {
//   children: React.ReactElement;
//   open: boolean;
//   value: number;
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
  
  console.log('DATA FROM DB READ (QUERY)', data)
  console.log('DATA FROM MUTATION', newData)

  // const handleSwitch = (event: any) => {
  //   setState({ 
  //     ...state, 
  //     [event.target.name]: event.target.checked 
  //   });
  // };

  const updateField = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };
  if (!loading && data) {
    return (
      <div>
        {data.findUser.portara.map((props:Props) => {
              return (
        <div>
          <div>
            <Typography color="textSecondary" align="center">
            Rate Limit
            </Typography>
            <div className={classes.root}>
              <div className={classes.margin} />
              <DemoSlider name="limit" valueLabelDisplay="auto" defaultValue={Number(props.limit)} onChange={updateField} />
              <label>per</label>
                <TextField
                  name="per"
                  // type="number"
                  placeholder={props.per}
                  InputProps={{
                    className: classes.searchInput,
                  }}
                  onChange={updateField}
                />
              {/* <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">time</InputLabel>
                <Select
                  native
                  name="rateTime"
                  value={state.rateTimeValue}
                  onChange={updateField}
                  label="time"
                  inputProps={{
                    name: 'rateTimeValue',
                    id: 'outlined-age-native-simple',
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value='miliseconds'>ms</option>
                  <option value='seconds'>s</option>
                  <option value='minutes'>m</option>
                  <option value='hours'>h</option>
                  <option value='days'>d</option>
                </Select>
              </FormControl> */}
            </div>
          </div>
          <div>
            <div className={classes.root}>
            <div className={classes.margin} />
            <Typography>Throttle: </Typography>
            {/* <FormControlLabel
              control={
                <Switch
                  checked={state.isThrottled}
                  onChange={handleSwitch}
                  name="isThrottled"
                  color="primary"
                />
              }
              label="Throttle"
            /> */}
            {/* <label>every</label> */}
              <TextField
                name="throttle"
                // type="number"
                placeholder={props.throttle}
                InputProps={{
                  className: classes.searchInput,
                }}
              />
            {/* <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">time</InputLabel>
              <Select
                native
                name="throttleTimeValue"
                value={state.throttleTimeValue}
                onChange={updateField}
                label="time"
                inputProps={{
                  name: 'throttleTimeValue',
                  id: 'outlined-age-native-simple',
                }}
              >
                <option aria-label="None" value="" />
                <option value='miliseconds'>ms</option>
                <option value='seconds'>s</option>
                <option value='minutes'>m</option>
                <option value='hours'>h</option>
                <option value='days'>d</option>
              </Select>
            </FormControl> */}
            </div>
          </div>
        </div>
              )
        })}
        <div>
          <div>
            <Typography color="textSecondary" align="center">
            Rate Limit
            </Typography>
            <div className={classes.root}>
              <div className={classes.margin} />
              <DemoSlider name="limit" valueLabelDisplay="auto" defaultValue={10} onChange={updateField} />
              <label>per</label>
                <TextField
                  name="per"
                  // type="number"
                  placeholder=""
                  InputProps={{
                    className: classes.searchInput,
                  }}
                  onChange={updateField}
                />
              {/* <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">time</InputLabel>
                <Select
                  native
                  name="rateTime"
                  value={state.rateTimeValue}
                  onChange={updateField}
                  label="time"
                  inputProps={{
                    name: 'rateTimeValue',
                    id: 'outlined-age-native-simple',
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value='miliseconds'>ms</option>
                  <option value='seconds'>s</option>
                  <option value='minutes'>m</option>
                  <option value='hours'>h</option>
                  <option value='days'>d</option>
                </Select>
              </FormControl> */}
            </div>
          </div>
          <div>
            <div className={classes.root}>
            <div className={classes.margin} />
            <Typography>Throttle: </Typography>
            {/* <FormControlLabel
              control={
                <Switch
                  checked={state.isThrottled}
                  onChange={handleSwitch}
                  name="isThrottled"
                  color="primary"
                />
              }
              label="Throttle"
            /> */}
            {/* <label>every</label> */}
              <TextField
                name="throttle"
                // type="number"
                placeholder=""
                InputProps={{
                  className: classes.searchInput,
                }}
              />
            {/* <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">time</InputLabel>
              <Select
                native
                name="throttleTimeValue"
                value={state.throttleTimeValue}
                onChange={updateField}
                label="time"
                inputProps={{
                  name: 'throttleTimeValue',
                  id: 'outlined-age-native-simple',
                }}
              >
                <option aria-label="None" value="" />
                <option value='miliseconds'>ms</option>
                <option value='seconds'>s</option>
                <option value='minutes'>m</option>
                <option value='hours'>h</option>
                <option value='days'>d</option>
              </Select>
            </FormControl> */}
            </div>
          </div>
        </div>
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
