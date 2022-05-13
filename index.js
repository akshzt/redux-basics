const redux = require('redux');
const reduxLogger = require('redux-logger');

const createStore = redux.createStore; 
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();
const bindActionCreators = redux.bindActionCreators;

const BUY_CAKE = 'BUY_CAKE';
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const BUY_ICECREAM = 'BUY_ICECREAM';

function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'First redux action'
    };
};

function cakeRestock(qty = 1) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty, 
        info: 'restock cake action'
    };
};

function buyIceCream() {
    return {
        type: BUY_ICECREAM,
        info: 'Second redux action'
    };
};

// (previousState, action) => newState

const initialState = {
    numOfCakes: 10,
    numOfIceCreams: 20
};

const initialCakeState = {
    numOfCakes: 10
};

const initialIceCreamState = {
    numOfIceCreams: 20
};

// const reducer = (state = initialState, action) => {

//     switch(action.type) {
//         case BUY_CAKE: return {
//             ...state,
//             numOfCakes: state.numOfCakes - 1
//         };
//         case BUY_ICECREAM: return {
//             ...state,
//             numOfIceCreams: state.numOfIceCreams - 1
//         };

//         default: return state;
//     }
// };

const cakeReducer = (state = initialCakeState, action) => {

    switch(action.type) {
        case BUY_CAKE: return {
            ...state,
            numOfCakes: state.numOfCakes - 1
        };
        case CAKE_RESTOCKED: return {
            ...state,
            numOfCakes: state.numOfCakes + action.payload
        }

        default: return state;
    }
};

const icecreamReducer = (state = initialIceCreamState, action) => {

    switch(action.type) {
        case BUY_ICECREAM: return {
            ...state,
            numOfIceCreams: state.numOfIceCreams - 1
        };

        default: return state;
    };
};

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: icecreamReducer
});
const store = createStore(rootReducer, applyMiddleware(logger));

console.log('Initial State: ', store.getState());

// const unsubscribe = store.subscribe(() => console.log("Updated State: ", store.getState()));
const unsubscribe = store.subscribe(() => {});

// store.dispatch(buyCake());
// store.dispatch(buyCake());
// store.dispatch(buyCake());

// store.dispatch(cakeRestock());
// store.dispatch(cakeRestock(3));

// store.dispatch(buyIceCream());
// store.dispatch(buyIceCream());

const actions = bindActionCreators({ buyCake, cakeRestock}, store.dispatch);

actions.buyCake();
actions.buyCake();

actions.cakeRestock(2);

unsubscribe();