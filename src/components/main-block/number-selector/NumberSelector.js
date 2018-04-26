import React, { Component } from "react";

export class NumberSelector extends Component {
  render() {
    return (
      <div className="number-selector-block">
        <input
          id="number"
          className="number-selector"
          type="number"
          placeholder={this.props.placeholder}
          vlaue={this.props.value}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}
