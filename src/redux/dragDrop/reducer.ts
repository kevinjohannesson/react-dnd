import { DragDropState, DragDropActions, DRAG_START, DRAG_END, DRAG_OVER, DRAG_INIT, DRAG_FINISH, SET_DROP_POSITION } from "./dragDrop.d";
import { initialState } from "./initial_state";


export default function reducer(
  state: DragDropState = initialState,
  action: DragDropActions
) {
  switch (action.type) {
    case DRAG_INIT: {
      const {draggableData, dragOverId} = action;
      return {
        ...state,
        dragStatus: 'init',
        draggableData,
        dragOverId
      }
    }

    
    case DRAG_START: {
      return {
        ...state,
        dragStatus: 'active'
      }
    }

    case DRAG_END: {
      return {
        ...state,
        dragStatus: state.dragOverId ? 'drop' : 'cancel'
      }
    }

    case DRAG_FINISH: {
      return {
        ...state,
        dragStatus: null,
        draggableData: null,
        dragOverId: null,
        dropPosition: null,
      }
    }

    case DRAG_OVER: {
      return {
        ...state,
        dragOverId: action.droppableId
      }
    }

    case SET_DROP_POSITION: {
      return {
        ...state,
        dropPosition: action.position
      }
    }

    default: {
      return state;
    }
  }
}
