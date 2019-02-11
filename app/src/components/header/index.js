import React, { Component } from 'react';
import './index.css';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      top: true
    };

    window.onscroll = (e) => {
      console.log(e.pageY);
      if (e.pageY > 0) this.setState({ top: false });
      if (e.pageY === 0) this.setState({ top: true });
    };
  }

  render() {
    return (
      <div className={`header ${this.state.top ? 'top' : 'not-top'}`}>
        {this.props.children}
      </div>
    );
  }
}
