import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <>
     <nav className="navbar navbar-expand-lg  sticky-top background-black">
        <Link className="navbar-brand white newstime" to="/">NewsTime</Link>
        <button className="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon "></span>
        </button>

        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/business">Business</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/general">General</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/entertainment">Entertainment</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/sports">Sports</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/health">Health</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/technology">Technology</Link>
            </li>
          </ul>
        </div>
      </nav>
      </>
    );
  }
}
