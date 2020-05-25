import React, { Component } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import Searchbar from './Searchbar';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      isLoading: false,
      error: null,
<<<<<<< HEAD
=======
      query: "",
      select: ""
>>>>>>> added search in products
    };
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSelectInput = this.handleSelectInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClickOnProduct = this.handleClickOnProduct.bind(this);
  }

  async componentWillMount() {
    this.setState({ isLoading: true });

    try {
      const result = await axios.get(
        'https://screensell-back.herokuapp.com/product/'
      );
      this.setState({
        products: result.data,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        error,
        isLoading: false,
      });
    }
  }

  handleSearchInput(e) {
    this.setState({ query: e.target.value });
  }

  handleSelectInput(e){
    this.setState({ select: e.target.value });
  }

async handleSearch(e) {
    e.preventDefault();
    let option = this.refs.searchOption.value;
    let q = this.state.query;
    console.log("query:",q);
    console.log("option:",option);

    if(option == "nombre"){
     /* /:name */
     this.setState({ isLoading: true });

    try {
      const result = await axios.get(
        `https://screensell-back.herokuapp.com/product/${q}`
      );
      this.setState({
        products: result.data,
        isLoading: false
      });
    } catch (error) {
      this.setState({
        error,
        isLoading: false
      });
    }
      
    } else {
      /* /getid/:id */
    this.setState({ isLoading: true });

    try {
      const result = await axios.get(
        `https://screensell-back.herokuapp.com/product/getid/${q}`
      );
      this.setState({
        products: [result.data],
        isLoading: false
      });
    } catch (error) {
      this.setState({
        error,
        isLoading: false
      });
    }
    
  }
}

  handleClickOnProduct(id) {
    let newPath = `/producto/${id}`;
    window.location.href = newPath;
  }

  render() {
    const { products, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Cargando productos...</p>;
    }

    return (
      <div className="page-division">
        <Sidebar />
        <div className="page-content mt-3 px-4">
          <h2 className="page-title">PRODUCTOS</h2>

          <div className="row d-flex justify-content-end mx-3 my-4">
            <a href="/producto/nuevo" className="btn btn-primary">
              Agregar producto
            </a>
          </div>

          <form id="search-product-form" className="form-inline my-2 my-lg-0">
            <input
              id="search-input"
              type="search"
              value={this.state.query}
              onChange={this.handleSearchInput}
              placeholder="Buscar por nombre o id"
            />
            <select 
              id="search-select"
              ref="searchOption"
              value={this.state.select}
              onChange={this.handleSelectInput} 
            >
              <option value="nombre">Nombre</option>
              <option value="id">ID</option>
            </select>

            <button id="search-btn" type="submit" onClick={this.handleSearch}>
              Buscar
            </button>
          </form>

          <div className="container mt-3">
            <table className="table table-hover px-3">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Inventario</th>
                  <th scope="col">Modelo</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Descripcion</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    id={product.id}
                    onClick={() => this.handleClickOnProduct(product.id)}
                  >
                    <th scope="row">{product.id}</th>
                    <td key="p">{product.name}</td>
                    <td>{product.stock}</td>
                    <td>{product.model}</td>
                    <td>{product.price}</td>
                    <td>{product.type}</td>
                    <td>{product.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
