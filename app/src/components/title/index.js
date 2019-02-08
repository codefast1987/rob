import React, { Component } from 'react';
import './index.css';

export default class Title extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="main-title">{this.props.children}</div>;
  }
}
