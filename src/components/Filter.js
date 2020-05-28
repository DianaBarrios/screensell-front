import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Filter.css";

class Filter extends Component {
  render() {
    return (
      <div className="filterbar">
        <form>
            <label>Filtros</label>
        </form>
      </div>
    );
  }
}

export default Filter;
