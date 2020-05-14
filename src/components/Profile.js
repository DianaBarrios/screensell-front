import React, { Component } from "react";
import Sidebar from './Sidebar';
import './Profile.css'
 
class Profile extends Component {
  render() {
    return (
      <div className="page-division">
        <Sidebar/>
        <div className="page-content">
            <h2>MI PERFIL</h2>
            <p>Aqui podras seguir tus ordenes y productos.</p>
        </div>
      </div>
    );
  }
}
 
export default Profile;