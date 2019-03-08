import React, { Component } from 'react';
import Carousel from 'nuka-carousel';

export default class ImageCarousel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <Carousel {...this.props}>
          <img src="https://picsum.photos/1000*300" />
          <img src="https://picsum.photos/1000*300/?random" />
          <img src="https://picsum.photos/g/1000*300" />
          <img src="https://picsum.photos/1000*300/?random" />
          <img src="https://picsum.photos/1000*300" />
          <img src="https://picsum.photos/g/1000*300" />
        </Carousel>
      </div>
    );
  }
}
