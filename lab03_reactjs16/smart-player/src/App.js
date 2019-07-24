import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Header from './layout/header';
import SideMenu from './layout/sidemenu';
import VideoPlayer from './components/video-player';
import Course from './components/course';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleToggleSideMenu = this.handleToggleSideMenu.bind(this);

    this.state = { hide: false };
  }

  render() {
    return (
      <Router>
        <Header toggleSideMenu={this.handleToggleSideMenu} />
        <div className="body">
          <SideMenu hide={this.state.hide} />
          <main>
            <Switch>
              <Route exact path="/watch" component={VideoPlayer} />
              <Route exact path="/course" component={Course} />
              <Route render={() => <Redirect to="/course" />} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }

  handleToggleSideMenu() {
    this.setState(() => ({
      hide: !this.state.hide,
    }));
  }
}

export default App;
