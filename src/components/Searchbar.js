import React, { Component } from "react";
import axios from "axios";
import "./Searchbar.css";
import { Switch, NavLink, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import Store from "./Store";

class Searchbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      products: [],
      isLoading: false
    };
    this.onChangeTerm = this.onChangeTerm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  resetComponent = () =>
    this.setState({ isLoading: false, products: [], query: "" });

  onChangeTerm(e) {
    this.setState({ query: e.target.value });
  }

  async onSubmit(e) {
    e.preventDefault();

    this.setState({ isLoading: true });

    let q = this.state.query;

    try {
      const result = await axios.get(
        `https://screensell-back.herokuapp.com/product/getResult/${q}`
      );
      this.setState({
        products: result.data,
        isLoading: false
      });
      this.props.history.push({
        pathname: "/tienda",
        state: { products: this.state.products }
      });
      window.location.reload();
      this.resetComponent();
    } catch (error) {
      this.setState({
        error,
        isLoading: false
      });
    }
  }

  render() {
    return (
      <div className="bar">
        <form onSubmit={this.onSubmit}>
          <input
            type="search"
            className="searchbar"
            placeholder="Buscar productos..."
            value={this.state.query}
            onChange={this.onChangeTerm}
          />
          <button type="submit" id="search-btn" onClick={this.onSubmit}>
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(Searchbar);
