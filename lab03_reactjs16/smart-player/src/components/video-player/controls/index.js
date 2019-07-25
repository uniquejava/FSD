import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRedo,
  faPlay,
  faPause,
  faStop,
  faPlus,
  faMinus,
  faVolumeUp,
  faVolumeMute,
  faThumbsDown,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import './controls.css';

const PLAYING = 'playing';
const PAUSED = 'paused';
const STOPPED = 'stopped';

class Controls extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { status: '' };

    // this.btnPlay = React.createRef();

    this.reload = this.reload.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
  }

  render() {
    const { status } = this.state;
    return (
      <Fragment>
        <div id="progressContainer">
          <progress value={this.props.ratio * 100} max="100" />
        </div>
        <div id="videoControls">
          <div className="buttons">
            <button id="btnReload" className="btn" onClick={this.reload}>
              <FontAwesomeIcon icon={faRedo} />
            </button>

            <button
              id="btnPlay"
              className="btn"
              disabled={status === 'playing'}
              onClick={this.play}
            >
              <FontAwesomeIcon icon={faPlay} />
            </button>
            <button
              id="btnPause"
              className="btn"
              disabled={status !== 'playing'}
              onClick={this.pause}
            >
              <FontAwesomeIcon icon={faPause} />
            </button>
            <button
              id="btnStop"
              className="btn"
              disabled={status === 'stopped' || status === ''}
              onClick={() => {
                this.stop();
              }}
            >
              <FontAwesomeIcon icon={faStop} />
            </button>
            <button
              id="btnVolumeUp"
              className="btn"
              onClick={() => {
                this.volume(0.1);
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <button
              id="btnVolumeDown"
              className="btn"
              onClick={() => {
                this.volume(-0.1);
              }}
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <button
              id="btnMute"
              className="btn"
              onClick={() => {
                this.mute();
              }}
            >
              <FontAwesomeIcon
                icon={this.props.muted ? faVolumeMute : faVolumeUp}
              />
            </button>

            <button
              id="btnUnlike"
              className="btn float-right"
              onClick={() => {
                this.vote('down');
              }}
            >
              <FontAwesomeIcon icon={faThumbsDown} /> {this.props.unlikes}
            </button>

            <button
              id="btnLike"
              className="btn float-right"
              onClick={() => {
                this.vote('up');
              }}
            >
              <FontAwesomeIcon icon={faThumbsUp} /> {this.props.likes}
            </button>
          </div>
        </div>
      </Fragment>
    );
  }

  reload() {
    this.stop();
    this.play();
  }

  play() {
    this.setState({ status: PLAYING });
    this.props.playClicked();
  }

  pause() {
    this.setState({ status: PAUSED });
    this.props.pauseClicked();
  }

  stop() {
    this.setState({ status: STOPPED });
    this.props.stopClicked();
  }

  volume(amount) {
    this.props.volumeClicked(amount);
  }

  mute() {
    this.props.muteClicked();
  }

  vote(type) {
    this.props.voteClicked(type);
  }
}

export default Controls;
