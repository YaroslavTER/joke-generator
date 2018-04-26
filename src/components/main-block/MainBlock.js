import React, { Component } from "react";
import { JokeList } from "../joke-list/JokeList";
import { CheckBoxList } from "./checkbox-list/CheckBoxList";
import { NumberSelector } from "./number-selector/NumberSelector";

export class MainBlock extends Component {
  constructor() {
    super();

    this.state = {
      jokeList: [],
      numberOfJokes: null,
      categoryList: [
        { name: "qwerty", isToggled: true },
        { name: "qwerty1", isToggled: false }
      ]
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleClick() {}

  handleChange(event) {
    this.setState({ numberOfJokes: event.target.value });
  }

  handleToggle(index, isToggled) {
    let array = JSON.parse(JSON.stringify(this.state.categoryList));
    array[index].isToggled = isToggled;
    this.setState({ categoryList: [].concat(array) }, () => {
      console.log(array);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="joke-settings-background">
          <div className="joke-settings-block">
            <div className="header">JokeGenerator</div>
            <NumberSelector
              value={this.state.numberOfJokes}
              onChange={this.handleChange}
              placeholder="number of jokes"
            />
            <CheckBoxList
              ckechBoxList={this.state.categoryList}
              onToggle={this.handleToggle}
            />
            <button
              onClick={this.handleClick}
              className="btn btn-outline-secondary refresh-button"
            >
              Refresh
            </button>
          </div>
        </div>
        <JokeList jokeList={this.state.jokeList} />
      </div>
    );
  }
}
