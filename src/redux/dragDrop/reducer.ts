import { I_DragDropState, 
  DRAG_ACTIVE,
  //  DRAG_STOP,
    DRAG_INIT,
    //  DRAG_INACTIVE,
      // SET_DROP_POSITION,
      //  SET_HOVER,
        Actions,
        DRAG_END,
         DRAG_FINISH, 
         DRAG_OVER
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
        sourceDroppableId: action.droppableId,
        draggableId: action.draggableId,
        hoveredDroppableId: action.droppableId
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
    case DRAG_OVER: {
      if(action.hoveredDroppableId === state.hoveredDroppableId){
        console.log('just returning state');
        console.log(action.hoveredDroppableId)
        console.log(state.hoveredDroppableId)
        return state;
    }   
      else {
        return {
          ...state,
          hoveredDroppableId: action.hoveredDroppableId
        }
      }
    }

    case DRAG_END: {
      return {
        ...state,
        status: 'end',
        dragEndReason: action.dragEndReason,
      }
    }

    case DRAG_FINISH: {
      return {
        ...state,
        sourceDroppableId: null,
        draggableId: null,
        // draggableData: null,
        dragEndReason: null,
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
