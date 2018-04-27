import React, { Component } from "react";

export class NumberSelector extends Component {
  render() {
    const isInvalid = this.props.isInvalid ? "is-invalid" : "";
    return (
      <div className="number-selector-blockform-group">
        <input
          id="number"
          className={`number-selector form-control ${isInvalid}`}
          type="number"
          placeholder={this.props.placeholder}
          vlaue={this.props.value}
          onChange={this.props.onChange}
        />
        <div className="invalid-feedback">{this.props.invalidFeedback}</div>
      </div>
    );
  }
}
