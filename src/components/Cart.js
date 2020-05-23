import React, { Component } from 'react';
import axios from 'axios';
import './AddProductCart.css';
import { FaTrashAlt } from 'react-icons/fa';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
    this.deleteElement = this.deleteElement.bind(this);
    this.editElement = this.editElement.bind(this);
    this.onChangeQty = this.onChangeQty.bind(this);
    this.gotoCheckout = this.gotoCheckout.bind(this);
  }

  async componentWillMount() {
    this.setState({
      isLoading: true,
    });
    let productos = JSON.parse(localStorage.getItem('cart'));

    productos.forEach(async (producto) => {
      try {
        const result = await axios.get(
          `https://screensell-back.herokuapp.com/product/getid/${producto.product}`
        );
        let resultado = {
          name: result.data.name,
          qty: producto.qty,
          description: result.data.description,
          price: result.data.price,
          img: result.data.img,
        };
        this.state.products.push(resultado);
      } catch (error) {
        this.setState({
          error,
          isLoading: false,
        });
      }
    });
    this.setState({
      isLoading: false,
    });
  }

  onChangeQty(e) {
    console.log(e.target.value);
    this.componentWillMount();
  }
  gotoCheckout() {
    this.props.history.push('/checkout');
  }
  editElement(id) {
    let productos = JSON.parse(localStorage.getItem('cart'));
    const index = productos.findIndex((x) => x.product === id);
    console.log(index);
  }
  deleteElement(id) {
    let productos = JSON.parse(localStorage.getItem('cart'));
    const index = productos.findIndex((x) => x.product === id);
    if (index !== undefined) productos.splice(index, 1);
    window.localStorage.setItem('cart', JSON.stringify(productos));
    window.location.reload();
  }

  render() {
    const { isLoading, error, products } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Cargando productos...</p>;
    }

    return (
      <div>
        <table className="table table-hover px-3">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Modelo</th>
              <th scope="col">Precio</th>
              <th scope="col">Tipo</th>
              <th scope="col">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} id={product.id}>
                <td key="p">{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>
                  <select
                    id="qty"
                    value={product.qty}
                    onChange={this.onChangeQty}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => this.deleteElement(product.id)}>
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn" onClick={this.gotoCheckout}>
          Go to checkout
        </button>
      </div>
    );
  }
}

export default Cart;
