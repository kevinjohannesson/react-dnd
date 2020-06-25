import { Action } from 'redux';

export interface DragDropState {
  isDragging: boolean;
  draggable: draggableData | null;
  droppables: string[];
  hover: string | null;
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

export interface Idestination {
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

interface IdragOver extends Action {
  type: typeof DRAG_OVER;
  droppableId: string | null;
}

export type DragDropActions = IaddDroppable | IsetHover | IdragStart | IdragEnd | IdragOver;

export const SET_DESTINATION = "SET_DESTINATION";


export const ADD_DROPPABLE = "ADD_DROPPABLE";
export const SET_HOVER = "SET_HOVER";

export const DRAG_START = "DRAG START";
export const DRAG_END = "DRAG_END";

export const DRAG_OVER = "SET_DRAG_OVER";

