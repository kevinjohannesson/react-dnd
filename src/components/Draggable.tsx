import React, { useEffect, useState, useCallback } from 'react'

interface Props {
  children: JSX.Element | JSX.Element[]
  draggableElement: React.RefObject<HTMLDivElement>
}

const Draggable = ({draggableElement, children}: Props) => {
  
  const [dragging, set_dragging] = useState(false);

  const dragHandler = useCallback( (event: MouseEvent) => {
    console.log('dragHandler');
    const mouse = getMouseInformation(event);
    if(draggableElement.current){
      translateElement(draggableElement.current, mouse.movement);
    }
  }, [draggableElement]);

  const mouseUpHandler = useCallback( (event) => {
    console.log('mouseUp');
    set_dragging(false);
    document.removeEventListener('mousemove', dragHandler)
    document.removeEventListener('mouseup', mouseUpHandler);
    
  }, [dragHandler]);

  const mouseDownHandler = useCallback( (event) => {
      set_dragging(true)
      document.addEventListener('mousemove', dragHandler);
      document.addEventListener('mouseup', mouseUpHandler);
  }, [dragHandler, mouseUpHandler]);

  
  useEffect(() => {
    if(draggableElement.current){
      console.log(draggableElement)
      draggableElement.current.addEventListener('mousedown', mouseDownHandler)
    }

    return () => {
      //cleanup
    }
  }, [draggableElement, mouseDownHandler])

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}

export default Draggable

const getMouseInformation = (event: MouseEvent) => {
  return {
    movement: {
      x: event.movementX,
      y: event.movementY,
    },
    position: {
      x: event.screenX,
      y: event.screenY
    }
  };
}


const translateElement = (element: HTMLElement, movement: {x: number, y: number}) => {
  if(element){
    const translate = { 
      x: movement.x, 
      y: movement.y 
    }

    const hasTransform = element.style.transform ? true : false;
    if(hasTransform) {
      const translation = element.style.transform.match(/-?\d+/g);
      if(translation && translation.length === 2){
        const [x, y] = translation.map(Number);
        translate.x += x;
        translate.y += y;
      }
    }

    element.style.zIndex = '5000';
    element.style.transform = `translate(${translate.x}px, ${translate.y}px)`;
  }
}