// src/components/Layout.js
import React from 'react';
import { Link } from 'react-router';
import Map from './Map.js';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
        <header>
        </header>
        <div className="app-content">{this.props.children}</div>
        <Map />
        <footer>
          <p>
            Anything you want.
          </p>
        </footer>
      </div>
    );
  }
}
