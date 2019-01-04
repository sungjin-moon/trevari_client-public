import React from "react";
import App, { Container } from "next/app";
import Header from "../containers/Header";
import Footer from "../containers/Footer";
import Filter from "../containers/Filter";

export default class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      movepage: "/login",
      text: "로그인",
      bookTitle: "",
      isSearching: false
    };

    this.changeCondition = this.changeCondition.bind(this);
    this.rechangeCondition = this.rechangeCondition.bind(this);
    this._changeBookTitle = this._changeBookTitle.bind(this);
  }

  changeCondition = () => {
    this.setState({
      movepage: "/index",
      text: "로그아웃"
    });
  };

  rechangeCondition = () => {
    if (this.state.text === "로그아웃") {
      this.setState({
        id: "",
        movepage: "/login",
        text: "로그인"
      });
    }
  };

  _changeBookTitle = title => {
    if (title === "") {
      this.setState({
        bookTitle: "",
        isSearching: false
      });
    } else {
      this.setState({
        bookTitle: title,
        isSearching: true
      });
    }
  };

  saveId = loginId => {
    this.setState({
      id: loginId
    });
  };

  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    // console.log("App.js", this.state.isSearching)
    console.log("App.js", this.state.bookTitle);
    console.log("App.js--ID : ", this.state.id);
    return (
      <Container>
        <Header
          loginState={this.state}
          rechangeCondition={this.rechangeCondition}
        />
        <Filter _changeBookTitle={this._changeBookTitle} />
        <Component
          {...pageProps}
          ID={this.state.id}
          saveId={this.saveId}
          changeCondition={this.changeCondition}
          isSearching={this.state.isSearching}
          bookTitle={this.state.bookTitle}
        />
        <Footer />
      </Container>
    );
  }
}
