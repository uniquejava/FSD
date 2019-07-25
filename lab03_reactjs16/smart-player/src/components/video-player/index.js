import React, { Component } from 'react';
import axios from 'axios';
import Player from './player';
import Controls from './controls';
import PlayList from './playlist';
import './video-player.css';

const VOTE_UP = 'up';
const VOTE_DOWN = 'down';

class VideoPlayer extends Component {
  constructor(props, context) {
    super(props, context);
    // this.playerRef = React.createRef();
    // this.controlsRef = React.createRef();

    this.state = {
      currentCourse: {},
      courses: [],
      video: {},
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
  }

  componentDidMount() {
    console.log('this.playerRef=', this.playerRef);
    axios
      .get('http://localhost:3000/courses')
      .then(res => {
        let courses = res.data;
        this.setState({
          courses: courses,
          currentCourse: courses[0],
          video: this.playerRef.video,
          muted: this.playerRef.video.muted,
        });
      })
      .catch(err => {
        console.log('err=', err);
      });
  }

  render() {
    const { muted, likes, unlikes, ratio, courses } = this.state;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8">
            <div id="videoContainer" className="smart-player mb-2">
              <Player
                // ref={this.playerRef}
                ref={el => (this.playerRef = el)}
                src={this.state.currentCourse.url}
                handleTimeUpdate={this.handleTimeUpdate}
                handleVideoEnded={this.handleVideoEnded}
              />
              <Controls
                // ref={this.controlsRef}
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
              courses={courses}
              courseSelected={this.handleCourseSelected}
            />
          </div>
        </div>
      </div>
    );
  }

  // control's events
  play() {
    const { currentCourse, video } = this.state;

    console.log('currentCourse=', currentCourse);
    console.log('video=', video);

    if (currentCourse) {
      video.src = currentCourse.url;
      video.play();
    }
  }

  pause() {
    console.log('pause is clicked.');

    const { video } = this.state;

    console.log('video=', video);
    video.pause();
  }

  stop() {
    const { video } = this.state;

    video.pause();
    video.currentTime = 0;
  }

  volume(amount) {
    const { video } = this.state;

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
    const { video } = this.state;

    const muted = video.muted;
    video.muted = !muted;

    this.setState({ muted: video.muted });
  }

  // get value from localStorage
  _getItem(key, defaultValue) {
    return +localStorage.getItem(key) || defaultValue;
  }

  _displayVoteInfo() {
    const currentCourse = this.state.currentCourse;

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

      this._displayVoteInfo();
    }
  }

  // playlist's events
  handleCourseSelected(course) {
    this.setState({ currentCourse: course });
    this.controlsRef.play();
    this._displayVoteInfo();
  }
}

export default VideoPlayer;
