import React, { Component } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import Table from './Table';

const columns = [
  {
    Header: "ID",
    accessor: "id"
  },
  {
    Header: "Fecha",
    accessor: "time",
    // Use our custom `fuzzyText` filter on this column
    filter: "fuzzyText"
  },
  {
    Header: "Status",
    accessor: "status"
  },
  {
    Header: "Total",
    accessor: "totalPrice"
  },
  {
    Header: "Nombre",
    accessor: "user.firstName",
    // Use our custom `fuzzyText` filter on this column
    filter: "fuzzyText"
  },
  {
    Header: "Apellidos",
    accessor: "user.lastName",
    // Use our custom `fuzzyText` filter on this column
    filter: "fuzzyText"
  }
];

const rowInfo = (rowobject) => {
  console.log(rowobject.original);
  let id = rowobject.original.id;
  let newPath = `/orden/${id}`;
  window.location.href = newPath;
}
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
            <Table rowInfo={rowInfo} columns={columns} data={orders} />
          </div>
        </div>
      </div>
    );
  }
}

export default Orders;
