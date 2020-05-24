import React, { Component } from 'react';
import logo from './logo-ss.png';
import './App.css';
import axios from 'axios';
import {
  Route,
  BrowserRouter,
  Switch,
  NavLink,
  HashRouter,
} from 'react-router-dom';
import Topbar from './components/Topbar';
import Home from './components/Home';
import Store from './components/Store';
import Contact from './components/Contact';
import Cart from './components/Cart';
import Orders from './components/Orders';
import Products from './components/Products';
import Footer from './components/Footer';
import CreateProduct from './components/CreateProduct';
import CreateUser from './components/CreateUser';
import Login from './components/Login';
import UpdateProduct from './components/UpdateProduct';
import AddProductCart from './components/AddProductCart';
import FileUpload from './components/FileUpload';
import User from './components/User';
import { connect } from 'react-redux';
import { initProducts } from './scripts/cartReducer';

class App extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    let products_ = [];

    try {
      products_ = await axios.get(
        `https://screensell-back.herokuapp.com/product`
      );
      this.props.initProducts(products_.data);
    } catch (error) {}
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Topbar />
          <div className="content">
            <Route exact path="/" component={Home} />
            <Route exact path="/tienda" component={Store} />
            <Route exact path="/ver/:productId" component={AddProductCart} />
            <Route exact path="/contacto" component={Contact} />
            <Route exact path="/carrito" component={Cart} />
            <Route exact path="/ordenes" component={Orders} />
            <Route exact path="/productos" component={Products} />
            <Route exact path="/producto/nuevo" component={CreateProduct} />
            <Route
              exact
              path="/producto/:productId"
              component={UpdateProduct}
            />
            <Route exact path="/files" component={FileUpload} />
            <Route exact path="/usuario/nuevo" component={CreateUser} />
            <Route exact path="/usuario/login" component={Login} />
            <Route exact path="/usuario" component={User} />
          </div>

          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initProducts: (products) => {
      dispatch(initProducts(products));
    },
  };
};

export default connect(null, mapDispatchToProps)(App);
