import React, { Component } from "react";

export class CheckBoxItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isToggled: this.props.isToggled
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleToggle(event) {
    /*this.setState({ isToggled: !this.state.isToggled }, () => {
      this.props.onToggle(this.props.index, this.state.isToggled);
    });*/
  }

  handleChange(event) {
    this.setState({ isToggled: !this.state.isToggled }, () => {
      this.props.onToggle(this.props.index, this.state.isToggled);
    });
  }

  render() {
    return (
      <div className="checkbox-item">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id={this.props.index}
            onClick={this.handleToggle}
            checked={this.state.isToggled}
            onChange={this.handleChange}
          />
          <label className="custom-control-label" htmlFor={this.props.index}>
            {this.props.name}
          </label>
        </div>
      </div>
    );
  }
}
