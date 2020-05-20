import React, { Component } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      isLoading: false,
      error: null
    };
    this.handleClickOnProduct = this.handleClickOnProduct.bind(this);
  }

  async componentWillMount() {
    this.setState({ isLoading: true });

    try {
      const result = await axios.get(
        "https://screensell-back.herokuapp.com/product/"
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
        <div className="page-content mt-3">
          <h2 className="page-title">PRODUCTOS</h2>

          <div className="row d-flex justify-content-end">
            <a href="/producto/nuevo" className="btn btn-primary mr-5">
              Agregar producto
            </a>
          </div>

          <div className="container mt-3">
            <table className="table table-hover px-3">
              <thead>
                <tr>
                  <th scope="col"></th>
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
                {products.map(product => (
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
