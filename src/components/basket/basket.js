import React from 'react';
import {connect} from 'react-redux';
import {addItem, removeItem} from '../../redux/actions';
import './basket.css';

class Basket extends React.Component {

    remove(val) {
        this.props.removeItem(val);
    }

    total() {
        const total = this.props.items.map(({price}) => price).reduce((acc, cur) => acc + cur);
        return (<span>{this.props.items[0].currency}{total}</span>)
    }


    render() {
        if(!this.props.items.length) {
            return (<h1>Your basket is empty</h1>)
        }
        return (
            <div className='basket-container'>
                <h1>Your Basket</h1>
                <div className='items-container'>
                    <div className='shopping-items'>
                        {
                            this.props.items.map(({name, id, price, currency, imgUrl}, index) =>
                                (
                                    <div key={id + index} className='basket-item'>
                                        <img src={imgUrl} alt={name}/>
                                        <div className='basket-item-info'>
                                            <span>{name}</span>
                                            <span>{currency}{price}</span>
                                            <button className='remove-item-btn' onClick={() => this.remove(id)}>Remove</button>
                                        </div>
                                    </div>
                                )
                            )
                        }
                    </div>
                    <div>
                        <h1>Your total: {this.total()}</h1>
                        <button className='pay-btn' >Pay</button>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        items: state.basketReducer.items,
    }
}

export default connect(mapStateToProps, {addItem, removeItem})(Basket);