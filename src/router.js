import React from 'react';
import {Route, BrowserRouter, Redirect, Switch} from 'react-router-dom';
import { Products } from './components/main/products';
import { Product } from './components/product/product';



export class Router extends React.Component {
    render() {
        return (
          <BrowserRouter>
              <Switch>
                  <Route exact path='/' component={Products}/>
                  <Route path='/product/:id' component={Product}/>
                  <Redirect to='/'/>
              </Switch>
          </BrowserRouter>
        );
    }
}