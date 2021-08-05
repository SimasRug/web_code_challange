import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Products } from './components/main/products';
import { Product } from './components/product/product';



export class Router extends React.Component {
    render() {
        return (
          <BrowserRouter>
              <Route exact path='/' component={Products}/>
              <Route path='/product/:id' component={Product}/>
              {/* TODO look into this. React state update on an unmounted component.*/}
              {/*<Redirect to='/'/>*/}
          </BrowserRouter>
        );
    }
}