import {render} from '@testing-library/react';
import {ProductCard} from '../components/main/product-card/productCard';

describe('Testing productCard component', () => {
    const props = {
        imgUrl: 'someUrl',
        description: 'description',
        name: 'name',
        currency:'$',
        price: '10'
    }
    let component;

    beforeEach(() => {
        component = render(<ProductCard {...props}/>);
    })

    test('Snapshot test', () => {
        expect(component).toMatchSnapshot();
    })

   test('SHOULD check if img has correct attributes WHEN component gets rendered', () => {
       const img = component.getByTestId('image');
       expect(img).toHaveAttribute('src', props.imgUrl);
       expect(img).toHaveAttribute('alt', props.description);
   })

    test('SHOULD check if price and currency has correct data WHEN component gets rendered', () => {
        const price = component.getByTestId('price');
        expect(price.textContent).toBe(`${props.currency}${props.price}`)
    })

    test('SHOULD check if name has correct data WHEN component gets rendered', () => {
        const name = component.getByTestId('name');
        expect(name.textContent).toBe(`${props.name}`)
    })

    test('SHOULD check if name has description data WHEN component gets rendered', () => {
        const description = component.getByTestId('description');
        expect(description.textContent).toBe(`${props.description}`)
    })

});