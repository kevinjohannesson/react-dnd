import { State } from "../redux.d";

export const isUserDragging = (state: State) => state.DragDrop.userIsDragging;

export const isUserDraggingOver = (droppableId: string) => (state: State) => (
  state.DragDrop.dragOverId === droppableId
)
export const userIsDraggingDraggable = (draggableId: string) => (state: State) => state.DragDrop.draggableData && state.DragDrop.draggableData.id === draggableId ? true : false

export const select_draggableData = (state: State) => state.DragDrop.draggableData;
// export const getHoverId = (state: State) => state.DragDrop.hover;

// export const getDroppables = (state: State) => state.DragDrop.droppables;

// export const get_draggableData = (state: State) => state.DragDrop.draggableData;

export const get_draggableDataById = (draggableId: string) => (state: State) => 
  state.DragDrop.draggableData && state.DragDrop.draggableData.id === draggableId 
  ? state.DragDrop.draggableData 
  : null;