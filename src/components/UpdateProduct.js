import React, { Component } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import FileUpload from './FileUpload';

class UpdateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      description: '',
      model: '',
      type: '',
      price: '',
      stock: '',
      img: '',
      isLoading: false,
      error: null,
    };
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeModel = this.onChangeModel.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeStock = this.onChangeStock.bind(this);
    this.handleImg = this.handleImg.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentWillMount() {
    const id = this.props.match.params.productId;

    this.setState({ isLoading: true });

    try {
      const result = await axios.get(
        `https://screensell-back.herokuapp.com/product/getid/${id}`
      );
      this.setState({
        id: result.data.id,
        name: result.data.name,
        description: result.data.description,
        model: result.data.model,
        type: result.data.type,
        price: result.data.price,
        stock: result.data.stock,
        img: result.data.img,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        error,
        isLoading: false,
      });
    }
  }

  onChangeName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeDescription(e) {
    this.setState({ description: e.target.value });
  }

  onChangeModel(e) {
    this.setState({ model: e.target.value });
  }

  onChangeType(e) {
    this.setState({ type: e.target.value });
  }

  onChangePrice(e) {
    this.setState({ price: e.target.value });
  }

  onChangeStock(e) {
    this.setState({ stock: e.target.value });
  }

  handleImg = (imgLink) => {
    console.log('inside parent', imgLink);
    this.setState({
      img: imgLink,
    });
  };

  async handleUpdate(e) {
    e.preventDefault();

    const id = this.props.match.params.productId;
    //console.log(id)

    const productObj = {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      model: this.state.model,
      type: this.state.type,
      img: this.state.img,
      stock: Number(this.state.stock),
      price: Number(this.state.price),
    };

    this.setState({ isLoading: true });
    await axios
      .get('https://screensell-back.herokuapp.com/user/validate', {
        headers: { sessiontoken: localStorage.getItem('sessiontoken') },
      })
      .then(async (result) => {
        await axios
          .patch(
            `https://screensell-back.herokuapp.com/product/${id}`,
            productObj,
            {
              headers: { sessiontoken: localStorage.getItem('sessiontoken') },
            }
          )
          .then((res) => {
            console.log(res.data);
            this.setState({
              isLoading: false,
            });
            this.props.history.push('/productos');
          })
          .catch((error) => {
            console.log(error);
            this.setState({
              error,
              isLoading: false,
            });
          });
      });
  }

  async handleDelete(e) {
    const id = this.props.match.params.productId;
    this.setState({ isLoading: true });
    await axios
      .get('https://screensell-back.herokuapp.com/user/validate', {
        headers: { sessiontoken: localStorage.getItem('sessiontoken') },
      })
      .then(async (result) => {
        await axios
          .delete(`https://screensell-back.herokuapp.com/product/${id}`, {
            headers: { sessiontoken: localStorage.getItem('sessiontoken') },
          })
          .then((res) => {
            console.log(res.data);
            this.setState({
              isLoading: false,
            });
            this.props.history.push('/productos');
          })
          .catch((error) => {
            console.log(error);
            this.setState({
              error,
              isLoading: false,
            });
          });
      });
  }

  render() {
    const { isLoading, error } = this.state;

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
          <h2 className="page-title">PRODUCTO</h2>

          <div className="row d-flex justify-content-end">
            <a href="/productos" className="btn btn-outline-dark mr-5">
              Regresar
            </a>
          </div>

          <div className="container">
            <form onSubmit={this.handleUpdate} id="create-product-form">
              <div className="row">
                <div className="col-lg-8">
                  <div className="form-group">
                    <label>Nombre:</label>
                    <input
                      id="productName"
                      name="nombre"
                      type="text"
                      className="form-control"
                      placeholder=""
                      value={this.state.name}
                      onChange={this.onChangeName}
                    />
                  </div>

                  <div className="form-group">
                    <label>Descripcion:</label>
                    <textarea
                      id="productDescription"
                      name="descripcion"
                      className="form-control"
                      placeholder=""
                      rows="4"
                      value={this.state.description}
                      onChange={this.onChangeDescription}
                    />
                  </div>
                  <div className="row">
                    <div className="col-lg-5">
                      <FileUpload  onImgLink={this.handleImg}/>
                    </div>
                    <div className="col-lg-5 img-preview">
                      <img src={this.state.img} />
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="form-group">
                    <label>Modelo:</label>
                    <input
                      id="productModel"
                      name="modelo"
                      type="text"
                      placeholder="por ej: IP7"
                      className="form-control"
                      value={this.state.model}
                      onChange={this.onChangeModel}
                    />
                  </div>

                  <div className="form-group">
                    <label>Tipo:</label>
                    <input
                      id="productType"
                      name="tipo"
                      type="text"
                      placeholder="por ej. LCD"
                      className="form-control"
                      value={this.state.type}
                      onChange={this.onChangeType}
                    />
                  </div>

                  <div className="form-group">
                    <label>Precio:</label>
                    <input
                      id="productPrice"
                      name="precio"
                      type="text"
                      placeholder="$ 0.00"
                      className="form-control"
                      value={this.state.price}
                      onChange={this.onChangePrice}
                    />
                  </div>

                  <div className="form-group">
                    <label>Inventario:</label>
                    <input
                      id="productStock"
                      name="inventario"
                      type="text"
                      placeholder="Cantidad"
                      className="form-control"
                      value={this.state.stock}
                      onChange={this.onChangeStock}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <button
                  value="Delete Product"
                  className="btn btn-danger mr-3"
                  onClick={this.handleDelete}
                >
                  Eliminar
                </button>
                <button
                  type="submit"
                  value="Update Product"
                  className="btn btn-primary"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateProduct;
