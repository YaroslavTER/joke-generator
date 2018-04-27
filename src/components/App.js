import React, { Component } from "react";
import "../styles/App.css";
import { MainBlock } from "./main-block/MainBlock";

class App extends Component {
  render() {
    return <MainBlock name="JokeGenerator" />;
  }
}

export default App;
