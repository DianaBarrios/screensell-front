import React, { Component } from "react";
import "./Searchbar.css";

class Searchbar extends Component {
  render() {
    return (
      <div>
        <input type="search" className="searchbar" placeholder="Buscar..." onChange={this.props.search} />
      </div>
    );
  }
}

export default Searchbar;
