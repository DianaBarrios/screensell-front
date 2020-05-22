import React, { Component } from "react";
import "./Contact.css";
class Contact extends Component {
  render() {
    return (
      <div className="main">
        <h2>TIENES PREGUNTAS?</h2>
        <div className="container">
          <div className="row">
            <div class="col-md-6">
              <div id="contact-form" className="container">
                <form>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Nombre"
                    />
                  </div>

                  <div class="form-group">
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Correo electrónico"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>

                  <div class="form-group">
                    <textarea
                      class="form-control"
                      placeholder="Mensaje..."
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                  </div>

                  <button
                    class="btn btn-primary send-button"
                    id="submit"
                    type="submit"
                    value="SEND"
                  >
                    <div class="button">
                      <i class="fa fa-paper-plane"></i>
                      <span class="send-text">ENVIAR</span>
                    </div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
