import React, { Component } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      isLoading: false,
      error: null,
    };
    this.handleClickOnOrder = this.handleClickOnOrder.bind(this);
  }

  async componentWillMount() {
    this.setState({ isLoading: true });

    try {
      const result = await axios.get(
        'https://screensell-back.herokuapp.com/order/',
        {
          headers: { sessiontoken: localStorage.getItem('sessiontoken') },
        }
      );
      this.setState({
        orders: result.data,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        error,
        isLoading: false,
      });
    }
  }

  handleClickOnOrder(id) {
    let newPath = `/orden/${id}`;
    window.location.href = newPath;
  }

  render() {
    const { orders, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Cargando productos...</p>;
    }
    return (
      <div className="page-division">
        <Sidebar />
        <div className="page-content mt-3 px-4">
          <h2 className="page-title">ORDENES</h2>
          <div className="container mt-3">
            <table className="table table-hover px-3">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellidos</th>
                  <th scope="col">Status</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    id={order.id}
                    onClick={() => this.handleClickOnOrder(order.id)}
                  >
                    <th scope="row">{order.id}</th>
                    <td>{order.user.firstName}</td>
                    <td>{order.user.lastName}</td>
                    <td>{order.status}</td>
                    <td>{order.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Orders;
