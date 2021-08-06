import { render } from '@testing-library/react';
import App from '../App';

describe('Testing App component', () => {

  let component;

  beforeEach(() => {
    component = render(<App/>);
  })

  test('Snapshot test', () => {
    expect(component).toMatchSnapshot();
  })

})