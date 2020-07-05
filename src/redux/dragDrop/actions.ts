import { 
  DRAG_INIT,
  DRAG_ACTIVE,
  // SET_HOVER,
  // SET_DROP_POSITION,
  // DRAG_STOP,
  // DRAG_INACTIVE,
  // I_draggableData,
  // I_updateState,
  // T_vector,
  // T_hoverId,
  // T_dragStopReason,
  // T_status,
  // T_action,
  // dragStopReasons,
  // DRAG_FINISH,
  I_dragInit,
  I_dragActive,
  DRAG_END,
  I_dragEnd,
  I_dragFinish,
  DRAG_FINISH,
} from "./dragDrop.d"

// type T_updateType = T_status| 'hover' | 'drop_position';

// const updateType: {[key in T_updateType]: T_action} = {
//   'init': DRAG_INIT,
//   'active': DRAG_ACTIVE,
//   'hover': SET_HOVER,
//   'drop_position': SET_DROP_POSITION,
//   'stop': DRAG_STOP,
//   'finish': DRAG_FINISH,
//   'inactive': DRAG_INACTIVE,
//   'end': DRAG_END,
// }

// export function updateState(
//     t: T_updateType, 
//     m?: T_hoverId | T_dragStopReason | T_vector | string | null,
//     u?: I_draggableData, 
//   ): I_updateState {
//   return { 
//     type: updateType[t], 
//     hoverId: (typeof m === 'string' ? m : null), 
//     dragStopReason: dragStopReasons.find(reason => m === reason),
//     draggableData: u,
//     dropPosition: (m && typeof m !== 'string' && m.x && m.y && m !== null ? m : undefined)
//   }
// }



export const dragEnd = (): I_dragEnd => (
  {type: DRAG_END}
)
export const dragInit = (droppableId: string, draggableId: string): I_dragInit => (
  {type: DRAG_INIT, droppableId, draggableId}
)
// export const dragInit = (droppableId: string, draggableId: string, draggableData: I_draggableData): I_dragInit => (
//   {type: DRAG_INIT, droppableId, draggableId, draggableData}
// )

export const dragActive = (): I_dragActive => (
  {type: DRAG_ACTIVE}
)

export const dragFinish = (): I_dragFinish => (
  {type: DRAG_FINISH}
)
