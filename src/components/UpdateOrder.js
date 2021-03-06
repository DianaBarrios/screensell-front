import React, { Component } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import NotAuthorized from "./NotAuthorized";

class UpdateOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      time: "",
      user: "",
      status: "",
      products: [],
      totalPrice: "",
      isLoading: false,
      error: null,
      typeUser: "",
      message: "",
      statusBeforeUpdate: ""
    };
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  async componentWillMount() {
    const id = this.props.match.params.orderId;

    this.setState({ isLoading: true });

    await axios
      .get("https://screensell-back.herokuapp.com/user/validate", {
        headers: { sessiontoken: localStorage.getItem("sessiontoken") }
      })
      .then(async result => {
        this.setState({ typeUser: result.data.type });
        await axios
          .get(`https://screensell-back.herokuapp.com/order/${id}`, {
            headers: { sessiontoken: localStorage.getItem("sessiontoken") }
          })
          .then(res => {
            let data = res.data[0];
            console.log(data);
            this.setState({
              id: data.id,
              time: data.time,
              status: data.status,
              statusBeforeUpdate: data.status,
              user: data.user,
              products: data.products,
              totalPrice: data.totalPrice,
              isLoading: false
            });
          })
          .catch(error => {
            this.setState({
              error,
              isLoading: false
            });
          });
      });
  }
  sendEmail(status) {
    let mail = {
      to: this.state.user.email,
      subject: "Cambio de estado del pedio de pedido - Screensell",
      text:
        `¡Hola ${this.state.user.firstName}!` +
        "\n Te informamos que el status actual de tu orden " +
        this.state.id +
        `. \n La orden esta:  ${status}` +
        "\n Para más información ingresa a nuestro sitio web. \n Que tengas un buen día, \n Screensell"
    };
    axios
      .post("https://screensell-back.herokuapp.com/mail", mail)
      .then(result => {
        console.log("Email mandado!");
      })
      .catch(err => {
        console.log(err);
      });
  }

  onChangeStatus(e) {
    this.setState({ status: e.target.value });
  }

  async handleUpdate(e) {
    e.preventDefault();

    if (this.state.statusBeforeUpdate != this.state.status) {
      this.sendEmail(this.state.status);
    }
    const id = this.props.match.params.orderId;

    console.log(this.state.status);

    const orderObj = {
      id: this.state.id,
      time: this.state.time,
      products: this.state.products,
      user: this.state.name,
      status: this.state.status,
      totalPrice: Number(this.state.price)
    };

    this.setState({ isLoading: true });
    await axios
      .get("https://screensell-back.herokuapp.com/user/validate", {
        headers: { sessiontoken: localStorage.getItem("sessiontoken") }
      })
      .then(async result => {
        await axios
          .patch(
            `https://screensell-back.herokuapp.com/order/${id}`,
            orderObj,
            {
              headers: { sessiontoken: localStorage.getItem("sessiontoken") }
            }
          )
          .then(res => {
            console.log(res.data);
            this.setState({
              isLoading: false
            });
            this.props.history.push("/ordenes");
          })
          .catch(error => {
            console.log(error);
            this.setState({
              error,
              isLoading: false
            });
          });
      });
  }

  render() {
    const { isLoading, error, typeUser } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return (
        <div className="page-content">
          <p>Cargando...</p>
        </div>
      );
    }

    if (typeUser == "user") {
      return (
        <div className="row">
          <div className="col-lg-2">
            <Sidebar user={typeUser} />
          </div>

          <div className="page-content col-lg-10 px-4">
            <h2 className="page-title">VER ORDEN</h2>

            <div className="row d-flex justify-content-between page-btns-container mx-3 mt-4">
              <a href="/ordenes" className="btn btn-outline-dark">
                Regresar
              </a>
            </div>

            <div className="container mt-3">
              <form onSubmit={this.handleUpdate} id="update-order-form">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="form-group">
                      <label>ID:</label>
                      <input
                        id="orderId"
                        name="id"
                        type="text"
                        className="form-control"
                        value={this.state.id}
                        readOnly
                      />
                    </div>

                    <div className="row">
                      <div className="col-sm-6 form-group">
                        <label>Fecha:</label>
                        <input
                          id="date"
                          name="fecha"
                          type="text"
                          className="form-control"
                          value={this.state.time}
                          readOnly
                        />
                      </div>

                      <div className="col-sm-6 form-group">
                        <label>Precio Total:</label>
                        <input
                          id="total"
                          name="total"
                          type="text"
                          className="form-control"
                          value={this.state.totalPrice}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-6 form-group">
                        <label>Nombre:</label>
                        <input
                          id="firstName"
                          name="nombres"
                          type="text"
                          className="form-control"
                          value={this.state.user.firstName}
                          readOnly
                        />
                      </div>

                      <div className="col-sm-6 form-group">
                        <label>Apellidos:</label>
                        <input
                          id="lastName"
                          name="apellidos"
                          type="text"
                          className="form-control"
                          value={this.state.user.lastName}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-6 form-group">
                        <label>Email:</label>
                        <input
                          id="email"
                          name="email"
                          type="text"
                          className="form-control"
                          value={this.state.user.email}
                          readOnly
                        />
                      </div>

                      <div className="col-sm-6 form-group">
                        <label>Celular:</label>
                        <input
                          id="celular"
                          name="celular"
                          type="text"
                          className="form-control"
                          value={this.state.user.cellphone}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Dirección:</label>
                      <input
                        id="direccion"
                        name="direccion"
                        type="text"
                        className="form-control"
                        value={this.state.user.address}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <label>Productos:</label>
                      <ol>
                        {this.state.products.map((product, index) => (
                          <li> {product}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="row">
        <div className="col-lg-2">
          <Sidebar />
        </div>

        <div className="page-content col-lg-10 px-4">
          <h2 className="page-title">ACTUALIZAR ORDEN</h2>

          <div className="row d-flex justify-content-between page-btns-container mx-3 mt-4">
            <a href="/ordenes" className="btn btn-outline-dark">
              Regresar
            </a>
            <button
              type="submit"
              value="Update Product"
              className="btn btn-primary"
              onClick={this.handleUpdate}
            >
              Guardar
            </button>
          </div>

          <div className="container mt-3">
            <form id="update-order-form">
              <div className="row">
                <div className="col-md-8">
                  <div className="form-group">
                    <label>ID:</label>
                    <input
                      id="orderId"
                      name="id"
                      type="text"
                      className="form-control"
                      value={this.state.id}
                      readOnly
                    />
                  </div>

                  <div className="row">
                    <div className="col-sm-6 form-group">
                      <label>Fecha:</label>
                      <input
                        id="date"
                        name="fecha"
                        type="text"
                        className="form-control"
                        value={this.state.time}
                        readOnly
                      />
                    </div>

                    <div className="col-sm-6 form-group">
                      <label>Precio Total:</label>
                      <input
                        id="total"
                        name="total"
                        type="text"
                        className="form-control"
                        value={this.state.totalPrice}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-6 form-group">
                      <label>Nombre:</label>
                      <input
                        id="firstName"
                        name="nombres"
                        type="text"
                        className="form-control"
                        value={this.state.user.firstName}
                        readOnly
                      />
                    </div>

                    <div className="col-sm-6 form-group">
                      <label>Apellidos:</label>
                      <input
                        id="lastName"
                        name="apellidos"
                        type="text"
                        className="form-control"
                        value={this.state.user.lastName}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-6 form-group">
                      <label>Email:</label>
                      <input
                        id="email"
                        name="email"
                        type="text"
                        className="form-control"
                        value={this.state.user.email}
                        readOnly
                      />
                    </div>

                    <div className="col-sm-6 form-group">
                      <label>Celular:</label>
                      <input
                        id="celular"
                        name="celular"
                        type="text"
                        className="form-control"
                        value={this.state.user.cellphone}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Dirección:</label>
                    <input
                      id="direccion"
                      name="direccion"
                      type="text"
                      className="form-control"
                      value={this.state.user.address}
                      readOnly
                    />
                  </div>

                  <div className="form-group">
                    <label>Productos:</label>
                    <ol>
                      {this.state.products.map((product, index) => (
                        <li> {product}</li>
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Status:</label>
                    <select
                      id="status"
                      name="status"
                      type="text"
                      className="form-control"
                      value={this.state.status}
                      onChange={this.onChangeStatus}
                      required
                    >
                      <option value="Nueva">Nueva</option>
                      <option value="En proceso">En proceso</option>
                      <option value="Enviada">Enviada</option>
                      <option value="Recibida">Recibida</option>
                      <option value="Cancelada">Cancelada</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateOrder;
