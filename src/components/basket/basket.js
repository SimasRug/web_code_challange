import React from 'react';
import {connect} from 'react-redux';
import {removeItem, changeAmount} from '../../redux/actions';
import './basket.css';

class Basket extends React.Component {

    remove(val) {
        this.props.removeItem(val);
    }

    total() {
        const total = this.props.items.map(({price, amount}) => price * amount).reduce((acc, cur) => acc + cur);
        return (<span>{this.props.items[0].currency}{total}</span>)
    }

    optionValue(amount) {
        const amountArr = Array.from(
            {length: amount},
            (item, index) => item = index + 1
        );

        return amountArr.map((val) => <option value={val} key={val}>{val}</option>)
    }

    selectAmount({target: {value}}, id) {
        const selectedAmount = parseInt(value);
        this.props.changeAmount(selectedAmount, id);
    }


    render() {
        if (!this.props.items.length) {
            return (<h1>Your basket is empty</h1>)
        }
        return (
            <div className='basket-container'>
                <h1>Your Basket</h1>
                <div className='items-container'>
                    <div className='shopping-items'>
                        {
                            this.props.items.map(({name, id, price, currency, imgUrl, amount}, index) =>
                                (
                                    <div key={id + index} className='basket-item'>
                                        <img src={imgUrl} alt={name}/>
                                        <div className='basket-item-info'>
                                            <span>{name}</span>
                                            <span>{currency}{price}</span>
                                            {/*TODO need to style this*/}
                                            {amount !== 1 ? <span>
                                                Amount:
                                                <select value={amount} onChange={(e) => this.selectAmount(e, id)}>
                                                    {this.optionValue(amount)}
                                                </select>
                                            </span> : null}
                                            <button className='remove-item-btn' onClick={() => this.remove(id)}>Remove
                                            </button>
                                        </div>
                                    </div>
                                )
                            )
                        }
                    </div>
                    <div>
                        <h1>Your total: {this.total()}</h1>
                        <button className='pay-btn'>Pay</button>
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

export default connect(mapStateToProps, {removeItem, changeAmount})(Basket);