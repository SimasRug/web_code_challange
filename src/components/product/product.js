import React from 'react';
import apiService from '../../services/apiService';
import {ReviewFrom} from './reviewForm/reiviewForm';
import {Review} from './review/review';
import {Link} from 'react-router-dom';
import './product.css';
import {TiChevronLeft} from 'react-icons/ti'
import {Spinner} from '../spinner/spinner';

export class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            error: false,
            reviews: [],
            isLoading: true,
        };


    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        const product = await apiService.getProduct(id);
        const reviews = await apiService.getReviews(id);
        this.setState({
            isLoading: false,
            error: product.error || false,
            product: !product.error ? product : {},
            // this filter is only to get rid of the empty submission values
            reviews: !reviews.error ? reviews.filter(product => product.text) : []
        });

    }

    showReviews() {

        if (this.state.reviews.length) {
            return this.state.reviews.map((val, index) => (
                <Review key={index} {...val} />
            ));
        }
    }


    render() {
        const {error, isLoading, product: {imgUrl, description, name, currency, price}} = this.state;

        if (error) {
            return (<h1>Error happened please try again later</h1>)
        }

        if (isLoading) {
            return (<Spinner/>)
        }

        return (
            <div className='container'>
                <div className='link'>
                    <TiChevronLeft/>
                    <Link to='/'> Back</Link>
                </div>
                <div className='item-container'>
                    <img src={imgUrl} alt={description}/>
                    <div className='product-info'>
                        <div className='product-name'>{name}</div>
                        <div className='product-price'>{currency}{price}</div>
                        <p className='product-description'>{description}</p>
                    </div>
                </div>
                <ReviewFrom id={this.props.match.params.id}/>
                <div className='customer-reviews'>
                    {this.showReviews()}
                </div>
            </div>
        )
    }
}