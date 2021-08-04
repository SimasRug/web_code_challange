import React from 'react';
import {ProductCard} from './prodduct-card/product-card';
import {getProducts} from '../../services/apiService';
import './products.css';
import {Link} from "react-router-dom";

export class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            error: false
        };
    }

    async componentDidMount() {
        const products = await getProducts();
        this.setState({
            error: products.error || false,
            data: !products.error ? products.filter(product => product.id) : []
        });
    }

    render() {
        const {data, error} = this.state;

        if (error) {
            return (<h1>Error happened please try again later</h1>)
        }
        // need index because some id's are the same
        const products = data.map((data, index) =>
            <Link to={`/product/${data.id}`} key={data.id + index} >
                <ProductCard {...data} />
            </Link>
    )
        return (<div className="element-wrapper">{products}</div>)
    }

}