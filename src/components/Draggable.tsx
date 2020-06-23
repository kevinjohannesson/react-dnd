import React, { useEffect, useState, useCallback } from 'react'

interface Props {
  children: JSX.Element | JSX.Element[]
  draggableElement: React.RefObject<HTMLDivElement>
}

interface i_location {
  x: number;
  y: number;
}

const Draggable = ({draggableElement, children}: Props) => {
  console.log('rendering.....')
  const [dragging, set_dragging] = useState(false);

  const [dragStart, set_dragStart] = useState<i_location | null>(null);

  const dragHandler = useCallback( (event: MouseEvent) => {
    console.log('dragHandler');
    const mouse = getMouseInformation(event);
    if(draggableElement.current){
      translateElement(draggableElement.current, mouse.movement);
    }
  }, [draggableElement]);

  const mouseUpHandler = useCallback( (event: MouseEvent) => {
    console.log('mouseUp');
    // console.log(dragStart)
    // set_dragging(false);
    document.removeEventListener('mousemove', dragHandler);
    // document.removeEventListener('mouseup', mouseUpHandler);

    // if(draggableElement.current && dragStart){
    //   console.log(draggableElement.current)
    //   draggableElement.current.style.transition = 'transform 0.6s ease-in-out'
    //   draggableElement.current.style.transform = `translate(${dragStart.x}px, ${dragStart.y})`
    // }

    
  }, [dragHandler, dragStart, draggableElement]);

  const mouseDownHandler = useCallback( (event: MouseEvent) => {
    const mouse = getMouseInformation(event);
    set_dragStart(mouse.position);
    document.addEventListener('mousemove', dragHandler);
  }, [dragHandler]);

  
  useEffect(() => {
    const element = draggableElement.current;
    if(element){
      console.log(element)
      element.addEventListener('mousedown', mouseDownHandler);
    }
    return () => {
      if(element){
        element.removeEventListener('mousedown', mouseDownHandler);
      }
    }
  }, [draggableElement, mouseDownHandler])

  useEffect(() => {
    if(dragStart){
      document.addEventListener('mouseup', mouseUpHandler);
    }
    return () => {
      if(dragStart){
        document.removeEventListener('mouseup', mouseUpHandler);
      }
    }
  }, [dragStart, mouseUpHandler]);

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
