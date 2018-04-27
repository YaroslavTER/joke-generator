import React, { Component } from "react";
import { CheckBoxItem } from "./CheckBoxItem";
import { Loader } from "../../loader/Loader";

export class CheckBoxList extends Component {
  renderCkechBoxList(ckechBoxList) {
    return ckechBoxList.map((element, index) => {
      return (
        <CheckBoxItem
          key={index + element.name}
          index={index}
          name={element.name}
          onChnage={this.props.onChnage}
          isToggled={element.isToggled}
        />
      );
    });
  }

  render() {
    const render = this.props.isLoading ? (
      <Loader />
    ) : (
      this.renderCkechBoxList(this.props.ckechBoxList)
    );
    return <div className="checkbox-list">{render}</div>;
  }
}
