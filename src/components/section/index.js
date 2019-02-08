import React, { Component } from 'react';
import './index.css';

export default class Section extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div {...this.props} className="section-container">
        {this.props.header && (
          <div className="section-header">{this.props.header}</div>
        )}
        <div className="section-main">{this.props.children}</div>
      </div>
    );
  }
}
