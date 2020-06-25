import { DragDropState, DragDropActions, ADD_DROPPABLE, SET_HOVER, DRAG_START, DRAG_END } from "./dragDrop.d";
import { initialState } from "./initial_state";


export default function reducer(
  state: DragDropState = initialState,
  action: DragDropActions
) {
  switch (action.type) {
    
    case DRAG_START: {
      return {
        ...state,
        isDragging: true,
        draggable: action.draggable
      }
    }

    case DRAG_END: {
      return {
        ...state,
        isDragging: false,
        draggable: null,
        hover: null,
      }
    }

    case ADD_DROPPABLE: {
      const isAlreadyStored = state.droppables.some(id => id === action.droppableId);
      if(!isAlreadyStored){
        return {
          ...state,
          droppables: [
            ...state.droppables,
            action.droppableId
          ]
        }
      }
      else return state
    }

    case SET_HOVER: {
      const idIsNew = state.hover !== action.droppableId;
      if(idIsNew){
        return {
          ...state,
          hover: action.droppableId
        }
      }
      else return state;
    }

    default: {
      return state;
    }
  }
}
