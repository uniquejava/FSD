import React, { Component } from 'react';
import { connect } from 'react-redux';
import Player from './player';
import Controls from './controls';
import PlayList from './playlist';
import './video-player.css';
import { fetchApprovedCourses } from '../../redux/actions/playListActions';

const VOTE_UP = 'up';
const VOTE_DOWN = 'down';

class VideoPlayer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentCourse: null,
      muted: false,
      likes: 0,
      unlikes: 0,
      ratio: 0,
    };
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.stop = this.stop.bind(this);
    this.volume = this.volume.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.vote = this.vote.bind(this);
    this._displayVoteInfo = this._displayVoteInfo.bind(this);
    this.handleCourseSelected = this.handleCourseSelected.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.handleVideoEnded = this.handleVideoEnded.bind(this);
  }

  get video() {
    return this.playerRef.video;
  }

  componentDidMount() {
    this.props.fetchApprovedCourses();
    this.setState({
      currentCourse: null,
      muted: this.video.muted,
    });
  }

  render() {
    const { muted, likes, unlikes, ratio } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8">
            <div id="videoContainer" className="smart-player mb-2">
              <Player
                ref={el => (this.playerRef = el)}
                handleTimeUpdate={this.handleTimeUpdate}
                handleVideoEnded={this.handleVideoEnded}
              />
              <Controls
                ref={el => (this.controlsRef = el)}
                muted={muted}
                likes={likes}
                unlikes={unlikes}
                ratio={ratio}
                playClicked={this.play}
                pauseClicked={this.pause}
                stopClicked={this.stop}
                volumeClicked={this.volume}
                muteClicked={this.toggleMute}
                voteClicked={this.vote}
              />
            </div>
          </div>

          <div className="col-lg-4">
            <PlayList
              courses={this.props.courses}
              selectCourse={this.handleCourseSelected}
            />
          </div>
        </div>
      </div>
    );
  }

  // player's events
  handleTimeUpdate() {
    // update progress bar

    const video = this.video;
    let ratio = 0;
    if (video.duration) {
      ratio = +((video.currentTime * 1.0) / video.duration).toFixed(2);
    } else {
      ratio = 0;
    }

    this.setState({
      ratio,
    });
  }

  handleVideoEnded() {
    this.controlsRef.stop();
  }

  // control's events
  play() {
    const { currentCourse } = this.state;

    if (currentCourse) {
      this.video.src = currentCourse.url;
      this.video.play();
    }
  }

  pause() {
    console.log('pause is clicked.');
    this.video.pause();
  }

  stop() {
    const video = this.video;

    video.pause();
    video.currentTime = 0;
  }

  volume(amount) {
    const video = this.video;

    const current = +video.volume;
    let expected = current + amount;

    if (expected > 1) {
      expected = 1;
    } else if (expected < 0) {
      expected = 0;
    }

    video.volume = expected;
  }

  toggleMute() {
    const video = this.video;
    const muted = video.muted;
    video.muted = !muted;

    this.setState({ muted: video.muted });
  }

  // get value from localStorage
  _getItem(key, defaultValue) {
    return +localStorage.getItem(key) || defaultValue;
  }

  _displayVoteInfo(currentCourse) {
    let key = `${VOTE_UP}@${currentCourse.id}`;

    const likes = this._getItem(key, 0);

    key = `${VOTE_DOWN}@${currentCourse.id}`;
    const unlikes = this._getItem(key, 0);

    this.setState({
      likes: likes,
      unlikes: unlikes,
    });
  }

  vote(type) {
    const currentCourse = this.state.currentCourse;

    if (currentCourse) {
      let key = type === 'up' ? VOTE_UP : VOTE_DOWN;
      key = `${key}@${currentCourse.id}`;
      const current = this._getItem(key, 0);
      localStorage.setItem(key, current + 1);

      this._displayVoteInfo(currentCourse);
    }
  }

  // playlist's events
  handleCourseSelected(course) {
    this.setState({ currentCourse: course }, () => {
      this.controlsRef.play();
    });

    this._displayVoteInfo(course);
  }
}

const mapStateToProps = state => ({
  courses: state.playlist,
});

const mapDispatchToProps = dispatch => ({
  fetchApprovedCourses: () => dispatch(fetchApprovedCourses()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoPlayer);
