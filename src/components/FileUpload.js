import React, { Component } from "react";
import axios from "axios";

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      fileURL: "../placeholder.png"
    };
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  submitFile(aux) {
    //event.preventDefault();
    const formData = new FormData();
    formData.append("file", aux);
    axios
      .post("https://screensell-back.herokuapp.com/aws/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        console.log(response.data.data.Location);
        this.props.onImgLink(response.data.data.Location);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleFileUpload = event => {
    document.getElementById("ningun-archivo").hidden = true;
    this.setState({
      file: event.target.files,
      fileURL: URL.createObjectURL(event.target.files[0])
    });

    let aux = event.target.files[0];

    this.submitFile(aux);
  };

  render() {
    return (
      <form onSubmit={this.submitFile}>
          <div className="form-group">
            <p>Imagen del producto:</p>
            <label className="fileContainer">
              Seleccionar archivo
              <input
                type="file"
                name="imagen"
                className="inputfile"
                value={this.props.img}
                onChange={this.handleFileUpload}
              />
            </label>
            <small id="ningun-archivo">Ningún archivo seleccionado</small>
          </div>
      </form>
    );
  }
}

export default FileUpload;

/*
<button type="submit" className="btn btn-outline-secondary">
  Agregar
</button>
*/
