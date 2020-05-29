import React, { Component } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import Table from './Table';
import NotAuthorized from "./NotAuthorized";
import { Link } from 'react-router-dom';


const columnsAdmin = [
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
const columnsUser = [
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
      user: '',
      login: false,
      userid: ''
    };
  }

  async componentWillMount() {
    this.setState({ isLoading: true });

    await axios
      .get('https://screensell-back.herokuapp.com/user/validate', {
        headers: { sessiontoken: localStorage.getItem('sessiontoken') },
      })
      .then((result) => {
        this.setState({ user: result.data.type, userid: result.data.id });
      })
      .catch((err) => {
        this.setState({ login: true });
      });

    if (this.state.user == 'admin') {
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
    } else {
      try {
        const result = await axios.get(
          'https://screensell-back.herokuapp.com/order/byUser/' + this.state.userid,
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
  }

  render() {
    const { orders, isLoading, error, user, login } = this.state;
    if (login) {
      return <div>
        <p>Necesitas iniciar sesión para poder acceder a las ordenes.</p>
        <Link as={Link} className="btn btn-outline-dark" to={'/usuario/login'}>
          <div>Inicia sesión</div>
        </Link>
      </div>
    }


    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Cargando productos...</p>;
    }

    if (user == 'user') {
      return (
        <div className="page-division">
          <Sidebar user={user} />

          <div className="page-content mt-3 px-4">
            <h2 className="page-title">ORDENES</h2>

            <div className="container mt-3">
              <Table rowInfo={rowInfo} columns={columnsUser} data={orders} />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="page-division">
        <Sidebar user={user} />

        <div className="page-content mt-3 px-4">
          <h2 className="page-title">ORDENES</h2>

          <div className="container mt-3">
            <Table rowInfo={rowInfo} columns={columnsAdmin} data={orders} />
          </div>
        </div>
      </div>
    );
  }
}

export default Orders;
