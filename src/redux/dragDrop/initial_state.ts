import { I_DragDropState } from "./dragDrop.d";

export const initialState: I_DragDropState = {
  status: 'inactive',
  draggableData: null,
  hoverId: null,
  dropPosition: null,
  dragStopReason: null,
  dragEndReason: null,
  draggableId: null,
  source: null,
  hoveredDroppableId: null,
};
