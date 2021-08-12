import {ADD_ITEM, REMOVE_ITEM, CHANGE_AMOUNT} from './actionTypes';

export const addItem = item => ({
    type: ADD_ITEM,
    payload: {
        item
    }
});

export const removeItem = id => ({
    type: REMOVE_ITEM,
    payload: {
        id
    }
});

export const changeAmount = (amount, id) => ({
    type: CHANGE_AMOUNT,
    payload: {
        id,
        amount
    }
});
