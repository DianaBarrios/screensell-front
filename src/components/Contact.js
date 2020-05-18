import React, { Component } from "react";
 import './Contact.css'
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
                      <input type="text" class="form-control" placeholder="Nombre"/>
                    </div>

                    <div class="form-group">
                      <input type="email" class="form-control" placeholder="Correo electrónico" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>

                    <div class="form-group">
                      <textarea class="form-control" placeholder="Mensaje..." id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
              
                    <button class="btn btn-primary send-button" id="submit" type="submit" value="SEND">
                      <div class="button">
                        <i class="fa fa-paper-plane"></i><span class="send-text">ENVIAR</span>
                      </div>
                    </button>
                  </form>
              </div>
            </div>
          
          <div class="col">
            <div id="contact-info" className="container">
              <ul class="contact-list">
                <li class="list-item"><i class="fa fa-map-marker fa-2x"><span class="contact-text place">Tijuana | Baja California</span></i></li>
                <li class="list-item"><i class="fa fa-phone fa-2x"><span class="contact-text phone"><a href="tel:1-212-555-5555" title="Give me a call">(664) 309-5119</a></span></i></li>
                <li class="list-item"><i class="fa fa-envelope fa-2x"><span class="contact-text gmail"><a href="mailto:#" title="Send me an email">screensell@gmail.com</a></span></i></li>
              </ul>
            </div> 
          </div>
        </div>
      </div>
      </div>
    );
  }
}
 
export default Contact;