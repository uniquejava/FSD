import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus, faVideo } from '@fortawesome/free-solid-svg-icons';
import './sidemenu.css';

class SideMenu extends Component {
  render() {
    return (
      <nav>
        <ul role="menubar" className={`menu ${this.props.hide ? 'hide' : ''}`}>
          <NavLink to="/course" activeClassName="active">
            <li className="menu-item">
              <FontAwesomeIcon icon={faFolderPlus} />
              <span>Add Video</span>
            </li>
          </NavLink>

          <NavLink to="/watch" activeClassName="active">
            <li className="menu-item">
              <FontAwesomeIcon icon={faVideo} />
              <span>Watch Video</span>
            </li>
          </NavLink>
        </ul>
      </nav>
    );
  }
}

export default SideMenu;
