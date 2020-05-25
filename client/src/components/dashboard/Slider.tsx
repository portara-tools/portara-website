import React from 'react';
import { withStyles, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
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
      maxWidth: 80!,
    },
  }),
);

interface Props {
  children: React.ReactElement;
  open: boolean;
  value: string;
  max: number;
}

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

export default function CustomizedSlider() {
  const classes = useStyles();
  const [state, setState] = React.useState<{ age: string | number; name: string }>({
    age: '',
    name: 'hai',
  });
    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
      const name = event.target.name as keyof typeof state;
      setState({
        ...state,
        [name]: event.target.value,
      });
    };

  return (
    <div>
      <div>
        <Typography color="textSecondary" align="center">
        Rate Limit
        </Typography>
        <div className={classes.root}>
          <div className={classes.margin} />
          <DemoSlider valueLabelDisplay="auto" defaultValue={10} />
          <label>per</label>
            <TextField
              type="number"
              placeholder=""
              InputProps={{
                className: classes.searchInput,
              }}
            />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">time</InputLabel>
            <Select
              native
              value={state.age}
              onChange={handleChange}
              label="Age"
              inputProps={{
                name: 'age',
                id: 'outlined-age-native-simple',
              }}
            >
              <option aria-label="None" value="" />
              <option value={10}>ms</option>
              <option value={20}>s</option>
              <option value={30}>m</option>
              <option value={40}>h</option>
              <option value={50}>d</option>
            </Select>
          </FormControl>
        </div>
      </div>
      <div>
        <Typography color="textSecondary" align="center">
        Throttle
        </Typography>
        <div className={classes.root}>
        <div className={classes.margin} />
        <DemoSlider valueLabelDisplay="auto" defaultValue={10} />
        <label>per</label>
          <TextField
            type="number"
            placeholder=""
            InputProps={{
              className: classes.searchInput,
            }}
          />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="outlined-age-native-simple">time</InputLabel>
          <Select
            native
            value={state.age}
            onChange={handleChange}
            label="Age"
            inputProps={{
              name: 'age',
              id: 'outlined-age-native-simple',
            }}
          >
            <option aria-label="None" value="" />
            <option value={10}>ms</option>
            <option value={20}>s</option>
            <option value={30}>m</option>
            <option value={40}>h</option>
            <option value={50}>d</option>
          </Select>
        </FormControl>
        </div>
      </div>
    </div>
  );
}