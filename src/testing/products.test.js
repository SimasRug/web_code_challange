import {render} from '@testing-library/react';
import {Products} from '../components/main/products';


describe('Testing products component', () => {

    let component;

    beforeEach(() => {
       component = render(<Products/>);
    })

    test('Snapshot test', () => {
        expect(component).toMatchSnapshot();
    })
})