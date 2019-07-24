import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import './header.css';

class Header extends Component {
  render() {
    return (
      <header className="navbar">
        <button
          className="btn btn-link navbar-brand"
          onClick={this.props.toggleSideMenu}
        >
          <span className="mr-2">FSD Course Center</span>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div>
          <FontAwesomeIcon icon={faUser} />
          uniquejava
        </div>
      </header>
    );
  }
}

export default Header;
