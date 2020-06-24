import React, { useEffect, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setHover, dragStart, dragEnd } from '../redux/dragDrop/actions';
import { getDroppables, userIsDragging, getDraggable } from '../redux/dragDrop/selectors';
import { Idestination } from '../redux/dragDrop/dragDrop.d';


interface Props {
  children: any;
}

const Draggable = ({children}: Props) => {
  // console.log('%cDraggable', 'color: white; background-color: green; padding: 1rem;');
  const dispatch = useDispatch();
  
  const ref = React.createRef<HTMLDivElement>();

  const draggable = useSelector(getDraggable);

  const hoveredDroppable = useRef<string | null>(null);

  const isDragging = useSelector(userIsDragging);

  const destination = useRef<Idestination | null>(null);

  const droppables = useSelector(getDroppables);

  const handleMouseMove = useCallback( (event: MouseEvent) => {
    // console.log('onMouseMove');
    if(ref.current){
      const mouse = getMouseInformation(event);
      translateElement(ref.current, mouse.movement);

      const elements = document.elementsFromPoint(event.clientX, event.clientY);
      
      if(elements.length !== 0){
        const droppable = droppables.find(droppable => (elements[1] as HTMLDivElement).hasAttribute('data-droppableId'));
      
        if(droppable){
          if(hoveredDroppable.current !== droppable){
            hoveredDroppable.current = droppable;
            dispatch(setHover(droppable));
          }
        }
        else {
          if(hoveredDroppable.current !== null){
            hoveredDroppable.current = null;
            dispatch(setHover(null));
          }
        }
      }
    }
  }, [ref, droppables, dispatch, hoveredDroppable]);

  const handleMouseUp = useCallback( (event: MouseEvent) => {
    // console.log('onMouseUp')''
    if(draggable){
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);

    if(ref.current && destination.current){
      const element = ref.current;
      
      element.addEventListener('transitionend', () => {
        element.style.transition = '';
        element.style.transform = '';
        dispatch(dragEnd());
      });

      element.style.pointerEvents = '';

      const ref_DOMRect = ref.current.getBoundingClientRect();
      const start = {
        x: ref_DOMRect.x,
        y: ref_DOMRect.y
      };
      
      if(hoveredDroppable.current){
        const placeholder = document.querySelector(`[data-placeholder=${hoveredDroppable.current}]`);
        if(placeholder) {
          const placeholder_DOMRect = placeholder.getBoundingClientRect();
          const {x, y} = placeholder_DOMRect;
          destination.current = {x, y};
        }
      }

      const distance = Math.sqrt( 
        (Math.pow( (start.x - destination.current.x), 2 ) ) +
        (Math.pow( (start.y - destination.current.y), 2 ) )
      );

      const translation = {
        x: -(draggable.x - destination.current.x),
        y: destination.current.y - draggable.y,
      };
     
      const time = distance / 1000;
      
      element.style.transition = `transform ${0.1 + (time > 1 ? 1 : time)}s ease`;
      element.style.transform = `translate(${translation.x}px, ${translation.y}px)`;

    }
  }
  }, [handleMouseMove, ref, dispatch, draggable, destination]);

  const handleMouseDown = useCallback( (event: MouseEvent) => {
    // console.log('onMouseDown');
    if(ref.current){
      const DOMRect = ref.current.getBoundingClientRect();
      
      const data = {
          height: DOMRect.height,
          width: DOMRect.width,
          x: DOMRect.x,
          y: DOMRect.y
      }
      
      destination.current = data;
      
      dispatch(dragStart(data))
    }
  }, [dispatch, ref]);

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

  useEffect(()=>{
    const element = ref.current;
    if(element && isDragging){
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      if(element){
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      }
    }
  }, [handleMouseMove, handleMouseUp, ref, isDragging])


  const draggableData = {
    ref,
    isDragging
  }

  return (
    <React.Fragment>
      {children(draggableData)}
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