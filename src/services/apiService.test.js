import apiService from './apiService';

describe('Api tests', () => {

    test('SHOULD return a resolved value WHEN get is triggered', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve({data: 'ok'})
            })
        );
        const getValue = await apiService.get('url');
        expect(getValue).toStrictEqual({data: 'ok'});
    })

    test('SHOULD return a rejected value WHEN get is triggered', async () => {
        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.reject('Something went wrong')
        );
        const getValue = await apiService.get('url');
        expect(getValue).toStrictEqual({error: true, message: 'Something went wrong'});
    })

    test('SHOULD return positive value WHEN postReview is triggered', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
                status: 201,
            })
        );

        const postValue = await apiService.postReview('123', 5, 'good review');
        expect(postValue).toStrictEqual({error: false, message: 'success'});
    })

    test('SHOULD return negative value WHEN postReview is triggered', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
                status: 401,
            })
        );

        const postValue = await apiService.postReview('123', 5, 'good review');
        expect(postValue).toStrictEqual({error: true, message: 'Something went wrong please try again'});
    })


    test('SHOULD return products WHEN getProducts is triggered', async () => {
        jest.spyOn(apiService, 'get').mockResolvedValue({data: 'ok'});

        const a = await apiService.getProducts();
        expect(a).toStrictEqual({data: 'ok'});

    })

    test('SHOULD return single product WHEN getProduct is triggered', async () => {
        jest.spyOn(apiService, 'get').mockResolvedValue({data: 'ok'});

        const a = await apiService.getProduct('123');
        expect(a).toStrictEqual({data: 'ok'});

    })

    test('SHOULD return reviews product WHEN getReviews is triggered', async () => {
        jest.spyOn(apiService, 'get').mockResolvedValue({data: 'ok'});

        const a = await apiService.getReviews('123');
        expect(a).toStrictEqual({data: 'ok'});

    })

});