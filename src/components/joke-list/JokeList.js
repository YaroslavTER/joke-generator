import React, { Component } from "react";
import { Joke } from "./Joke";

export class JokeList extends Component {
  renderJokeList(jokeList) {
    return jokeList.map((element, index) => {
      return (
        <Joke
          key={index + element.category}
          category={element.category}
          text={element.text}
        />
      );
    });
  }

  render() {
    return <div>{this.renderJokeList(this.props.jokeList)}</div>;
  }
}
