import React from 'react';
import {ProductCard} from './product-card/product-card';
import {getProducts} from '../../services/apiService';
import './products.css';
import {Link} from 'react-router-dom';
import {Spinner} from '../spinner/spinner';

export class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            error: false,
            searchTerm: '',
            isLoading: true,
        };
    }

    async componentDidMount() {
        const products = await getProducts();
        this.setState({
            error: products.error || false,
            data: !products.error ? products.filter(product => product.id) : [],
            isLoading: false
        });

    }

    render() {
        const {data, error, searchTerm, isLoading} = this.state;

        if (error) {
            return (<h1>Error happened please try again later</h1>)
        }
        if(isLoading) {
            return (<Spinner/>)
        }
        // Kinda useless filter considering every product is called 'product', but works if it has proper naming
        const products = data.filter(data => (searchTerm === '' ||  data.name.includes(searchTerm)))
            .map((data, index) =>
            // need index because some id's are the same
            <Link to={`/product/${data.id}`} key={data.id + index} >
                <ProductCard {...data} />
            </Link>
    )
        return (<div>
            <input className='search-field' type='text' placeholder='Search for product' onChange={({target: {value}}) => {
                this.setState({ searchTerm: value })
            }}/>
            <div className="element-wrapper">{products}</div>
        </div>)
    }

}