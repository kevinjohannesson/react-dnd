import { IsetDestination, SET_DESTINATION, IsetDragging, SET_DRAGGING, SET_DRAGGABLE, IsetDraggable, ADD_DROPPABLE, IaddDroppable, IsetHover, SET_HOVER} from "./dragDrop.d"

// export function setDragging(condition: boolean): IsetDragging {
//   return {
//     type: SET_DRAGGING,
//     condition
//   }
// }

export const setDragging = ( condition: boolean) => {
  return {
    type: SET_DRAGGING,
    condition
  } as IsetDragging
}

export const setDraggable = ( ref: any ) => {
  return {
    type: SET_DRAGGABLE,
    ref
  } as IsetDraggable
}


export function setDestination(position: {x: number, y: number}): IsetDestination {
  return {
    type: SET_DESTINATION,
    position  
  }
}

export function addDroppable( droppableId: string, element: HTMLElement): IaddDroppable {
  return {
    type: ADD_DROPPABLE,
    droppableId,
    element 
  }
}

export function setHover(droppableId: string | null): IsetHover {
  return {
    type: SET_HOVER,
    droppableId
  }
}