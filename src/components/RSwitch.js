import React, { Component } from "react";
import Switch from "react-switch";
 
class RSwitch extends Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(checked) {
    //this.props.enableAll;
    this.setState({ checked });
    this.props.all(checked);
  }
 
  render() {
    return (
      <label style={{marginBottom: '-0.25rem'}}>
        <Switch uncheckedIcon={false} checkedIcon={false} onColor={'#09006E'} onChange={this.handleChange} checked={this.state.checked} />
      </label>
    );
  }
}

export default RSwitch;
