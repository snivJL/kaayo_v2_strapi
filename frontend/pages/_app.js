import App from "next/app";
import React from "react";
import "../styles/globals.css";
import store from "../redux/store";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}
const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
