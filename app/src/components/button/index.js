import React, { Component } from 'react';
import './index.css';

export default class Button extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: false };
    this._onClick = this._onClick.bind(this);
  }

  async _onClick() {}

  render() {
    return (
      <button {...this.props} className={this.props.className + ' main-button'}>
        {this.props.children}
      </button>
    );
  }
}

Button.defaultProps = {
  onClick: () => console.error('No onClick passed to button!'),
  className: ''
};
