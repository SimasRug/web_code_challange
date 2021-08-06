import {render} from '@testing-library/react';
import {Review} from '../components/product/review/review';

describe('Testing Review component', () => {
    const props = {
        rating: 5,
        text: 'ok'
    }
    let component;

    beforeEach(() => {
        component = render(<Review {...props}/>);
    })

    // TODO look into this ReactStars always has a unique class
    // test('Snapshot test', () => {
    //     expect(component).toMatchSnapshot();
    // })

    test('SHOULD check if review text has correct data WHEN component gets rendered', () => {
        const a = component.getByTestId('review-text')
        expect(a.textContent).toBe(props.text);
    })

});