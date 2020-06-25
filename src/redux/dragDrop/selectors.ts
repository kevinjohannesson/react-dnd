import { State } from "../redux.d";

export const isUserDragging = (state: State) => state.DragDrop.isDragging;


export const userIsDraggingDraggable = (draggableId: string) => (state: State) => state.DragDrop.draggable && state.DragDrop.draggable.id === draggableId ? true : false


export const getHoverId = (state: State) => state.DragDrop.hover;

export const getDroppables = (state: State) => state.DragDrop.droppables;

export const getDraggable = (state: State) => state.DragDrop.draggable;

export const getDraggableDataById = (draggableId: string) => (state: State) => 
  state.DragDrop.draggable && state.DragDrop.draggable.id === draggableId 
  ? state.DragDrop.draggable 
  : null;