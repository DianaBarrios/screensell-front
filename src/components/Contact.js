import React, { Component } from 'react';
import './Contact.css';
import Map from './Map';
class Contact extends Component {
  render() {
    return (
      <div className="main">
        <h2>Contacto</h2>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div id="contact-form" className="container">
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre"
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Correo electrónico"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>

                  <div className="form-group">
                    <textarea
                      className="form-control"
                      placeholder="Mensaje..."
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                  </div>

                  <button
                    className="btn btn-primary send-button"
                    id="submit"
                    type="submit"
                    value="SEND"
                  >
                    <div className="button">
                      <i className="fa fa-paper-plane"></i>
                      <span className="send-text">ENVIAR</span>
                    </div>
                  </button>
                </form>
              </div>
            </div>
            <Map></Map>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
