import { 
  ADD_DROPPABLE,
  IaddDroppable,
  IsetHover,
  SET_HOVER,
  draggableData,
  IdragStart,
  DRAG_START,
  IdragEnd,
  DRAG_END,
  DRAG_OVER,
  IdragOver,} from "./dragDrop.d"

export function dragStart(draggable: draggableData): IdragStart {
  return {
    type: DRAG_START,
    draggable
  }
}

export function dragEnd(): IdragEnd {
  return {
    type: DRAG_END
  }
}

export function setHover(droppableId: string | null): IsetHover {
  return {
    type: SET_HOVER,
    droppableId
  }
}

export function addDroppable( droppableId: string): IaddDroppable {
  return {
    type: ADD_DROPPABLE,
    droppableId
  }
}

export function dragOver( droppableId: string | null ): IdragOver {
  return {
    type: DRAG_OVER,
    droppableId
  }
}