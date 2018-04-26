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
      categoryList: [],
      jokeList: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleToggleChange = this.handleToggleChange.bind(this);
  }

  handleClick() {
    const link = `http://api.icndb.com/jokes/random/${
      this.state.numberOfJokes
    }?limitTo=${this.convertCategoryList()}`;
    this.pullData(link, json => {
      const pulledList = json.value.map(element => {
        return { text: element.joke, category: element.categories[0] };
      });
      this.setState({ jokeList: [].concat(pulledList) });
    });
  }

  convertCategoryList() {
    const separator = ",";
    const array = this.state.categoryList.map(element => {
      if (element.isToggled) return element.name;
    });
    return array.join(separator);
  }

  async pullData(link, action) {
    const data = ICNDb.getData(link);
    data.then(request => request.json()).then(json => {
      action(json);
    });
  }

  componentDidMount() {
    const link = `http://api.icndb.com/categories`;
    this.pullData(link, json => {
      const pulledList = json.value.map(element => {
        return { name: element, isToggled: false };
      });
      pulledList.push({ name: "select all", isToggled: false });
      this.setState({ categoryList: [].concat(pulledList) });
    });
  }

  handleChange(event) {
    this.setState({ numberOfJokes: event.target.value });
  }

  handleToggleChange(index, isToggled) {
    const array = JSON.parse(JSON.stringify(this.state.categoryList));
    array[index].isToggled = isToggled;
    this.setState({
      categoryList: [].concat(array)
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
