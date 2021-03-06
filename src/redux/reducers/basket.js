import {ADD_ITEM, REMOVE_ITEM, CHANGE_AMOUNT} from '../actionTypes';

const initialState = {
    items: []
};

export function basketReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ITEM: {
            const {item} = action.payload;
            // TODO Prob best to do this in a side effect or have an extra reducer
            const itemsCopy = [...state.items];
            const itemIndex = itemsCopy.findIndex(({id}) => id === item.id);
            if (itemIndex === -1) {
                return {
                    ...state,
                    items: [...state.items, {...item, amount: 1}]
                }
            }
            itemsCopy[itemIndex].amount++;
            return {
                ...state,
                items: itemsCopy
            }
        }
        case REMOVE_ITEM: {
            const {id} = action.payload;
            const items = state.items.filter(item => item.id !== id);
            return {
                ...state,
                items
            }
        }

        case CHANGE_AMOUNT: {
            const {id, amount} = action.payload;
            const itemsCopy = [...state.items];
            const itemIndex = itemsCopy.findIndex((item) => id === item.id);
            itemsCopy[itemIndex].amount = amount;
            return {
                ...state,
                items: itemsCopy
            }

        }
        default:
            return state;
    }
}