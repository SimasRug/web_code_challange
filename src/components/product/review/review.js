import React from 'react';
import './review.css'
import ReactStars from 'react-rating-stars-component';


export class Review extends React.Component {
    render() {
        const {rating, text} = this.props;
        return (
            <div className='singe-review'>
                <ReactStars value={rating} size={50} color={'#eaeaea'} activeColor={'black'} edit={false}/>
                <p data-testid='review-text'>{text}</p>
            </div>
        );
    }
}