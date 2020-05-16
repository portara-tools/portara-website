import * as React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { AppBar, Typography, Container, Link as LinkM, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

type Props = {
  title?: string;
};


const Layout: React.FunctionComponent<Props> = (props) => {
  const { children, title = 'This is the default title' } = props;
  const classes = useStyles(props);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>


      <Container maxWidth='sm' className={classes.container}>
        <AppBar position="static" className={classes.appBar}>
          <ul className={classes.linksUL}>
            <Link href='/'>
              <LinkM variant="overline" underline="none" className={classes.linkStyle}>HOME</LinkM>

            </Link>
            <Link href='/documentation'>
              <LinkM variant="overline" underline="none" className={classes.linkStyle}>DOCUMENTATION</LinkM>
            </Link>
            <Link href='/about'>
              <LinkM variant="overline" underline="none" className={classes.linkStyle}>ABOUT</LinkM>
            </Link>
          </ul>
          <Button className={classes.loginButton} size="small">LOGIN / SIGNUP</Button>
        </AppBar>
        {children}
      </Container>
    </>
  );
};

export default Layout;


const useStyles = makeStyles(() => ({

  appBar: {
    flexDirection: "row",
    backgroundColor: "black",
    justifyContent: "space-between"
  },
  container: {
    backgroundColor: 'black',
    padding: '25px',
    maxWidth: '1000px'
  },
  linksUL: {
    display: 'flex',
    padding: 0
  },
  linkStyle: {
    textDecoration: 'none',
    color: 'white',
    '&:hover': {
      color: "violet"
    },
    padding: '5px',
  },
  loginButton: {

    '&:hover': {
      color: "violet",
      backgroundColor: "black",
    },
  }

}));