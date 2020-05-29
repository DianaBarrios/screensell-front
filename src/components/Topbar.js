import React, { Component } from "react";
import "./Topbar.css";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";

class Topbar extends Component {
  render() {
    return (
      <div className="nav-topbar">
        <div className="row">
          <div className="col-md-2">
          <span>
            <img src="https://screensell-bucket.s3.amazonaws.com/image.png" width="40"/>
          </span>SCREENSELL
          </div>
          <div className="col-md-10">
            <Searchbar />
          </div>
        </div>

        <Navbar />
      </div>
    );
  }
}

export default Topbar;
