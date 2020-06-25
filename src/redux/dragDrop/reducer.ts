import { DragDropState, DragDropActions, DRAG_START, DRAG_END, DRAG_OVER } from "./dragDrop.d";
import { initialState } from "./initial_state";


export default function reducer(
  state: DragDropState = initialState,
  action: DragDropActions
) {
  switch (action.type) {
    
    case DRAG_START: {
      return {
        ...state,
        userIsDragging: true,
        draggableData: action.draggableData
      }
    }

    case DRAG_END: {
      return {
        ...state,
        userIsDragging: false,
        draggableData: null,
      }
    }

    case DRAG_OVER: {
      return {
        ...state,
        dragOverId: action.droppableId
      }
    }

    default: {
      return state;
    }
  }
}
