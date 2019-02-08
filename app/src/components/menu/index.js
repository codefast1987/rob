import React, { Component } from 'react';
import './index.css';

export default class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return <div className="main-menu">{this.props.children}</div>;
  }
}
