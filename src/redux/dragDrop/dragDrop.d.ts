import { Action } from 'redux';

export interface T_vector {
  x: number;
  y: number;
};

export const dragStopReasons = ['drop', 'cancel'] as const;
export type T_dragStopReason = typeof dragStopReasons[number];

export const statuses = ['inactive', 'init', 'active', 'stop', 'finish'] as const;
export type T_status = typeof statuses[number];

type T_hoverId = string | null;

export interface I_DragDropState {
  status: T_status;
  draggableData: I_draggableData | null;
  hoverId: T_hoverId;
  dragStopReason: T_dragStopReason | null;
  dropPosition: T_vector | null;
}

export interface I_draggableData {
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

export const DRAG_INIT = 'DRAG_INIT';
export const DRAG_ACTIVE = 'DRAG_ACTIVE';
export const SET_HOVER = 'SET_HOVER';
export const SET_DROP_POSITION = 'SET_DROP_POSITION';
export const DRAG_STOP = 'DRAG_STOP';
export const DRAG_FINISH = 'DRAG_FINISH';
export const DRAG_INACTIVE = 'DRAG_INACTIVE';

const actions = [
  DRAG_INIT, 
  DRAG_ACTIVE, 
  SET_HOVER, 
  SET_DROP_POSITION,
  DRAG_STOP,
  DRAG_FINISH,
  DRAG_INACTIVE] as const;
  
export type T_action = typeof actions[number];

interface I_updateState extends Action {
  type: T_action;
  hoverId?: T_hoverId;
  draggableData?: I_draggableData;
  dragStopReason?: T_dragStopReason;
  dropPosition?: T_vector;
}

export type Actions = I_updateState