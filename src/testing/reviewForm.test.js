import {ReviewFrom} from '../components/product/reviewForm/reiviewForm';
import {shallow} from 'enzyme';
import React from "react";
import apiService from "../services/apiService";

describe('reviewForm tests', () => {

    let component;

    beforeEach(() => {
        component = shallow(<ReviewFrom id="HI334" />);
    })


    afterEach(() => {
        component.unmount();
    })

    test('Snapshot test', () => {
        expect(component).toMatchSnapshot();
    })

    test('SHOULD render a review-button', () => {
        expect(component.find('button.review-button').text()).toContain('Write a review');
    })

    test('SHOULD render review from WHEN .review-button is clicked', () => {
        const button = component.find('button.review-button');
        button.simulate('click');

        expect(component.find('form').exists()).toBeTruthy();
    })

    test('SHOULD set state key/value WHEN handleChange has been triggered', () => {
        component.instance().handleChange({target: {name:'review', value: 'some message'}});
        expect(component.state('review')).toEqual('some message');
    })

    test('SHOULD set state values WHEN handleSubmit is triggered', async() => {
        const spyApiService = jest.spyOn(apiService, 'postReview').mockResolvedValue({error: true, message: 'Something went wrong please try again' });
        await component.instance().handleSubmit({
            preventDefault: jest.fn(),
        });
        expect(spyApiService).toHaveBeenCalled();
        expect(component.state('error')).toBeTruthy();
        expect(component.state('message')).toEqual('Something went wrong please try again');
        expect(component.state('reviewDone')).toBeTruthy();
    })

    test('SHOULD return html with error WHEN showReviewFrom is triggered', () => {
        //TODO most likely not the best practice, look for alternatives
        component.instance().setState({ reviewDone: true, error: true, message: 'Some error'});
        const subReturn = component.instance().showReviewFrom();
        const element = shallow(subReturn);
        expect(element.find('h2').text()).toBe('<ImCross /> Some error');

    })

    test('SHOULD return html with success message WHEN showReviewFrom is triggered', () => {
        //TODO most likely not the best practice, look for alternatives
        component.instance().setState({ reviewDone: true, error: false});
        const subReturn = component.instance().showReviewFrom();
        const element = shallow(subReturn);
        expect(element.find('h2').text()).toBe('<TiTick /> Thanks for your review. ;) ');

    })
})