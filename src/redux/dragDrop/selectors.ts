import { State } from "../redux.d";

export const userIsDragging = (state: State) => state.DragDrop.isDragging;

export const getHoverId = (state: State) => state.DragDrop.hover;

export const getDroppables = (state: State) => state.DragDrop.droppables;