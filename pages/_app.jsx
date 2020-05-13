import App from 'next/app';
import { Provider } from 'react-redux';
import React from 'react';
import withRedux from 'next-redux-wrapper'
import store from '../redux/store'

class MyApp extends App {

  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    //Anything returned here can be access by the client
    return { pageProps: pageProps };
  }



  render() {

    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}

const makeStore = () => store;

export default withRedux(makeStore)(MyApp);