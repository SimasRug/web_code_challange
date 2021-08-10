import Product from '../components/product/product';
import {shallow} from 'enzyme';
import apiService from '../services/apiService';
import store from '../redux/store';

// TODO, broken after adding state,
describe('Testing product component', () => {
    let component;

    beforeEach(() => {
        component = shallow(<Product store={store} {...{match: {params: {id: 'HI334'}}}}/>,
            {disableLifecycleMethods: true}).shallow();
    })

    afterEach(() => {
        component.unmount();
    })

    test('Snapshot test', () => {
        expect(component).toMatchSnapshot();
    })

    test('SHOULD render a spinner before api call has been made', () => {
        expect(component.find('Spinner').exists()).toBeTruthy();
    })

    test('SHOULD render h1 with error WHEN getProduct returns error value', (done) => {
        const spyDidMount = jest.spyOn(component.instance(), 'componentDidMount');
        const spyApiServiceProduct = jest.spyOn(apiService, 'getProduct').mockResolvedValue({
            error: true,
            message: 'some err'
        });
        const spyApiServiceReview = jest.spyOn(apiService, 'getReviews').mockResolvedValue({
            error: true,
            message: 'some err'
        });

        const didMount = component.instance().componentDidMount();

        expect(spyDidMount).toHaveBeenCalled();
        expect(spyApiServiceProduct).toHaveBeenCalledWith('HI334');
        didMount.then(() => {
            component.update();
            expect(component.find('h1').text()).toContain('Error happened please try again later');
            spyDidMount.mockRestore();
            spyApiServiceProduct.mockRestore();
            spyApiServiceReview.mockRestore();
            done();
        })
    })

    test('SHOULD render product container with reviews WHEN getProduct returns product data', (done) => {
        const spyDidMount = jest.spyOn(component.instance(), 'componentDidMount');
        const product = {
            currency: '$',
            price: 39,
            id: 'HI334',
            name: 'product',
            description: 'description',
            imgUrl: 'https://assets.adidas.com/images/w_320,h_320,f_auto,q_auto:sensitive,fl_lossy/c93fa315d2f64775ac1fab96016f09d1_9366/Dame_6_Shoes_Black_FV8624_01_standard.jpg'
        };
        const reviews =
            [{
                productId: 'HI334',
                locale: 'en-US,en;q=0.9,ru;q=0.8,en-GB;q=0.7,nl;q=0.6,lt;q=0.5',
                rating: 0,
                text: 'string'
            }]

        const spyApiServiceProduct = jest.spyOn(apiService, 'getProduct').mockResolvedValue(product);
        const spyApiServiceReview = jest.spyOn(apiService, 'getReviews').mockResolvedValue(reviews);

        const didMount = component.instance().componentDidMount();

        expect(spyDidMount).toHaveBeenCalled();
        expect(spyApiServiceProduct).toHaveBeenCalledWith('HI334');
        didMount.then(() => {
            component.update();
            expect(component.find('div.item-container').exists()).toBeTruthy();
            expect(component.find('div.customer-reviews').exists()).toBeTruthy();
            spyDidMount.mockRestore();
            spyApiServiceProduct.mockRestore();
            spyApiServiceReview.mockRestore();
            done();
        })
    })

})