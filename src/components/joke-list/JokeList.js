import React, { Component } from "react";
import { Joke } from "./Joke";

export class JokeList extends Component {
  renderJokeList(jokeList) {
    return jokeList.map((element, index) => {
      return (
        <Joke id={index} category={element.category} text={element.text} />
      );
    });
  }

  render() {
    return (
      <div>
        <Joke category="asdfgh" text="qwerty" />
        <Joke category="asdfgh" text="qwerty" />
        <Joke category="asdfgh" text="qwerty" />
      </div>
    );
  }
}
