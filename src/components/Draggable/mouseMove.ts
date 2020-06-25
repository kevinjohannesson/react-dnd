import filterMouseData from './filterMouseData';
import { translateElement } from './translateElement';
import { Dispatch } from 'react';
import { dragOver } from '../../redux/dragDrop/actions';
import { vector } from '../../redux/dragDrop/dragDrop';

export default function mouseMove(
    event: MouseEvent, 
    element: HTMLElement, 
    dragoverId: React.MutableRefObject<string | null>, 
    position: React.MutableRefObject<vector | null>,
    dispatch: Dispatch<any>
  ){
    console.log(position)
  const mouseData = filterMouseData(event);
  if(position.current){
    position.current = {
      x: position.current.x += mouseData.movement.x,
      y: position.current.y += mouseData.movement.y
    }
    translateElement(element, position.current);

    
    const elementsFromPoint = document.elementsFromPoint(event.clientX, event.clientY);
    if(elementsFromPoint.length !== 0){
      const firstElement = (elementsFromPoint[1] as HTMLDivElement);
      const droppableId = firstElement.getAttribute('data-droppableId');
      if(dragoverId.current !== droppableId){
        dragoverId.current = droppableId;
        dispatch(dragOver(droppableId));
      };
    };
  }
};