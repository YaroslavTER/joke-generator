import React, { Component } from "react";

export class CheckBoxItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isToggled: this.props.isToggled
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ isToggled: !this.state.isToggled }, () => {
      this.props.onChnage(this.props.index, this.state.isToggled);
    });
  }

  render() {
    let isToggled;
    if (this.props.isToggledAll) {
      isToggled = true;
    } else isToggled = this.state.isToggled;
    return (
      <div className="checkbox-item">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id={this.props.index}
            checked={isToggled}
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
