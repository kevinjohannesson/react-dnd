import { I_DragDropState, 
  DRAG_ACTIVE,
  //  DRAG_STOP,
    DRAG_INIT,
    //  DRAG_INACTIVE,
      // SET_DROP_POSITION,
      //  SET_HOVER,
        Actions,
        DRAG_END,
         DRAG_FINISH 
        } from "./dragDrop.d";
import { initialState } from "./initial_state";



export default function reducer(
  state: I_DragDropState = initialState,
  action: Actions
): I_DragDropState {
  switch (action.type) {
    case DRAG_INIT: {
      return {
        ...state,
        status: 'init',
        source: action.droppableId,
        draggableId: action.draggableId
      }
    }
    // case DRAG_INIT: {
    //   return {
    //     ...state,
    //     status: 'init',
    //     source: action.droppableId,
    //     draggableId: action.draggableId,
    //     draggableData: action.draggableData
    //   }
    // }

    case DRAG_ACTIVE: {
      return {
        ...state,
        status: 'active'
      }
    }

    case DRAG_END: {
      return {
        ...state,
        status: 'end'
      }
    }

    case DRAG_FINISH: {
      return {
        ...state,
        source: null,
        draggableId: null,
        draggableData: null,
        status: 'inactive'
      }
    }

    // case SET_HOVER: {
    //   return {
    //     ...state,
    //     hoverId: action.hoverId || null
    //   }
    // }

    // case SET_DROP_POSITION: {
    //   return {
    //     ...state,
    //     dropPosition: action.dropPosition || null
    //   }
    // }

    // case DRAG_STOP: {
    //   return {
    //     ...state,
    //     status: 'stop',
    //     dragStopReason: action.dragStopReason || null
    //   }
    // }

    // case DRAG_FINISH: {
    //   return {
    //     ...state,
    //     status: 'finish',
    //   }
    // }

    // case DRAG_INACTIVE: {
    //   return {
    //     ...state,
    //     status: 'inactive',
    //     draggableData: null,
    //     hoverId: null,
    //     dropPosition: null,
    //     dragStopReason: null
    //   }
    // }

    default: {
      return state;
    }
  }
}
