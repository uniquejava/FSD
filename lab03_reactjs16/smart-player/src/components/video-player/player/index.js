import React, { Component } from 'react';
import './player.css';

class Player extends Component {
  render() {
    return (
      <video
        ref={el => (this.video = el)}
        timeupdate={this.props.handleTimeUpdate}
        ended={this.props.handleVideoEnded}
      >
        <source src={this.props.src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }
}

export default Player;
