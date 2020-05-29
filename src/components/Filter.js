import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Filter.css";
import Sidebar from './Sidebar'

class Filter extends Component {
  render() {
    return (
      <div className="filterbar">
        <Sidebar />
      </div>
    );
  }
}

export default Filter;
