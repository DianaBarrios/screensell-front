import React, { Component } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import Searchbar from "./Searchbar";
import Table from "./Table";
import NotAuthorized from "./NotAuthorized";
const columns = [
  {
    Header: "ID",
    accessor: "id"
  },
  {
    Header: "Nombre",
    accessor: "name",
    // Use our custom `fuzzyText` filter on this column
    filter: "fuzzyText"
  },
  {
    Header: "Inventario",
    accessor: "stock"
  },
  {
    Header: "Precio",
    accessor: "price"
  },
  {
    Header: "Tipo",
    accessor: "type",
    // Use our custom `fuzzyText` filter on this column
    filter: "fuzzyText"
  },
  {
    Header: "Modelo",
    accessor: "model",
    // Use our custom `fuzzyText` filter on this column
    filter: "fuzzyText"
  },
  {
    Header: "Descripcion",
    accessor: "description",
    // Use our custom `fuzzyText` filter on this column
    filter: "fuzzyText"
  }
];

const rowInfo = rowobject => {
  console.log(rowobject.original);
  let id = rowobject.original.id;
  let newPath = `/producto/${id}`;
  window.location.href = newPath;
};
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      isLoading: false,
      error: null,
      query: "",
      select: "",
      user: ""
    };
  }

  async componentWillMount() {
    this.setState({ isLoading: true });

    await axios
      .get("https://screensell-back.herokuapp.com/user/validate", {
        headers: { sessiontoken: localStorage.getItem("sessiontoken") }
      })
      .then(result => {
        this.setState({ user: result.data.type });
      })
      .catch(err => {
        console.log(err);
      });

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

  render() {
    const { products, isLoading, error, user } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Cargando productos...</p>;
    }

    if (user != "admin") {
      return <NotAuthorized />;
    }

    return (
      <div className="row">
        <div className="col-lg-2">
          <Sidebar user={user} />
        </div>

        <div className="page-content col-lg-10 px-4">
          <h2 className="page-title">PRODUCTOS</h2>

          <div className="row d-flex justify-content-end mx-3 my-4">
            <a href="/producto/nuevo" className="btn btn-primary">
              Agregar producto
            </a>
          </div>

          <div className="container mt-3">
            <Table rowInfo={rowInfo} columns={columns} data={products} />
          </div>
        </div>
      </div>
    );
  }
}

export default Product;

/*
 handleClickOnProduct(id) {
    let newPath = `/producto/${id}`;
    window.location.href = newPath;
  }




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
*/
