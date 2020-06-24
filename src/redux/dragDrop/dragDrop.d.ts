import { Action } from 'redux';

export interface DragDropState {
  isDragging: boolean;
  draggable: React.RefObject<HTMLDivElement> | null;
  droppables: {
      id: string,
      element: HTMLElement,
  }[];
  hover: string | null;
  // MOET EEN HOVER OBJECT MAKEN MET SELECTOR VOOR DROPPABLE
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

interface IaddDroppable extends Action {
  type: typeof ADD_DROPPABLE;
  droppableId: string;
  element: HTMLElement;
}

interface IsetHover extends Action {
  type: typeof SET_HOVER;
  droppableId: string | null;
}

export type DragDropActions = IsetDragging | IsetDraggable | IaddDroppable | IsetHover;

export const SET_DESTINATION = "SET_DESTINATION";
export const SET_DRAGGING = "SET_DRAGGING";
export const SET_DRAGGABLE = "SET_DRAGGABLE";
export const ADD_DROPPABLE = "ADD_DROPPABLE";
export const SET_HOVER = "SET_HOVER";