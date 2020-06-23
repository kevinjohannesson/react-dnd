import { createStore, applyMiddleware, compose  } from "redux";
import ReduxThunk from "redux-thunk";
import reducer from "./reducer";

declare global {
  interface Window { __REDUX_DEVTOOLS_EXTENSION__: any; }
}

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const enhancer = compose(applyMiddleware(ReduxThunk), devTools);

const store = createStore(reducer, enhancer);

export default store;