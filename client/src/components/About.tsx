import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from './Navbar';
// import AnimatedCard from './AnimatedCard'
import Title from './Title'

const About: React.FunctionComponent = (props) => {
  const classes = useStyles(props);
  return (
    <>
      <Navbar />
      <Title>team potato</Title>
      <Box maxWidth='sm' className={classes.container}>
        <Grid container spacing={6} className={classes.peopleContainer}>
          <Grid item xs={6} className={classes.personCard}>

            <img alt='Peve' src={'/a.png'} style={{ height: '175px', marginRight: '15px', borderRadius: '10%' }} />
            <Box className={classes.infoBox}>
              <Typography variant='h5'>Peve</Typography>
              <Typography variant='body2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui placeat rerum temporibus veniam sequi! Hic quos, dicta alias corrupti atque aliquid sed, facere quasi quibusdam non consequuntur magni error. Dolorem.</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} className={classes.personCard}>

            <img alt='Podd' src={'/b.png'} style={{ height: '175px', marginRight: '15px', marginTop: '5px', borderRadius: '10%' }} />
            <Box className={classes.infoBox}>
              <Typography variant='h5'>Podd</Typography>
              <Typography variant='body2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui placeat rerum temporibus veniam sequi! Hic quos, dicta alias corrupti atque aliquid sed, facere quasi quibusdam non consequuntur magni error. Dolorem.</Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={6} className={classes.peopleContainer}>
          <Grid item xs={6} className={classes.personCard}>

            <img alt='Pary' src={'/c.png'} style={{ height: '175px', marginRight: '15px', borderRadius: '10%' }} />
            <Box className={classes.infoBox}>
              <Typography variant='h5'>Pary</Typography>
              <Typography variant='body2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui placeat rerum temporibus veniam sequi! Hic quos, dicta alias corrupti atque aliquid sed, facere quasi quibusdam non consequuntur magni error. Dolorem.</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} className={classes.personCard}>

            <img alt='Palex' src={'/d.png'} style={{ height: '175px', marginRight: '15px', marginTop: '5px', borderRadius: '10%' }} />
            <Box className={classes.infoBox}>
              <Typography variant='h5'>Palex</Typography>
              <Typography variant='body2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui placeat rerum temporibus veniam sequi! Hic quos, dicta alias corrupti atque aliquid sed, facere quasi quibusdam non consequuntur magni error. Dolorem.</Typography>
            </Box>
          </Grid>
        </Grid>





      </Box>
    </>
  );
};


const useStyles = makeStyles(() => ({
  container: {
    backgroundSize: 'contain',
    padding: '25px',
    margin: '0 10%',
  },
  peopleContainer: {
  },
  personCard: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '10px',
    width: '90%',
  },
  infoBox: {
    display: 'flex',
    flexDirection: 'column',

  }
}));

export default About;