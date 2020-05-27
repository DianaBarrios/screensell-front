import React, { Component } from 'react';
import FileUpload from './FileUpload';

class NotAuthorized extends Component {
  render() {
    return (
      <div>
        <h1>401</h1>
        <h1>OOPS! No estas autorizado para ver esta página. </h1>
      </div>
    );
  }
}

export default NotAuthorized;
