import React from 'react';
import './productCard.css';


export class ProductCard extends React.Component {
    render() {
        const { imgUrl, description, name, currency, price } = this.props
        return (
            <div className='product-card'>
                <div className='img-price-container'>
                    <span className='price'> {currency}{price} </span>
                    <img src={imgUrl} alt={description}/>
                </div>
                <span className='name'> {name} </span>
                <span className='description'> {description} </span>
            </div>
        )
    }
}