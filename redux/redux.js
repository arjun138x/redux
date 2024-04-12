/* REDUX has three important things 1.REDUX STORE 2.ACTION 3.REDUCER */
const { createStore, combineReducers, applyMiddleware } = require("redux");
const logger = require("redux-logger").default;
const BUY_LAPTOP = "BUY_LAPTOP";
const BUY_MOBILE = "BUY_MOBILE";

// redux store
const initialStateLaptops = {
  noOfLaptops: 100,
};
const initialStateMobiles = {
  noOfMobiles: 50,
};

// action
const buyLaptop = () => {
  return { type: BUY_LAPTOP };
};
const buyMobile = () => {
  return { type: BUY_MOBILE };
};

// reducer
const laptopReducer = (state = initialStateLaptops, action) => {
  switch (action.type) {
    case BUY_LAPTOP:
      return { noOfLaptops: state.noOfLaptops - 1 };
    default:
      return state;
  }
};
const mobileReducer = (state = initialStateMobiles, action) => {
  switch (action.type) {
    case BUY_MOBILE:
      return { noOfMobiles: state.noOfMobiles - 1 };
    default:
      return state;
  }
};

const rootReducer = combineReducers({ laptopReducer, mobileReducer });
const store = createStore(rootReducer, applyMiddleware(logger));
store.subscribe(() => console.log(store.getState()));
store.dispatch(buyLaptop());
store.dispatch(buyMobile());
store.dispatch(buyMobile());
