import { createStore } from 'redux';
import reducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(reducer, composeWithDevTools(
  // applyMiddleware(...middleware),
  // other store enhancers if any
));

export default store;