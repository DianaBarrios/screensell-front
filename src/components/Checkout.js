import React, { Component } from "react";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { connect } from "react-redux";
import axios from "axios";

import FileUpload from "./FileUpload";

class CreateProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      address: "",
      cellphone: "",
      nameCard: "",
      numberCard: "",
      expMonth: "0",
      expYear: "0",
      cvv: "000",
      verifyUpdate: true,
      owns: []
    };
    this.onChangeNumberCard = this.onChangeNumberCard.bind(this);
    this.addProductsToUser = this.addProductsToUser.bind(this);
    this.onChangeNameCard = this.onChangeNameCard.bind(this);
    this.onChangeExpMonth = this.onChangeExpMonth.bind(this);
    this.onChangeExpYear = this.onChangeExpYear.bind(this);
    this.onChangeCvv = this.onChangeCvv.bind(this);
    this.createOrder = this.createOrder.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  onChangeNameCard(e) {
    this.setState({
      nameCard: e.target.value
    });
  }

  onChangeNumberCard(e) {
    this.setState({
      numberCard: e.target.value
    });
  }
  onChangeExpYear(e) {
    this.setState({
      expYear: e.target.value
    });
  }
  onChangeExpMonth(e) {
    this.setState({
      expMonth: e.target.value
    });
  }
  onChangeCvv(e) {
    this.setState({
      cvv: e.target.value
    });
  }
  createOrder() {
    var jsonProducts = this.props.addedItems;
    let product = [];
    let quantity = [];

    for (var i in jsonProducts) {
      product.push(i);
      quantity.push(this.props.addedItems[i].quantity);
    }

    let newOrder = {
      user: this.state.id,
      quantity: quantity,
      products: product
    };

    axios
      .post("https://screensell-back.herokuapp.com/order/new", newOrder, {
        headers: { sessiontoken: localStorage.getItem("sessiontoken") }
      })
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }
  sendEmail() {
    let mail = {
      to: this.state.email,
      subject: "Confirmación de pedido - Screensell",
      text:
        "Gracias por realizar tu pedido. \n ¿Necesitas información adicional? ¡Comunícate con nosotros!."
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

  addProductsToUser() {
    let auxOwns = this.state.owns;
    let aux = [];

    for (let index in this.props.products) {
      let product = this.props.products[index];
      if (this.props.addedItems.hasOwnProperty(product.id)) {
        aux.push(product._id);
      }
    }

    if (auxOwns.length == 0) {
      for (var i in aux) {
        auxOwns.push(aux[i]);
      }
    } else {
      for (var i in aux) {
        var id = auxOwns.indexOf(aux[i]);
        if (id == -1) {
          auxOwns.push(aux[i]);
        }
      }
    }

    this.setState({ owns: auxOwns });
    let newProducts = {
      owns: this.state.owns,
      id: this.state.id
    };

    axios
      .patch(
        `https://screensell-back.herokuapp.com/user/${this.state.id}/owns`,
        newProducts,
        {
          headers: { sessiontoken: localStorage.getItem("sessiontoken") }
        }
      )
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  goHome() {
    this.sendEmail();
    this.addProductsToUser();
    this.createOrder();
    window.localStorage.removeItem("cart");
    this.setState({ verifyUpdate: !this.state.verifyUpdate });
    this.props.history.push("/");
  }

  async componentWillMount() {
    await axios
      .get("https://screensell-back.herokuapp.com/user/validate", {
        headers: { sessiontoken: localStorage.getItem("sessiontoken") }
      })
      .then(async result => {
        this.setState({ typeUser: result.data.type });
        await axios
          .get(`https://screensell-back.herokuapp.com/user/${result.data.id}`, {
            headers: { sessiontoken: localStorage.getItem("sessiontoken") }
          })
          .then(user => {
            this.setState({
              address: user.data.address,
              cellphone: user.data.cellphone,
              email: user.data.email,
              name: `${user.data.firstName} ${user.data.lastName}`,
              id: user.data.id,
              owns: user.data.owns
            });
          });
      })
      .catch(err => {
        console.log(err);
      });
    console.log(this.state.owns);
  }

  onSubmit(e) {
    e.preventDefault();
    this.goHome();

    this.setState({
      name: "",
      email: "",
      address: "",
      cellphone: "",
      nameCard: "",
      numberCard: "",
      expMonth: "0",
      expYear: "0",
      cvv: "000",
      verifyUpdate: true
    });
  }

  getProducts() {
    let components = [];
    let finalPrice = 0;
    for (let index in this.props.products) {
      let product = this.props.products[index];
      if (this.props.addedItems.hasOwnProperty(product.id)) {
        product.qty = this.props.addedItems[product.id].quantity;
        finalPrice += product.qty * product.price;
        components.push(
          <tr key={product.id} id={product.id}>
            <td key="p">{product.name}</td>
            <td>{product.model}</td>
            <td>{product.qty}</td>
            <td>{product.qty * product.price}</td>
          </tr>
        );
      }
    }
    components.push(
      <tr key={123} id={123}>
        <td key="p"></td>
        <td></td>
        <td>Total</td>
        <td>{finalPrice}</td>
      </tr>
    );
    return components;
  }

  render() {
    return (
      <div className="container">
        <h1>Checkout</h1>
        <div className="row mt-4">
          <div className="col-lg-6">
            <div className="address-form mb-5">
              <h4>Dirección de pago</h4>
              <form>
                <div className="form-group row">
                  <label className="col-sm-3">
                    <i class="fa fa-user"></i> Nombre completo
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      id="fname"
                      value={this.state.name}
                      placeholder="John Smith"
                      readOnly
                      disabled
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3">
                    <i class="fa fa-envelope"></i> Email
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      id="fmail"
                      placeholder="john@email.com"
                      value={this.state.email}
                      disabled
                      readOnly
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3">
                    <i class="fa fa-address-card-o"></i> Dirección
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      id="faddress"
                      value={this.state.address}
                      disabled
                      readOnly
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-3">
                    <i class="fa fa-phone"></i> Celular
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      id="fcellphone"
                      value={this.state.cellphone}
                      disabled
                      readOnly
                      className="form-control"
                    />
                  </div>
                </div>
              </form>
            </div>

            <h4>Detalles de la compra</h4>
            <table className="table table-hover px-3">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Modelo</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Precio</th>
                </tr>
              </thead>
              <tbody>{this.getProducts()}</tbody>
            </table>
          </div>

          <div className="col-lg-5 mx-auto">
            <div className="payment-form">
              <h4>Pago</h4>
              <form>
                <div className="form-group row">
                  <label className="col-sm-3">
                    {" "}
                    Tarjeta Aceptadas{" "}
                  </label>
                  <div className="icon-container col-sm-9">
                    <img src="https://screensell-bucket.s3.amazonaws.com/cards1.png" alt="credit-cards"/>                           
                  </div>
                </div>

                <div className="form-group row">
                  <label  className="col-sm-3">
                    Nombre en tarjeta
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      id="cname"
                      onChange={this.onChangeNameCard}
                      placeholder="John M. Doe"
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label for="cnumber" className="col-sm-3">
                    Número de tarjeta
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      id="cnumber"
                      placeholder="4556901963026900"
                      onChange={this.onChangeNumberCard}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col">
                    <label for="cexp">Mes Exp</label>
                    <input
                      type="text"
                      id="cexp"
                      placeholder="10"
                      pattern=".{2,}"
                      title="El mes de expiración es un valor con 2 dígitos"
                      onChange={this.onChangeExpMonth}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="form-group col">
                    <label for="cexpyear">Año Exp</label>
                    <input
                      type="text"
                      id="cexpyear"
                      placeholder="20"
                      pattern=".{2,}"
                      title="El año de expiración es un valor con 2 dígitos"
                      onChange={this.onChangeExpYear}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="form-group col">
                    <label for="cexpyear">CVV</label>
                    <input
                      type="password"
                      id="cexpyear"
                      placeholder="123"
                      pattern=".{3,}"
                      title="El CVV es un valor con 3 dígitos"
                      onChange={this.onChangeCvv}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
              </form>
            </div>

            <button className="btn btn-primary btn-block mx-auto" onClick={this.onSubmit}>
              Pagar
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    products: state.products,
    addedItems: state.addedItems
  };
};

export default connect(
  mapStateToProps,
  null
)(CreateProduct);
