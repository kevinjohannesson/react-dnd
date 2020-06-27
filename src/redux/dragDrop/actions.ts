import { 
  DRAG_INIT,
  DRAG_START,
  DRAG_END,
  DRAG_OVER,
  DRAG_FINISH,
  SET_DROP_POSITION,
  DRAG_CLEAR,
  dragClear as interface_dragClear,
  draggableData as interface_draggableData,
  dragInit as interface_dragInit,
  dragStart as interface_dragStart,
  dragEnd as interface_dragEnd,
  dragOver as interface_dragOver,
  dragFinish as interface_dragFinish,
  setDropPosition as interface_setDropPosition,
  vector,
  dragStatus,
} from "./dragDrop.d"

export function dragInit(draggableData: interface_draggableData, dragOverId: string | null): interface_dragInit {
  return {
    type: DRAG_INIT,
    draggableData,
    dragOverId
  }
}

export function dragStart(): interface_dragStart {
  return {
    type: DRAG_START,
  }
}

export function dragEnd(): interface_dragEnd {
  return {
    type: DRAG_END
  }
}

export function dragFinish(): interface_dragFinish {
  return {
    type: DRAG_FINISH
  }
}

export function dragOver(droppableId: string | null): interface_dragOver {
  return {
    type: DRAG_OVER,
    droppableId
  }
}

export function setDropPosition(position: vector): interface_setDropPosition {
  return {
    type: SET_DROP_POSITION,
    position
  }
}
export function dragClear(): interface_dragClear {
  return {
    type: DRAG_CLEAR,
  }
}

export function set_dragStatus(status: dragStatus, u?: interface_draggableData, m?: string | null) {
  const type = (function(){
    switch(status){
      case 'init': return dragInit(arguments[1], arguments[2])
      case 'clear': return DRAG_CLEAR;
    }
  })();
  return {type}
}