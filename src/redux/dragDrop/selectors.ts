import State from "../redux.d";

export const isUserDraggingOver = (droppableId: string) => (state: State) => (
  state.DragDrop.hoverId === droppableId
)
export const userIsDraggingDraggable = (draggableId: string) => (state: State) => state.DragDrop.draggableData && state.DragDrop.draggableData.id === draggableId ? true : false

export const select_draggableData = (state: State) => state.DragDrop.draggableData;

export const get_draggableDataById = (draggableId: string) => (state: State) => 
  state.DragDrop.draggableData && state.DragDrop.draggableData.id === draggableId 
  ? state.DragDrop.draggableData 
  : null;

export const select_status = (state: State) => state.DragDrop.status;
export const select_dragEndReason = (state: State) => state.DragDrop.dragStopReason;

export const select_dragOverId = (state: State) => state.DragDrop.hoverId;
export const is_dragOverId = (droppableId: string) => (state: State) => (
  state.DragDrop.hoverId === droppableId
);

export const select_dropPosition = (state: State) => state.DragDrop.dropPosition;