import React, { useEffect, useRef, } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { select_draggableData, select_status, select_dropPosition, select_dragEndReason } from '../../redux/dragDrop/selectors';
// import { T_vector } from '../../redux/dragDrop/dragDrop';


import extractElement from './extractElement';

import blockEvents from './blockEvents';


import { updateState } from '../../redux/dragDrop/actions';
import get_draggableData from './get_draggableData';


import get_hoverId from './get_hoverId';

interface Props {
  children: any;
  draggableId: string;
  draggableIndex: number;
  onDragEnd?: () => void;
}

const Draggable = ({draggableId, draggableIndex, onDragEnd, children}: Props) => {
  // console.log(`%cDraggable ${draggableId}`, 'color: white; background-color: green; padding: 1rem;');
  const dispatch = useDispatch();
  const ref = React.createRef<HTMLElement | null>();

  const dragStatus = useSelector(select_status);
  const draggableData = useSelector(select_draggableData);
  const dropPosition = useSelector(select_dropPosition);
  const dragEndReason = useSelector(select_dragEndReason);

  const hoverId = useRef<string | null>(null);
  const userIsDraggingThis = (draggableData && draggableData.id === draggableId) || false;
  
  const mouseDownListener = useRef(false);
  const mouseMoveListener = useRef(false);
  const mouseUpListener = useRef(false);

  useEffect(() => {
    const element = ref.current;
    const handleMouseDown = (event: MouseEvent) => {
      if(element){
        mouseDownListener.current = false;
        const draggableData = get_draggableData(event, element, draggableId, draggableIndex);
        const droppableId = get_hoverId(event);
        dispatch(updateState('init', droppableId, draggableData));
      }
    }
    const handleMouseMove = (event: MouseEvent) => {
      if(element && draggableData){
        const position = {x: event.clientX, y: event.clientY};
        element.style.left = (position.x - draggableData.margin.left - (draggableData.width/2) ) + 'px';
        element.style.top = (position.y - draggableData.margin.top - (draggableData.height/2)) + 'px';
        const droppableId = get_hoverId(event);
        if(hoverId.current !== droppableId){
          hoverId.current = droppableId;
          dispatch(updateState('hover', droppableId)); 
        }
      }
    }
    const handleMouseUp = (event: MouseEvent) => {
      if(element){
        // element.setAttribute('style', '');
        // elementIsExtracted.current = false;

        document.removeEventListener('mousemove', handleMouseMove);
        mouseMoveListener.current = false;
        document.removeEventListener('mouseup', handleMouseUp);
        mouseUpListener.current = false;
        dispatch(updateState('stop', hoverId.current ? 'drop' : 'cancel'));
      }
    }
    
    if(element){
      if(element.style.userSelect !== 'none') element.style.userSelect = 'none';
      if(dragStatus === 'inactive' && !mouseDownListener.current){
        element.addEventListener('mousedown', handleMouseDown, {once: true});
        mouseDownListener.current = true;
      } else {
        if(draggableData){
          switch(dragStatus){
            case 'init': {
              if(!userIsDraggingThis) blockEvents(element);
              extractElement(element, draggableData);
              dispatch(updateState('active'));
              break;
            }
            case 'active': {
              if(!mouseMoveListener.current){
                document.addEventListener('mousemove', handleMouseMove);
                mouseMoveListener.current = true;
              }
              if(!mouseUpListener.current){
                document.addEventListener('mouseup', handleMouseUp);
                mouseUpListener.current = true;
              }
              break;
            }
            case 'stop': {
              switch(dragEndReason){
                case 'cancel': {
                  element.style.left = (draggableData.x - draggableData.margin.left) + 'px';
                  element.style.top = (draggableData.y - draggableData.margin.top) + 'px';
                  dispatch(updateState('inactive'));
                  break;
                }
                case 'drop': {
                  if(dropPosition){
                    console.log('%cecho!', 'background-color: yellow; color: black; padding: 4px;');
                    element.style.left = (dropPosition.x - draggableData.margin.left) + 'px';
                    element.style.top = (dropPosition.y - draggableData.margin.top) + 'px';
                    dispatch(updateState('inactive'));
                  }
                  break;
                }
              }
              if(onDragEnd) onDragEnd();
              break;
            }
          }
        }
      }
    }
  }, [
      ref, 
      dragStatus,
      draggableData,
      userIsDraggingThis,
      dispatch,
      draggableId,
      draggableIndex,
      dropPosition,
      dragEndReason,
      onDragEnd
     ]);

  const exportedData = {
    ref,
    userIsDraggingThis
  }

  return (
    <React.Fragment>
      {children(exportedData)}
    </React.Fragment>
  )
};

export default Draggable;