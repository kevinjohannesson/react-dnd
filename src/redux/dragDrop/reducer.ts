import { SET_DRAGGABLE, SET_DRAGGING, DragDropState, DragDropActions, ADD_DROPPABLE, SET_HOVER } from "./dragDrop.d";
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
    case ADD_DROPPABLE: {
      const isAlreadyStored = state.droppables.some(droppable => droppable.id === action.droppableId);
      if(!isAlreadyStored){
        console.log('adding droppable')
        return {
          ...state,
          droppables: [
            ...state.droppables,
            {
              id: action.droppableId,
              element: action.element
            }
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
