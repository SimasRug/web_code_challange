import React from 'react';
import {Route, BrowserRouter, Redirect, Switch} from 'react-router-dom';
import {Products} from './components/main/products';
import Product from './components/product/product';
import Navbar from "./components/navBar/navbar";
import Basket from "./components/basket/basket";



export class Router extends React.Component {
    render() {
        return (
          <BrowserRouter>
             <Navbar/>
              <Switch>
                  <Route exact path='/' component={Products}/>
                  <Route path='/product/:id' component={Product}/>
                  <Route path='/basket' component={Basket}/>
                  <Redirect to='/'/>
              </Switch>
          </BrowserRouter>
        );
    }
}