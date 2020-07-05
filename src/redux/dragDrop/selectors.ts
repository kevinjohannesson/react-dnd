import State from "../redux.d";

export const isUserDraggingOver = (droppableId: string) => (state: State) => (
  state.DragDrop.hoverId === droppableId
)

export const select_source = (state: State) => state.DragDrop.source;
export const select_draggableId = (state: State) => state.DragDrop.draggableId;
export const select_draggableData = (state: State) => state.DragDrop.draggableData;
export const userIsDraggingThis = (draggableId: string) => (state: State) => (
  state.DragDrop.draggableId === draggableId
);
// export const userIsDraggingDraggable = (draggableId: string) => (state: State) => state.DragDrop.draggableData && state.DragDrop.draggableData.id === draggableId ? true : false


// export const get_draggableDataById = (draggableId: string) => (state: State) => 
//   state.DragDrop.draggableData && state.DragDrop.draggableData.id === draggableId 
//   ? state.DragDrop.draggableData 
//   : null;

export const select_status = (state: State) => state.DragDrop.status;
export const select_dragEndReason = (state: State) => state.DragDrop.dragStopReason;

export const select_hoverId = (state: State) => state.DragDrop.hoverId;

export const is_hoverId = (droppableId: string) => (state: State) => (
  state.DragDrop.hoverId === droppableId
);

export const select_dropPosition = (state: State) => state.DragDrop.dropPosition;

export const select_currentDragAction = (state: State) => (
  state.DragDrop.draggableId && state.DragDrop.source ? 
  {
    draggableId: state.DragDrop.draggableId,
    source: state.DragDrop.source
  } : null
)