import { SET_DRAGGABLE, SET_DRAGGING, DragDropState, DragDropActions } from "./dragDrop.d";
import { initialState } from "./initial_state";


export default function reducer(
  state: DragDropState = initialState,
  action: DragDropActions
) {
  switch (action.type) {
    case SET_DRAGGING: {
      return {
        ...state,
        isDragging: action.condition
      };
    }
    case SET_DRAGGABLE: {
      return {
        ...state,
        draggable: action.ref
      };
    }
    default: {
      return state;
    }
  }
}
