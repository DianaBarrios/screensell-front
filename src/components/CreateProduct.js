import React, { Component } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

class CreateProduct extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeModel = this.onChangeModel.bind(this);
        this.onChangeType= this.onChangeType.bind(this);
        this.onChangeStock = this.onChangeStock.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = { 
            name: '',
            description: '',
            model: '',
            type: '',
            stock: ''
        }
    }

    onChangeName(e) {
        this.setState({ name: e.target.value })
    }

    onChangeDescription(e) {
        this.setState({ description: e.target.value })
    }

    onChangeModel(e) {
        this.setState({ model: e.target.value })
    }

    onChangeType(e) {
        this.setState({ type: e.target.value })
    }

    onChangePrice(e) {
        this.setState({ price: e.target.value })
    }

    onChangeStock(e) {
        this.setState({ stock: e.target.value })
    }

    onSubmit(e){
        e.preventDefault()

        const productObj = {
            name: this.state.name,
            description: this.state.description,
            model: this.state.model,
            type: this.state.type,
            stock: Number(this.state.stock),
            price: Number(this.state.price)
        };

        axios.post('https://screensell-back.herokuapp.com/product/newProduct', productObj)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });

        this.setState({ 
            name: '',
            description: '',
            model: '',
            type: '',
            stock: '',
            price: ''
        })
    }
  
    render(){
        return(
            <div className="page-division">
                <Sidebar/>
                <div>
                    <h2>AGREGAR PRODUCTO</h2>
                    <button>Agregar producto</button>
                    <div>
                    <form onSubmit={this.onSubmit} className="create-product-form">
                        <div className="form-group">
                            <label>
                            Nombre:
                            </label>
                            <input id="nombre" type="text" className="form-control" value={this.state.name} onChange={this.onChangeName}/>
                        </div>
                
                        <div className="form-group">
                            <label>
                            Descripcion:
                            </label>
                            <input id="descripcion" type="text" className="form-control" value={this.state.description} onChange={this.onChangeDescription}/>
                        </div>
                
                        <div className="form-group">
                            <label>
                            Modelo:
                            </label>
                            <input id="modelo" type="text" className="form-control" value={this.state.model} onChange={this.onChangeModel}/>
                        </div>
                
                        <div className="form-group">
                            <label>
                            Tipo:
                            </label>
                            <input id="tipo" type="text" className="form-control" value={this.state.type} onChange={this.onChangeType}/>
                        </div>
                        <div className="form-group">
                            <label>
                            Precio:
                            </label>
                            <input id="precio" type="text" className="form-control" value={this.state.price} onChange={this.onChangePrice}/>
                        </div>
                
                        <div className="form-group">
                            <label>
                            Inventario:
                            </label>
                            <input id="inventario" type="text" className="form-control" value={this.state.stock} onChange={this.onChangeStock}/>
                        </div>
                        <button type="submit" value="Create Product">
                            Guardar
                        </button>
                    </form>
                    </div>
                </div>
            </div>
        )
        
    }
}

export default CreateProduct;
