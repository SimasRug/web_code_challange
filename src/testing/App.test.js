import { render } from '@testing-library/react';
import App from '../App';
import store from '../redux/store';
import {Provider} from 'react-redux';

describe('Testing App component', () => {

  let component;

  beforeEach(() => {
    component = render(<Provider store={store}> <App /> </Provider>);
  })

  test('Snapshot test', () => {
    expect(component).toMatchSnapshot();
  })

})