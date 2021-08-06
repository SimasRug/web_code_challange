import {render} from '@testing-library/react';
import {Spinner} from "../components/spinner/spinner";

describe('Testing Spinner component', () => {

    let component;


    beforeEach(() => {
        component = render(<Spinner/>)
    })

    test('Snapshot test', () => {
        expect(component).toMatchSnapshot();
    })
})