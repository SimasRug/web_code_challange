import React from 'react';

export class ProductCard extends React.Component {
    render() {
        const { imgUrl, description, name, currency, price } = this.props
        return (
            <div>
                <img src={imgUrl} alt={description}/>
                <h1> {name} </h1>
                <h2> {description} </h2>
                <h3> {currency}{price} </h3>
            </div>
        )
    }
}