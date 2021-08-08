import {Products} from '../components/main/products';
import {shallow} from 'enzyme';
import apiService from '../services/apiService';


describe('Testing products component', () => {

    let component;

    beforeEach(() => {
       component = shallow(<Products/>, {disableLifecycleMethods: true});
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

    test('SHOULD render h1 with error WHEN getProducts returns error value',  (done) => {
        const spyDidMount = jest.spyOn(Products.prototype, 'componentDidMount');
        const spyApiService = jest.spyOn(apiService, 'getProducts').mockResolvedValue({error: true, data: []});

        const didMount = component.instance().componentDidMount();

        expect(spyDidMount).toHaveBeenCalled();
        expect(spyApiService).toHaveBeenCalled();
        didMount.then(() => {
            component.update();
            expect(component.find('h1').text()).toContain('Error happened please try again later');
            spyDidMount.mockRestore();
            spyApiService.mockRestore();
            done();
        })
    })

    test('SHOULD render list of products WHEN getProducts is called', (done) => {
        const spyDidMount = jest.spyOn(Products.prototype, 'componentDidMount');
        const apiData = [{
            currency: "$",
            description: "description",
            id: "HI333",
            imgUrl: "https://assets.adidas.com/images/w_320,h_320,f_auto,q_auto:sensitive,fl_lossy/c7099422ccc14e44b406abec00ba6c96_9366/NMD_R1_V2_Shoes_Black_FY6862_01_standard.jpg",
            name: "product",
            price: 3
        }]
        const spyApiService = jest.spyOn(apiService, 'getProducts').mockResolvedValue(apiData);

        const didMount = component.instance().componentDidMount();

        expect(spyDidMount).toHaveBeenCalled();
        expect(spyApiService).toHaveBeenCalled();

        didMount.then(() => {
            component.update();
            expect(component.find('div.element-wrapper').exists()).toBeTruthy();
            spyDidMount.mockRestore();
            spyApiService.mockRestore();
            done();
        })
    })
})