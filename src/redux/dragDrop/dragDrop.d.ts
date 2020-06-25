import { Action } from 'redux';

export interface DragDropState {
  userIsDragging: boolean;
  draggableData: draggableData | null;
  dragOverId: string | null;
};

export interface draggableData {
    id: string;
    index: number;
    height: number;
    width: number;
    x: number;
    y: number;
    margin: string;
}

export interface vector {
  x: number;
  y: number;
}

interface dragStart extends Action {
  type: typeof DRAG_START;
  draggableData: draggableData; 
}

interface dragEnd extends Action {
  type: typeof DRAG_END;
}

interface dragOver extends Action {
  type: typeof DRAG_OVER;
  droppableId: string | null;
}

export type DragDropActions = dragStart | dragEnd | dragOver;

export const DRAG_START = "DRAG START";
export const DRAG_END = "DRAG_END";
export const DRAG_OVER = "DRAG_OVER";

