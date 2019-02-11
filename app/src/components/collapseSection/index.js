import React, { Component } from 'react';
import { Collapse } from 'react-collapse';
import './index.css';

export default class CollapseSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpened: props.isOpened
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isOpened !== this.props.isOpened)
      this.setState({ isOpened: this.props.isOpened });
  }

  render() {
    return (
      <div className="collapse-section-container">
        <div
          className="section-header"
          onClick={() => {
            if (!this.props.disabled)
              this.setState({ isOpened: !this.state.isOpened });
          }}
        >
          <span>
            {this.props.disabled ? this.props.disabledText : this.props.header}
          </span>
          {!this.props.disabled && (
            <span>{this.state.isOpened ? '▲' : '▼'}</span>
          )}
        </div>
        <Collapse isOpened={this.state.isOpened}>
          {this.props.children}
        </Collapse>
      </div>
    );
  }
}

CollapseSection.defaultProps = {
  disabled: false,
  disabledText: 'Section currently disabled',
  isOpened: false
};
