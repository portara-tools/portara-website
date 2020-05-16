// import Link from 'next/link'
import Layout from '../components/Layout';
import { withRedux } from '../lib/withRedux';
import { withApollo } from '../lib/withApollo';
import { useSelector, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { Button, Container, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/styles';

const IndexPage = () => {
  const classes = useStyle();
  return (
    <Container maxWidth='sm' className={classes.container}>
      <Layout title='Portara | Home'>
        <Container>
          <Typography variant='h2'>The best rate limiter that exists</Typography>
        </Container>
      </Layout>
    </Container>
  );
};

// This may need to change, but basically compose works by combining wrapper functions into one
export default compose(withApollo, withRedux)(IndexPage);

const useStyle = makeStyles({
  container: {
    backgroundColor: 'black',
    height: '100vh',
    padding: '0',
  },
});
