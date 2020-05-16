// import Link from 'next/link'
import Layout from '../components/Layout';
import { withRedux } from '../lib/withRedux';
import { withApollo } from '../lib/withApollo';
// import { useSelector, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { Button, Typography, Grid, Link as LinkM } from '@material-ui/core';
// import { useQuery } from '@apollo/react-hooks';
// import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/styles';

const IndexPage = (props: any) => {
  const classes = useStyles(props)
  return (

    <Layout title='Portara | Home'>
      <Grid className={classes.content}>

        <Typography variant='h2'>Portara</Typography>
        <Typography variant='h5'>The best rate limiter that exists</Typography>


        <Typography
          color='primary'
          variant='subtitle2'
        >This rate limiter accompishes what no other ratelimiter can by using directives for it's application and some serious throttling
          </Typography>


        <Button className={classes.button}>
          <LinkM target='_blank' href='https://www.npmjs.com/package/portara' underline='none' >
            <Typography color='secondary'>Download Mehhh</Typography>
          </LinkM>
        </Button>

      </Grid>
    </Layout>

  );
};

// This may need to change, but basically compose works by combining wrapper functions into one
export default compose(withApollo, withRedux)(IndexPage);

const useStyles = makeStyles(() => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  button: {
    backgroundColor: "purple",
    '&:hover': {
      color: "white",
      backgroundColor: "blue"
    }
  }
}))