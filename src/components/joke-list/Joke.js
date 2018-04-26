import React, { Component } from "react";

export class Joke extends Component {
  render() {
    return (
      <div className="joke">
        <div className="joke-text">{this.props.text}</div>
        <div className="joke-category">{this.props.category}</div>
      </div>
    );
  }
}
