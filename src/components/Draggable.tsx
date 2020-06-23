import React, { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux';
// import { setDragging, setDraggable } from '../redux/dragDrop/actions';
import { setDragging } from '../redux/dragDrop/actions';

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
  console.log('%cDraggable', 'color: white; background-color: green; padding: 1rem;');
  
  const ref = React.createRef<HTMLDivElement>();
  const dispatch = useDispatch();
  const handleMouseMove = useCallback( (event: MouseEvent) => {
    console.log('onMouseMove')
    // console.log(ref.current);
    if(ref.current){
      const mouse = getMouseInformation(event);
      translateElement(ref.current, mouse.movement);
    }
  }, [ref]);

  const handleMouseUp = useCallback( (event: MouseEvent) => {
    console.log('onMouseUp')
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);

    if(ref.current){
      const element = ref.current;
      
      element.addEventListener('transitionend', () => {
        element.style.transition = '';
        element.style.transform = '';
      });

      element.style.transition = 'transform 0.4s ease-in-out';
      element.style.transform = `translate(0px, 0px)`;
      element.style.pointerEvents = '';

      dispatch(setDragging(false));
    }
  }, [handleMouseMove, ref, dispatch]);

  const handleMouseDown = useCallback( (event: MouseEvent) => {
    console.log('onMouseDown');
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    if(ref.current){
      dispatch(setDragging(true));
      const element = ref.current;
      element.style.pointerEvents = 'none';
    }
  }, [dispatch, handleMouseMove, handleMouseUp, ref]);

  useEffect(() => {
    const element = ref.current
    if(element){
      element.addEventListener('mousedown', handleMouseDown);
    }
    return ()=>{
      if(element){
        element.removeEventListener('mousedown', handleMouseDown)
      }
    }
  }, [ref, handleMouseDown]);

  const drag = {
    ref
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