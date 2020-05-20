import React, { Component } from "react";
import "./Topbar.css";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";

class Topbar extends Component {
  render() {
    return (
      <div className="nav-topbar">
        <Searchbar />
        <Navbar />
      </div>
    );
  }
}

export default Topbar;
