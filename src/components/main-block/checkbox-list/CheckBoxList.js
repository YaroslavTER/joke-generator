import React, { Component } from "react";
import { CheckBoxItem } from "./CheckBoxItem";

export class CheckBoxList extends Component {
  renderCkechBoxList(ckechBoxList) {
    return ckechBoxList.map((element, index) => {
      return (
        <CheckBoxItem
          key={index + element.name}
          index={index}
          name={element.name}
          onToggle={this.props.onToggle}
          isToggled={element.isToggled}
        />
      );
    });
  }

  render() {
    return (
      <div className="checkbox-list">
        {this.renderCkechBoxList(this.props.ckechBoxList)}
      </div>
    );
  }
}
