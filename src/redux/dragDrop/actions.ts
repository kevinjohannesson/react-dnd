import { IsetDestination, SET_DESTINATION, IsetDragging, SET_DRAGGING, SET_DRAGGABLE, IsetDraggable} from "./dragDrop.d"

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