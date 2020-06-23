import { Action } from 'redux';

export interface DragDropState {
  isDragging: boolean;
  draggable: React.RefObject<HTMLDivElement> | null;
};



interface IsetDestination {
  type: typeof SET_DESTINATION;
  position: {
    x: number;
    y: number;
  }
}

interface IsetDraggable {
  type: typeof SET_DRAGGABLE;
  ref: any;
}

interface IsetDragging extends Action{
  type: typeof SET_DRAGGING;
  condition: boolean;
}

interface IsetDraggable extends Action{
  type: typeof SET_DRAGGABLE;
  ref: any;
}

export type DragDropActions = IsetDragging | IsetDraggable;

export const SET_DESTINATION = "SET_DESTINATION";
export const SET_DRAGGING = "SET_DRAGGING";
export const SET_DRAGGABLE = "SET_DRAGGABLE";