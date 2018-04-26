import React, { Component } from "react";
import { JokeList } from "../joke-list/JokeList";
import { CheckBoxList } from "./checkbox-list/CheckBoxList";
import { NumberSelector } from "./number-selector/NumberSelector";
import { ICNDb } from "../../api/icndb/ICNDb";

export class MainBlock extends Component {
  constructor() {
    super();

    this.state = {
      numberOfJokes: 1,
      categoryList: [
        { name: "nerdy", isToggled: true },
        { name: "explicit", isToggled: true }
      ],
      jokeList: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleToggleChange = this.handleToggleChange.bind(this);
  }

  handleClick() {
    this.pullData();
    /*
    console.log(jokes);
    const array = jokes.value.map(element => {
      return {
        text: element.joke,
        category: element.categories[0]
      };
    });
    this.setState({ jokeList: [].concat(array) });*/
  }

  async pullData() {
    const data = ICNDb.getData();
    data.then(request => request.json()).then(json => {
      const pulledList = json.value.map(element => {
        return { text: element.joke, category: element.categories[0] };
      });
      this.setState({ jokeList: [].concat(pulledList) });
    });
  }

  handleChange(event) {
    this.setState({ numberOfJokes: event.target.value });
  }

  handleToggleChange(index, isToggled) {
    const array = JSON.parse(JSON.stringify(this.state.categoryList));
    array[index].isToggled = isToggled;
    this.setState({ categoryList: [].concat(array) });
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
              onChnage={this.handleToggleChange}
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
