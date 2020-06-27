import { Action } from 'redux';

export interface vector {
  x: number;
  y: number;
};

type dragStatus = null | 'init' | 'active' | 'drop' | 'cancel' | 'clear';

export interface DragDropState {
  dragStatus: dragStatus;
  draggableData: draggableData | null;
  dragOverId: string | null;
  dropPosition: vector | null;
};

export interface draggableData {
    id: string;
    index: number;
    height: number;
    width: number;
    x: number;
    y: number;
    margin: {
      top: number,
      right: number,
      bottom: number,
      left: number,
      all: string
    };
    cursorPosition: vector;
}

interface dragInit extends Action {
  type: typeof DRAG_INIT;
  draggableData: draggableData; 
  dragOverId: string | null;
}

interface dragStart extends Action {
  type: typeof DRAG_START;
}

interface dragEnd extends Action {
  type: typeof DRAG_END;
}

interface dragFinish extends Action {
  type: typeof DRAG_FINISH;
}

interface dragOver extends Action {
  type: typeof DRAG_OVER;
  droppableId: string | null;
}

interface setDropPosition extends Action {
  type: typeof SET_DROP_POSITION;
  position: vector;
}

interface dragClear extends Action {
  type: typeof DRAG_CLEAR;
}

export type DragDropActions = dragInit | dragStart | dragEnd | dragFinish | dragOver | setDropPosition | dragClear;

export const DRAG_INIT = "DRAG_INIT";
export const DRAG_START = "DRAG START";
export const DRAG_END = "DRAG_END";
export const DRAG_FINISH = "DRAG_FINISH";
export const DRAG_CLEAR = "DRAG_CLEAR";

export const DRAG_OVER = "DRAG_OVER";

export const SET_DROP_POSITION = "SET_DROP_POSITION";
