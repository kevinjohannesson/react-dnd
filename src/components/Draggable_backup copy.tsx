import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { setDragging, setDraggable } from '../redux/dragDrop/actions';

interface Props {
  children: any;
}

interface Ilocation {
  x: number;
  y: number;
}

interface State {
  dragStart: {
    x: number;
    y: number;
  }
  draggableSize: {
    height: number;
    width: number;
  }
}



const Draggable = ({children}: Props) => {
  // console.log('%cDraggable', 'color: white; background-color: green; padding: 1rem;');
  // console.log(ref && (ref as () => void)());
  const draggableElement = React.createRef<HTMLDivElement>();
  const dispatch = useDispatch();

  const [dragStart, set_dragStart] = useState<Ilocation | null>(null);

  const dragHandler = useCallback( (event: MouseEvent) => {
    // console.log('dragHandler');
    // console.log(document.elementsFromPoint(event.clientX, event.clientY));
    // const elements = document.elementsFromPoint(event.clientX, event.clientY);
    // const dropContainer = elements.find(element => (element as HTMLDivElement).dataset.droppable);
    console.log(draggableElement);
    const mouse = getMouseInformation(event);
    if(draggableElement.current){
      translateElement(draggableElement.current, mouse.movement);
    }
  }, [draggableElement]);

  const mouseUpHandler = useCallback( (event: MouseEvent) => {
    // console.log('mouseUp');
    
    document.removeEventListener('mousemove', dragHandler);

    if(draggableElement.current && dragStart){
      
      draggableElement.current.addEventListener('transitionend', () => {
        if(draggableElement.current && dragStart){
          draggableElement.current.style.transition = '';
          draggableElement.current.style.transform = '';
        }
      });
      draggableElement.current.style.transition = 'transform 0.4s ease-in-out';
      draggableElement.current.style.transform = `translate(0px, 0px)`;
      draggableElement.current.style.pointerEvents = '';
    }

    set_dragStart(null);
    
  }, [dragHandler, dragStart, draggableElement]);

  const mouseDownHandler = useCallback( (event: MouseEvent) => {
    console.log(draggableElement)
    const mouse = getMouseInformation(event);
    console.log(mouse)

    dispatch(setDragging(true));
    dispatch(setDraggable(draggableElement));

    set_dragStart(mouse.position);
    document.addEventListener('mousemove', dragHandler);
    // if(draggableElement.current){
    //   draggableElement.current.style.pointerEvents = 'none';
    // }
  }, [dragHandler, draggableElement, dispatch]);

  
  useEffect(() => {
    const element = draggableElement.current;
    if(element){
      // console.log(element)
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


  const drag = {
    ref: draggableElement
  }

  console.log(drag);
  return (
    <React.Fragment>
      {children(drag)}
    </React.Fragment>
  )
};

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

