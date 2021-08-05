async function getProducts() {
    return await get(process.env.REACT_APP_BASE_PRODUCT_URL);
}

async function getProduct(id) {
    return await get(`${process.env.REACT_APP_BASE_PRODUCT_URL}/${id}`)
}

async function getReviews(id) {
    return await get(`${process.env.REACT_APP_BASE_REVIEW_URL}/${id}`)

}

async function postReview(productId, rating, text) {
    const body = JSON.stringify({
        productId,
        rating,
        locale: 'en-US,en;q=0.9,ru;q=0.8,en-GB;q=0.7,nl;q=0.6,lt;q=0.5',
        text,
    });

    // TODO Gives a 201 but does not work properly when called maybe a cors thing
    return await fetch(`${process.env.REACT_APP_BASE_REVIEW_URL}/${productId}`, {
        method: 'POST',
        body: body,
    })
        .then(val => {
            if (val.status === 201) {
                return {error: false, message: 'success'}
            }
            return {error: true, message: 'Something went wrong please try again'}
        })

}

function get(url) {
    return fetch(url)
        .then(res => res.json())
        .then(res => res)
        .catch(e => ({error: true, message: e}));
}

module.exports = {
    getProducts,
    getProduct,
    getReviews,
    postReview,
    get
}