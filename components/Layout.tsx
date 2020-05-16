import * as React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { AppBar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

type Props = {
  title?: string;
};

const useStyles = makeStyles({
  linkStyle: {
    textDecoration: 'none',
    // color: 'black',
  },
  appBar: {
    backgroundColor: "black",
  }
});

const Layout: React.FunctionComponent<Props> = (props) => {
  const { children, title = 'This is the default title' } = props;
  const classes = useStyles(props);
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <header>
        <AppBar position="static" className={classes.appBar}>
          <ul>
          <Link href='/'>
            <Button>
              <a className={classes.linkStyle}>Home</a>
            </Button>
          </Link>
          <Link href='/Documentation'>
            <Button>
              <a className={classes.linkStyle}>Documentation</a>
            </Button>
          </Link>
          <Link href='/about'>
            <Button>
              <a className={classes.linkStyle}>About</a>
            </Button>
          </Link>

          </ul>
        </AppBar>
      </header>
      {children}
      {/* <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer> */}
    </div>
  );
};

export default Layout;
