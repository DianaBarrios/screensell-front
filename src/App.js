import React, { Component } from "react";
import logo from "./logo-ss.png";
import "./App.css";
import {
  Route,
  BrowserRouter,
  Switch,
  NavLink,
  HashRouter
} from "react-router-dom";
import Topbar from "./components/Topbar";
import Home from "./components/Home";
import Store from "./components/Store";
import Contact from "./components/Contact";
import Profile from "./components/Profile";
<<<<<<< Updated upstream
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Products from "./components/Products";
import Footer from "./components/Footer";
import CreateProduct from "./components/CreateProduct";
import FileUpload from "./components/FileUpload";
import UpdateProduct from "./components/UpdateProduct";
=======
import Cart from './components/Cart';
import Orders from './components/Orders'
import Products from './components/Products'
import Footer from './components/Footer';
import CreateProduct from './components/CreateProduct'
import CreateUser from './components/CreateUser'
import Login from './components/Login'
>>>>>>> Stashed changes

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("https://screensell-back.herokuapp.com/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Topbar />
          <div className="content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/tienda" component={Store} />
              <Route path="/contacto" component={Contact} />
              <Route path="/perfil" component={Profile} />
              <Route path="/carrito" component={Cart} />
              <Route path="/ordenes" component={Orders} />
              <Route path="/productos" component={Products} />
              <Route path="/producto/nuevo" component={CreateProduct} />
              <Route path="/producto/:productId" component={UpdateProduct} />
              <Route path="/files" component={FileUpload} />
              <Route path="/usuario/nuevo" component={CreateUser} />
              <Route path="/usuario/login" component={Login} />
            </Switch>
          </div>

          <Footer />
        </div>

      </BrowserRouter>
    );
  }

}

export default App;
