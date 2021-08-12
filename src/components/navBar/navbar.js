import React from 'react';
import {Link} from 'react-router-dom';
import './navBar.css';
import {AiOutlineShopping} from 'react-icons/ai';
import {connect} from 'react-redux';

class Navbar extends React.Component {

    listLength() {
        if (this.props.itemsAmount.length) {
            const amountSum = this.props.itemsAmount.reduce((acc, cur) => acc + cur);
            return (<span>({amountSum})</span>)
        }
    }

    render() {
        return (
            <div className='nav-bar'>
                <Link to='/'>
                    <img
                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/2560px-Adidas_Logo.svg.png'
                        alt='logo'/>
                </Link>
                <Link to='/basket' className='cart'>
                    <AiOutlineShopping size='40'/>
                    {this.listLength()}
                </Link>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        itemsAmount: state.basketReducer.items.map(({amount}) => amount)
    }
}


export default connect(mapStateToProps)(Navbar);
