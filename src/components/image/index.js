import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

export default class Image extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    console.log(this.props);

    return (
      <div>
        <img {...this.props} className="image" />
      </div>
    );
  }
}

Image.defaultProps = {
  // width: '100%',
  // // height: '10%',
  // // src: 'https://via.placeholder.com/1000x200?text=No+src+passed',
  // // 'background-image':
  // //   'url(https://via.placeholder.com/1000x200?text=No+src+passed)',
  // height: '200px',
  // 'background-attachment': 'fixed',
  // alt: 'Placeholder images'
};
