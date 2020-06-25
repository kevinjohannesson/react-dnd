import { 
  DRAG_START,
  DRAG_END,
  DRAG_OVER,
  draggableData as interface_draggableData,
  dragStart as interface_dragStart,
  dragEnd as interface_dragEnd,
  dragOver as interface_dragOver,} from "./dragDrop.d"

export function dragStart(draggableData: interface_draggableData): interface_dragStart {
  return {
    type: DRAG_START,
    draggableData
  }
}

export function dragEnd(): interface_dragEnd {
  return {
    type: DRAG_END
  }
}

export function dragOver(droppableId: string | null): interface_dragOver {
  return {
    type: DRAG_OVER,
    droppableId
  }
}