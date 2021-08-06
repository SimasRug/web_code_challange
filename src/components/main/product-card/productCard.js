import React from 'react';
import './productCard.css';


export class ProductCard extends React.Component {
    render() {
        const { imgUrl, description, name, currency, price } = this.props
        return (
            <div className='product-card'>
                <div className='img-price-container'>
                    <span data-testid='price' className='price'>{currency}{price}</span>
                    <img data-testid='image' src={imgUrl} alt={description}/>
                </div>
                <span  data-testid='name' className='name'>{name}</span>
                <span data-testid='description' className='description'>{description}</span>
            </div>
        )
    }
}