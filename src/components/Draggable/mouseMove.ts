import filterMouseData from './filterMouseData';
import { translateElement } from './translateElement';
import { Dispatch } from 'react';
import { dragOver } from '../../redux/dragDrop/actions';

export default function mouseMove(
    event: MouseEvent, 
    element: HTMLElement, 
    dragoverId: React.MutableRefObject<string | null>, 
    dispatch: Dispatch<any>
  ){
  const mouseData = filterMouseData(event);
  translateElement(element, mouseData.movement);

  const elementsFromPoint = document.elementsFromPoint(event.clientX, event.clientY);
  if(elementsFromPoint.length !== 0){
    const firstElement = (elementsFromPoint[0] as HTMLDivElement);
    const droppableId = firstElement.getAttribute('data-droppableId');
    if(dragoverId.current !== droppableId){
      dragoverId.current = droppableId;
      dispatch(dragOver(droppableId));
    };
  };
};