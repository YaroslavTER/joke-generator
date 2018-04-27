import React, { Component } from "react";
import { Joke } from "./Joke";
import { Loader } from "../loader/Loader";

export class JokeList extends Component {
  renderJokeList(jokeList) {
    return jokeList.map((element, index) => {
      return (
        <Joke key={index} category={element.category} text={element.text} />
      );
    });
  }

  render() {
    const render = this.props.isLoading ? (
      <Loader />
    ) : (
      this.renderJokeList(this.props.jokeList)
    );
    return <div className="joke-list">{render}</div>;
  }
}
