import {ADD_ITEM, REMOVE_ITEM} from '../actionTypes';

const initialState = {
    items: []
};

export function basketReducer (state = initialState, action) {
    switch (action.type) {
        case ADD_ITEM: {
            const { item } = action.payload;
            return {
                ...state,
                items: [...state.items, item]
            }
        }
        case REMOVE_ITEM: {
            const { id } = action.payload;
           const items = state.items.filter(item => item.id !== id);
            return {
                ...state,
                items
            }
        }
        default:
            return state;
    }
}