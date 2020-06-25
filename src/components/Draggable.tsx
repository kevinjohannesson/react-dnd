import React, { useEffect, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setHover, dragStart, dragEnd } from '../redux/dragDrop/actions';
import { getDroppables, getDraggableById } from '../redux/dragDrop/selectors';
import { Idestination } from '../redux/dragDrop/dragDrop.d';
import styled from 'styled-components';


interface Props {
  children: any;
  draggableId: string
}

const Draggable = ({draggableId, children}: Props) => {
  // console.log(`%cDraggable ${draggableId}`, 'color: white; background-color: green; padding: 1rem;');
  const dispatch = useDispatch();
  
  const ref = React.createRef<HTMLDivElement>();

  const placeholderRef = React.createRef<HTMLDivElement>();

  const draggable = useSelector(getDraggableById(draggableId));

  const hoveredDroppable = useRef<string | null>(null);
  
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
    // console.log('onMouseUp');
    if(draggable){
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      if(ref.current && destination.current){
        const element = ref.current;
        
        const handleTransitionEnd = () => {
          element.style.transition = '';
          element.style.transform = '';
          element.style.zIndex = '';
          element.removeEventListener('transitionend', handleTransitionEnd);
          dispatch(dragEnd());
        }

        element.addEventListener('transitionend', handleTransitionEnd );

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
      
      element.style.transition = `transform ${0.1 + (time > 1 ? 1 : time)/2}s ease`;
      element.style.transform = `translate(${translation.x}px, ${translation.y}px)`;

    }
  }
  }, [handleMouseMove, ref, dispatch, draggable, destination]);

  const handleMouseDown = useCallback( (event: MouseEvent) => {
    // console.log('onMouseDown');
    if(ref.current){
      const DOMRect = ref.current.getBoundingClientRect();
      
      const margin = window.getComputedStyle(ref.current, null).getPropertyValue("margin");
      // const computedMargin = window.getComputedStyle(ref.current, null).getPropertyValue("margin");
      // const marginValues = computedMargin.match(/-?\d+/g);  
      // const margin = {
      //   top: marginValues ? parseInt(marginValues[0]) : 0,
      //   right: marginValues ? parseInt(marginValues[1] || marginValues[0]) : 0,
      //   bottom: marginValues ? parseInt(marginValues[2] || marginValues[0]) : 0,
      //   left: marginValues ? parseInt(marginValues[3] || marginValues[1] || marginValues[0]) : 0,
      // }

      const data = {
          id: draggableId,
          height: DOMRect.height,
          width: DOMRect.width,
          x: DOMRect.x,
          y: DOMRect.y,
          margin
      }
      
      destination.current = data;

      dispatch(dragStart(data))
    }
  }, [dispatch, ref, draggableId]);

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
    if(draggable && draggable.id === draggableId) {
      const element = ref.current;
      if(element){
        // console.log(draggable);
        // console.dir(element);
        // console.dir(element.getBoundingClientRect());
        // console.log(element.offsetLeft - element.scrollLeft + element.clientLeft)
        // const translation = element.style.transform.match(/-?\d+/g)
        // const marginProperty = window.getComputedStyle(element, null).getPropertyValue("margin");
        // const cssMargin = marginProperty.match(/-?\d+/g);
        // console.log(cssMargin);
        
        // const margin = {
        //   top: 0,
        //   right: 0,
        //   bottom: 0,
        //   left: 0,
        // }
        // if(cssMargin){
        //   switch(cssMargin.length){
        //     case 1: {
        //       margin.top = parseInt(cssMargin[0]);
        //       margin.right = parseInt(cssMargin[0]);
        //       margin.bottom = parseInt(cssMargin[0]);
        //       margin.left = parseInt(cssMargin[0]);
        //       break;
        //     }
        //     case 2: {
        //       margin.top = parseInt(cssMargin[0]);
        //       margin.right = parseInt(cssMargin[1]);
        //       margin.bottom = parseInt(cssMargin[0]);
        //       margin.left = parseInt(cssMargin[1]);
        //       break;
        //     }
        //     case 3: {
        //       margin.top = parseInt(cssMargin[0]);
        //       margin.right = parseInt(cssMargin[1]);
        //       margin.bottom = parseInt(cssMargin[2]);
        //       margin.left = parseInt(cssMargin[1]);
        //       break;
        //     }
        //     case 4: {
        //       margin.top = parseInt(cssMargin[0]);
        //       margin.right = parseInt(cssMargin[1]);
        //       margin.bottom = parseInt(cssMargin[2]);
        //       margin.left = parseInt(cssMargin[3]);
        //       break;
        //     }
        //   }
        // }

        // console.log(margin)
        // const root = document.getElementById('root');
        // const clone = element.cloneNode(false) as HTMLDivElement;
        // // const placeholder = <div style={{backgroundColor: 'green', height: draggable.height + 'px', width: draggable.width + 'px'}}/>
        // // const placeholder = React.createElement('div', {style:{height: draggable.height + 'px', width: draggable.width + 'px', backgroundColor: 'green'}})
        // const placeholder = document.createElement('div');
        // placeholder.style.height = draggable.height + 'px';
        // placeholder.style.width = draggable.width + 'px';
        // placeholder.style.margin = marginProperty;
        // placeholder.style.border = '2px dashed white';
        // placeholder.style.backgroundColor = 'rgba(255,255,255,0.3)';
        // placeholder.style.borderRadius = '25px';

        // element.style.top = draggable.y-margin.top + 'px';
        // element.style.left = draggable.x-margin.left + 'px';
        // element.style.position = 'absolute';
        // const parent = element.parentElement;
        // parent?.insertBefore((placeholder), element);
        // root?.appendChild(element);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      }
      return () => {
        if(element){
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        }
      }
    }
  }, [handleMouseMove, handleMouseUp, ref, draggableId, draggable])


  const draggableData = {
    ref,
    isDragging: draggable ? true : false
  }

  return (
    <React.Fragment>
      {children(draggableData)}
    </React.Fragment>
  )
};

export default Draggable;

const PLACEHOLDER = styled.div<{height: number, width: number}>`
  width: ${props => props.width + 'px'};
  height: ${props => props.height + 'px'};
  background-color: rgba(255,255,255,0.3);
  border: 3px dashed white;

  border-radius: ${props => props.height/10 + 'px'};

  pointer-events: none;

  transition: width, height, 0.1s ease;
`;

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