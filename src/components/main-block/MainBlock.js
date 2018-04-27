import React, { Component } from "react";
import { JokeList } from "../joke-list/JokeList";
import { CheckBoxList } from "./checkbox-list/CheckBoxList";
import { NumberSelector } from "./number-selector/NumberSelector";
import ICNDb from "../../api/icndb/ICNDb";

export class MainBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfJokes: { value: 1, isInvalid: false },
      categoryList: { value: [], isLoading: false },
      jokeList: { value: [], isLoading: false },
      selectAllName: "select all"
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleToggleChange = this.handleToggleChange.bind(this);
  }

  /**
   * This function pulling jokes from api of selected categories.
   * If any category isn't selected, then it pulling random jokes without
   * lifitation of categories.
   *
   * Function refresh list if chosed number of jokes in
   * valid interval else it trigger an error.
   *
   * Before pulling data from api, render loader.
   */
  handleClick() {
    const selectedCategories = this.convertCategoryList();
    const categoryOption =
      selectedCategories !== null ? `?limitTo=${selectedCategories}` : "";
    if (
      this.state.numberOfJokes.value >= 0 &&
      this.state.numberOfJokes.value <= 10
    ) {
      const link = `/jokes/random/${
        this.state.numberOfJokes.value
      }${categoryOption}`;
      this.setState({ jokeList: { isLoading: true } });

      ICNDb.pullData(link, json => {
        const pulledList = json.value.map(element => {
          return { text: element.joke, category: element.categories[0] };
        });
        this.setState({
          jokeList: { isLoading: false, value: [].concat(pulledList) }
        });
      });
    } else {
      this.setState({ numberOfJokes: { isInvalid: true } });
    }
  }

  /**
   * There is filtering of selected categories
   * and converting it to valid format for an api.
   */
  convertCategoryList() {
    if (this.isSelected()) {
      const separator = ",";
      const array = this.state.categoryList.value
        .map(element => {
          if (element.isToggled) return element.name;
          return null;
        })
        .filter(element => element !== null);
      return array.join(separator);
    }
    return null;
  }

  isSelected() {
    let result = false;
    this.state.categoryList.value.forEach(element => {
      if (element.isToggled) {
        result = true;
      }
    });
    return result;
  }

  /**
   * Here is pulling categories and counting them as not selected.
   */
  componentDidMount() {
    const link = `/categories`;
    this.setState({ categoryList: { isLoading: true } });
    ICNDb.pullData(link, json => {
      const pulledList = json.value.map(element => {
        return { name: element, isToggled: false };
      });
      pulledList.push({ name: this.state.selectAllName, isToggled: false });
      this.setState({
        categoryList: { value: [].concat(pulledList), isLoading: false }
      });
    });
  }

  handleChange(event) {
    this.setState({ numberOfJokes: { value: event.target.value } });
  }

  /**
   * There is checkbox handler.
   */
  handleToggleChange(index, isToggled) {
    const array = JSON.parse(JSON.stringify(this.state.categoryList.value));
    const length = array.length;

    if (array[index].name === this.state.selectAllName) {
      array.forEach(element => {
        element.isToggled = isToggled;
      });
    } else if (
      array[length - 1].isToggled &&
      array[index].isToggled &&
      array[index].name !== this.state.selectAllName
    ) {
      array[index].isToggled = false;
      array[length - 1].isToggled = false;
    } else if (array[index].isToggled) {
      array[index].isToggled = false;
    } else if (!array[index].isToggled) {
      array[index].isToggled = true;
    }
    this.setState({
      categoryList: { value: [].concat(array) }
    });
  }

  render() {
    return (
      <div className="container">
        <div className="joke-settings-background">
          <div className="joke-settings-block">
            <div className="header">{this.props.name}</div>
            <NumberSelector
              value={this.state.numberOfJokes.value}
              onChange={this.handleChange}
              placeholder="number of jokes"
              isInvalid={this.state.numberOfJokes.isInvalid}
              invalidFeedback="It must be in range from 1 to 10."
            />
            <CheckBoxList
              ckechBoxList={this.state.categoryList.value}
              isLoading={this.state.categoryList.isLoading}
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
        <JokeList
          jokeList={this.state.jokeList.value}
          isLoading={this.state.jokeList.isLoading}
        />
      </div>
    );
  }
}
