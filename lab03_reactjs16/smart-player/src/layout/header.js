import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import './header.css';

class Header extends Component {
  constructor(props, context) {
    super(props, context);
    this.clickMenuButton = this.clickMenuButton.bind(this);
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <a className="navbar-brand" onClick={this.clickMenuButton}>
          <span className="mr-2">FSD Course Center</span>
          <FontAwesomeIcon icon={faBars} />
        </a>
        <div>
          <FontAwesomeIcon icon={faUser} />
          uniquejava
        </div>
      </nav>
    );
  }

  clickMenuButton() {}
}

export default Header;
