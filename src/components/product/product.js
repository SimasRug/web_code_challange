import React from 'react';
import {getProduct, getReviews, postReview} from "../../services/apiService";

export class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            error: false,
            reviews: [],
            rating: 0,
            review: '',
            reviewSub: { reviewDone: false, error: false, message: '' }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        const product = await getProduct(id);
        const reviews = await getReviews(id)
        this.setState({
            error: product.error || false,
            product: !product.error ? product : {},
            reviews
        });

    }

    async handleSubmit(event) {
        event.preventDefault();
        const post = await postReview(this.props.match.params.id, this.state.rating, this.state.review);
        this.setState( {reviewSub: { reviewDone: true, error: post.error, message: post.message }});
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    showReviews() {
        return this.state.reviews.map((val, index) => (<div key={index}>{val.text}</div>))
    }

    showReviewFrom() {
        const {rating, review, reviewSub: { reviewDone, error, message } } = this.state;
        if(!reviewDone) {
            return (
                <form onSubmit={this.handleSubmit}>
                <label>
                    Rating:
                    <input type="number" min="0" max="5" name="rating" value={rating} onChange={this.handleChange} />
                </label>
                <label>
                    Name:
                    <textarea value={review} name="review" onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form> );
        }
        if(reviewDone && error) {
            return (<h2>{message}</h2>)
        }
        if(reviewDone && !error) {
            return (<h2> Thanks for your review. ;) </h2>)
        }
    }

    render() {
        const {error} = this.state;
        if (error) {
            return (<h1>Error happened please try again later</h1>)
        }
        const {product: {imgUrl, description, name, currency, price} } = this.state;
        return (
            <div>
                <img src={imgUrl} alt={description}/>
                <h1>{name}</h1>
                <h2>{currency}{price}</h2>
                <h3>{description}</h3>
                <div>
                    {this.showReviewFrom()}
                </div>
                <div>
                    {this.showReviews()}
                </div>
            </div>
        )
    }
}