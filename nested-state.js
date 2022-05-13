const redux = require('redux');
const produce = require('immer').produce;

const initialState = {
    name: 'John',
    address: {
        street: '123 Main St',
        city: 'Boston',
        state: 'MA',
    },
};

const UPDATE_STREET = 'UPDATE_STREET';

const updateStreet = (street) => {
    return {
        type: UPDATE_STREET,
        payload: street,
    };
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_STREET:
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload,
            //     },
            // };
            return produce(state, (draft) => {
                draft.address.street = action.payload;
            });
        
        default: return state
    }
};

const store = redux.createStore(reducer);

console.log('Initial State: ', store.getState());

const unsubscribe = store.subscribe(() => console.log('Updated State: ', store.getState()));

store.dispatch(updateStreet('124 Main St'));

unsubscribe();