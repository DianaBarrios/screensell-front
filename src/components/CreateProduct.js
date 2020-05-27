import React, { Component } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import FileUpload from './FileUpload';

class CreateProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      model: '',
      type: '',
      price: '',
      stock: '',
      img: '../placeholder.png',
    };
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeModel = this.onChangeModel.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeStock = this.onChangeStock.bind(this);
    this.handleImg = this.handleImg.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  onSubmit(e) {
    e.preventDefault();

    const productObj = {
      name: this.state.name,
      description: this.state.description,
      model: this.state.model,
      type: this.state.type,
      stock: Number(this.state.stock),
      price: Number(this.state.price),
      img: this.state.img,
    };

    axios
      .post('https://screensell-back.herokuapp.com/product/new', productObj, {
        headers: { sessiontoken: localStorage.getItem('sessiontoken') },
      })
      .then((res) => {
        console.log(res.data);
        this.props.history.push('/productos');
      })
      .catch((error) => {
        console.log(productObj);
        console.log(error);
      });

    this.setState({
      name: '',
      description: '',
      model: '',
      type: '',
      stock: '',
      price: '',
      img: '',
    });
  }

  render() {
    return (
      <div className="page-division">
        <Sidebar />
        <div className="page-content mt-3 px-4">
          <h2 className="page-title">NUEVO PRODUCTO</h2>

          <div className="row d-flex justify-content-between mx-3">
            <a href="/productos" className="btn btn-outline-dark">
              Regresar
            </a>
            <button
              type="submit"
              value="Create Product"
              className="btn btn-primary"
              onClick={this.onSubmit}
            >
              Agregar
            </button>
          </div>

          <div className="container mt-3">
            <form id="create-product-form">
              <div className="row">
                <div className="col-lg-8">
                  <div className="form-group">
                    <label>Nombre:</label>
                    <input
                      id="nombre"
                      type="text"
                      className="form-control"
                      value={this.state.name}
                      onChange={this.onChangeName}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Descripcion:</label>
                    <textarea
                      id="descripcion"
                      className="form-control"
                      rows="4"
                      value={this.state.description}
                      onChange={this.onChangeDescription}
                      required
                    />
                  </div>

                  <div className="row">
                    <div className="col-lg-6">
                      <FileUpload onImgLink={this.handleImg} />
                    </div>

                    <div className="col-lg-5 img-preview">
                      <img src={this.state.img} alt={this.state.name} />
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="form-group">
                    <label>Modelo:</label>
                    <input
                      id="modelo"
                      type="text"
                      placeholder="por ej: IP7"
                      className="form-control"
                      value={this.state.model}
                      onChange={this.onChangeModel}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Tipo:</label>
                    <input
                      id="tipo"
                      type="text"
                      placeholder="por ej. LCD"
                      className="form-control"
                      value={this.state.type}
                      onChange={this.onChangeType}
                      required
                    />
                  </div>

                  <div className="form-group ">
                    <label>Precio:</label>
                    <input
                      id="precio"
                      type="number"
                      min="0.00" 
                      step="0.01"
                      placeholder="$ 0.00"
                      className="form-control"
                      value={this.state.price}
                      onChange={this.onChangePrice}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Inventario:</label>
                    <input
                      id="inventario"
                      type="number"
                      placeholder="Cantidad"
                      className="form-control"
                      value={this.state.stock}
                      onChange={this.onChangeStock}
                      required
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="row d-flex justify-content-end m-3">
            <button
              type="submit"
              value="Create Product"
              className="btn btn-primary"
              onClick={this.onSubmit}
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateProduct;
