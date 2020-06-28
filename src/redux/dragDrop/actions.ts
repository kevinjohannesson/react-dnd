import { 
  DRAG_INIT,
  DRAG_ACTIVE,
  SET_HOVER,
  SET_DROP_POSITION,
  DRAG_STOP,
  DRAG_INACTIVE,
  I_draggableData,
  I_updateState,
  T_vector,
  T_hoverId,
  T_dragStopReason,
  T_status,
  T_action,
  dragStopReasons,
} from "./dragDrop.d"

type T_updateType = T_status| 'hover' | 'drop_position';

const updateType: {[key in T_updateType]: T_action} = {
  'init': DRAG_INIT,
  'active': DRAG_ACTIVE,
  'hover': SET_HOVER,
  'drop_position': SET_DROP_POSITION,
  'stop': DRAG_STOP,
  'inactive': DRAG_INACTIVE,
}

export function updateState(
    t: T_updateType, 
    m?: T_hoverId | T_dragStopReason | T_vector | string | null,
    u?: I_draggableData, 
  ): I_updateState {
  return { 
    type: updateType[t], 
    hoverId: (typeof m === 'string' ? m : null), 
    dragStopReason: dragStopReasons.find(reason => m === reason),
    draggableData: u,
    dropPosition: (m && typeof m !== 'string' && m.x && m.y && m !== null ? m : undefined)
  }
}