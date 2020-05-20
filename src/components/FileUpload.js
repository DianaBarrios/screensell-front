import React, { Component } from "react";
import axios from "axios";

class FileUpload extends Component {
  constructor() {
    super();
    this.state = {
      file: null
    };
  }

  submitFile = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.file[0]);
    axios
      .post("https://screensell-back.herokuapp.com/aws/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleFileUpload = event => {
    this.setState({ file: event.target.files });
  };

  render() {
    return (
      <form onSubmit={this.submitFile}>
        <input
          label="Imagen"
          type="file"
          onChange={this.handleFileUpload}
        />
        <button type="submit" className="btn btn-outline-secondary">Agregar</button>
      </form>
    );
  }
}

export default FileUpload;
