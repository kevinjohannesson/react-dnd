import React, { ReactElement, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { userIsDragging } from '../redux/dragDrop/selectors';

interface Props {
  // droppableElement: React.RefObject<HTMLDivElement>;
  children: any;
}

export default function Droppable({children}: Props): ReactElement {
  // console.log('%cDroppable', 'color: white; background-color: orange; padding: 1rem;');
  // console.log(children);
  // console.log(droppableElement);
  
  const isDragging = useSelector(userIsDragging);
  // console.log(isDragging);
  const droppableElement = React.createRef<HTMLDivElement>();
  
  const handleMouseOut = useCallback( (event: MouseEvent) => {
    console.log('onMouseOut');
    if(droppableElement.current){
      console.log('doei')
      droppableElement.current.style.backgroundColor = ""
    }
  }, [droppableElement]);

  const handleMouseOver = useCallback( (event: MouseEvent) => {
    console.log('onMouseOver');
    if(droppableElement.current){
      console.log('hallo')
      if(isDragging){
        droppableElement.current.style.backgroundColor = "rgba(255,255,255,0.75)";
      }



    }
  }, [droppableElement, isDragging]);

  const handleMouseUp = useCallback( (event: MouseEvent) => {
    console.log('onMouseUp');
  }, []);
  
  useEffect(() => {
    // console.log('hallo')
    const element = droppableElement.current;
    if(element){
      element.addEventListener('mouseover', handleMouseOver);
      element.addEventListener('mouseout', handleMouseOut);
      element.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      if(element){
        element.removeEventListener('mouseover', handleMouseOver);
        element.removeEventListener('mouseout', handleMouseOut);
        element.removeEventListener('mouseup', handleMouseUp);
      }
    }

  }, [droppableElement, handleMouseOver, handleMouseOut, handleMouseUp]);

  const drop = {
    ref: droppableElement
  }
  return (
    <React.Fragment>
      {children(drop)}
    </React.Fragment>
  )
}
