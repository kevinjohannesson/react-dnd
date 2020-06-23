import { combineReducers } from "redux";
import dragDropReducer from './dragDrop/reducer';

const reducer = combineReducers({
  DragDrop: dragDropReducer,
  // etc.
});

export default reducer;