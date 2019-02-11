import React, { Component } from 'react';
import './index.css';
import PropTypes from 'prop-types';
import { BarLoader, BeatLoader } from 'react-spinners';

export default class Button extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: false };
    this._onClick = this._onClick.bind(this);
  }

  async _onClick() {
    console.log('button click');

    this.setState({ loading: true });
    await this.props.onClick();
    this.setState({ loading: false });
  }

  render() {
    return (
      <button
        {...this.props}
        className={this.props.className + ' main-button'}
        onClick={this._onClick}
      >
        {this.state.loading ? (
          <BeatLoader width={80} widthUnit="%" color="var(--main-bg-color)" />
        ) : (
          this.props.children
        )}
      </button>
    );
  }
}

Button.defaultProps = {
  onClick: () => console.error('No onClick passed to button!'),
  className: '',
  disabled: false
};

Button.propTypes = {
  disabled: PropTypes.bool
};
