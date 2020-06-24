import { Action } from 'redux';

export interface DragDropState {
  isDragging: boolean;
  draggable: draggableData | null;
  droppables: string[];
  hover: string | null;
};


export interface draggableData {
    height: number;
    width: number;
    x: number;
    y: number;
}

interface IdragStart extends Action {
  type: typeof DRAG_START;
  draggable: draggableData; 
}

interface IdragEnd extends Action {
  type: typeof DRAG_END;
}

interface IsetHover extends Action {
  type: typeof SET_HOVER;
  droppableId: string | null;
}


interface IsetDestination extends Action{
  type: typeof SET_DESTINATION;
  position: {
    x: number;
    y: number;
  }
}

interface IaddDroppable extends Action {
  type: typeof ADD_DROPPABLE;
  droppableId: string;
}

export type DragDropActions = IaddDroppable | IsetHover | IdragStart | IdragEnd;

export const SET_DESTINATION = "SET_DESTINATION";


export const ADD_DROPPABLE = "ADD_DROPPABLE";
export const SET_HOVER = "SET_HOVER";

export const DRAG_START = "DRAG START";
export const DRAG_END = "DRAG_END";