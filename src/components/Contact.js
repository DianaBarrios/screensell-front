import React, { Component } from "react";
import "./Contact.css";
import Map from "./Map";
import { Link } from "react-router-dom";
class Contact extends Component {
  render() {
    return (
      <div className="main">
        <h2>Contacto</h2>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div id="contact-form" className="container mt-5">
                <h4>
                  Tienes preguntas? <small> Escríbenos </small>
                </h4>
                <form>
                  <div className="form-group">
                    <input
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
                    ></textarea>
                  </div>

                  <button
                    className="btn btn-primary send-button"
                    id="submit"
                    type="submit"
                    value="SEND"
                  >
                    <a href="mailto:dianabarriosmacias@gmail.com?Subject=Contacto%20Screensell">
                      <i className="fa fa-paper-plane mr-2"></i>
                      <span id="send-text">ENVIAR</span>
                    </a>
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
