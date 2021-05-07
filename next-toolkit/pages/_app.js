import React from "react";
import NextApp from "next/app";
import Head from "next/head";
import withReduxStore from "../lib/with-redux-store";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import Alert from "../components/Alert";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import theme from "../chakraTheme";
import "./style.css";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

//Binding events.
Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on("routeChangeComplete", (url) => {
  console.log(`Done: ${url}`);
  NProgress.done();
});
Router.events.on("routeChangeError", (url) => {
  console.log(url);
  NProgress.done();
});

class App extends NextApp {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {
      pageProps,
    };
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <Provider store={reduxStore}>
        <ChakraProvider theme={theme}>
          <Alert />
          <Navbar />
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    );
  }
}

export default withReduxStore(App);
