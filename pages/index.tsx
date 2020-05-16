// import Link from 'next/link'
import Layout from '../components/Layout';
import { withRedux } from '../lib/withRedux';
import { withApollo } from '../lib/withApollo';
import { useSelector, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { Button, Container, Typography, Grid } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/styles';

const IndexPage = () => {
  return (

    <Layout title='Portara | Home'>

      <Typography variant='h2'>The best rate limiter that exists</Typography>

    </Layout>

  );
};

// This may need to change, but basically compose works by combining wrapper functions into one
export default compose(withApollo, withRedux)(IndexPage);
