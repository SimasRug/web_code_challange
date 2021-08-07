import React from 'react';
import apiService from '../../../services/apiService';
// most likely would crate something like this myself, but time...
import ReactStars from 'react-rating-stars-component/dist/react-stars';
import './reviewForm.css';
import {TiTick} from 'react-icons/ti';
import {ImCross} from 'react-icons/im';


export class ReviewFrom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            reviewDone: false,
            error: false,
            message: '',
            review: '',
            rating: 0,
            writeAReview: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        // TODO rather emit event to parent, then it calls the api. Make this component dumber
        const post = await apiService.postReview(this.props.id, this.state.rating, this.state.review);
        this.setState({reviewDone: true, error: post.error, message: post.message});
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    showReviewFrom() {
        const {rating, review, reviewDone, error, message} = this.state;
        if (!reviewDone) {
            return (
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <ReactStars classNames='stars' count={5} value={rating} size={50} color={'#eaeaea'}
                                    activeColor={'black'}
                                    onChange={(rating) => this.setState({rating})}/>
                    </label>
                    <div className='textarea-wrapper'>
                        <label>
                            <textarea value={review} name="review" required onChange={this.handleChange}/>
                        </label>
                    </div>
                    <input className='submit-button' type="submit" value="Submit"/>
                </form>);
        }
        if (reviewDone && error) {
            return (<h2><ImCross/> {message}</h2>)
        }
        if (reviewDone && !error) {
            return (<h2><TiTick/> Thanks for your review. ;) </h2>)
        }
    }

    render() {
        return (
            <div className='review-container'>
                {
                    this.state.writeAReview ? this.showReviewFrom() :
                        <button className='review-button' onClick={() => this.setState({writeAReview: true})}>
                            Write a review
                        </button>
                }
            </div>
        )
    }
}