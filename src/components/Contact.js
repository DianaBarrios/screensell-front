import React, { Component } from "react";
import "./Contact.css";
import Map from "./Map";
import { Link } from "react-router-dom";
import axios from "axios";
import { send } from "q";
import { couldStartTrivia } from "typescript";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      name: "",
      email: ""
    };

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeMessage = this.onChangeMessage.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChangeName(e) {
    this.setState({ name: e.target.value });
  }
  onChangeMessage(e) {
    this.setState({ message: e.target.value });
  }
  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    let mail = {
      to: 'aliciacisnerosm@gmail.com',
      subject: 'Contacto en Screensell',
      text: `¡Hola!` + `\n Te informamos que ${this.state.name} dejó un comentario para screensell: \n` +
        this.state.message + " \n Te puedes comunicar con usuario por medio de este correo electrónico: " + this.state.email + "\n ¡Saludos! \n  Alis & Dianix"
    };
    console.log(mail);
    axios
      .post('https://screensell-back.herokuapp.com/mail', mail)
      .then((result) => {
        console.log('Email mandado!');
      })
      .catch((err) => {
        console.log(err);
      });


  }

  render() {

    return (
      <div className="main">
        <h2>Contacto</h2>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div id="contact-form" className="container mt-5">
                <h4>
                  ¿Tienes preguntas? <small> Escríbenos </small>
                </h4>
                <form>
                  <div className="form-group">
                    <input
                      onChange={this.onChangeName}
                      type="text"
                      className="form-control"
                      placeholder="Nombre"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Correo electrónico"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      onChange={this.onChangeEmail}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <textarea
                      className="form-control"
                      placeholder="Mensaje..."
                      id="exampleFormControlTextarea1"
                      rows="3"
                      required
                      onChange={this.onChangeMessage}
                    ></textarea>
                  </div>

                  <button
                    className="btn btn-primary send-button"
                    onClick={this.onSubmit}
                  >
                    <i className="fa fa-paper-plane mr-2"></i>
                    <span id="send-text">ENVIAR</span>

                  </button>
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <div id="contact-info" className="container">
                <ul id="contact-list">
                  <li>
                    <i class="fa fa-envelope" aria-hidden="true"></i>
                    screensellsinaloa@gmail.com
                  </li>
                  <li>
                    <a href="http://www.facebook.com/screensell">@screensell</a>
                  </li>
                  <li>
                    <i class="fa fa-phone" aria-hidden="true"></i>
                    664 638 4869
                  </li>
                  <li>
                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                    Av. C Niños Héroes, COL. CENTRO, 22000 Tijuana, B.C.
                  </li>
                </ul>
                <Map />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
