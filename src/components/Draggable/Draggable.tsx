import React, { useEffect, useRef, } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { get_draggableDataById, select_draggableData, userIsDraggingDraggable, select_dragStatus, select_dropPosition } from '../../redux/dragDrop/selectors';
import { vector, dragStatus } from '../../redux/dragDrop/dragDrop';


import extractElement from './extractElement';

import blockEvents from './blockEvents';

import { dragStart, dragEnd, dragOver, dragInit, dragFinish } from '../../redux/dragDrop/actions';
import get_draggableData from './get_draggableData';


import get_dragOver from './get_dragOver';
// import { draggableData } from '../../redux/dragDrop/dragDrop.d';


interface Props {
  children: any;
  draggableId: string;
  draggableIndex: number;
}

const Draggable = ({draggableId, draggableIndex, children}: Props) => {
  // console.log(`%cDraggable ${draggableId}`, 'color: white; background-color: green; padding: 1rem;');

  const dispatch = useDispatch();
  
  const ref = React.createRef<HTMLElement | null>();

  const mouseDownListener = useRef(false);
  const mouseMoveListener = useRef(false);
  const mouseUpListener = useRef(false);

  const elementIsExtracted = useRef(false);

  const dragOverId = useRef<string | null>(null);
  
  const dragStatus = useSelector(select_dragStatus);
  
  const draggableData = useSelector(select_draggableData);
  
  const userIsDraggingThis = (draggableData && draggableData.id === draggableId) || false;

  const dropPosition = useSelector(select_dropPosition)

  useEffect(() => {
    const element = ref.current;
    const handleMouseDown = (event: MouseEvent) => {
      if(element){
        mouseDownListener.current = false;
        const draggableData = get_draggableData(event, element, draggableId, draggableIndex);
        const droppableId = get_dragOver(event);
        dispatch(dragInit(draggableData, droppableId));
      }
    }
    const handleMouseMove = (event: MouseEvent) => {
      if(element && draggableData){
        const position = {x: event.clientX, y: event.clientY};
        element.style.left = (position.x - draggableData.margin.left - (draggableData.width/2) ) + 'px';
        element.style.top = (position.y - draggableData.margin.top - (draggableData.height/2)) + 'px';
        const droppableId = get_dragOver(event);
        if(dragOverId.current !== droppableId){
          dragOverId.current = droppableId;
          dispatch(dragOver(droppableId));    
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
        
        dispatch(dragEnd())
        // dispatch(dragFinish());
      }
    }
    // console.log(element)
    // console.log(ref.current);
    if(element){
      if(element.style.userSelect !== 'none') element.style.userSelect = 'none';
      if(dragStatus === null && !mouseDownListener.current){
        element.addEventListener('mousedown', handleMouseDown, {once: true});
        mouseDownListener.current = true;
      } else {
        if(draggableData){
          switch(dragStatus){
            case 'init': {
              if(!userIsDraggingThis) blockEvents(element);
              extractElement(element, draggableData);
              dispatch(dragStart());
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
            case 'drop': {
              console.log(dropPosition)
              if(dropPosition){
                element.style.left = (dropPosition.x - draggableData.margin.left) + 'px';
                element.style.top = (dropPosition.y - draggableData.margin.top) + 'px';
                dispatch(dragFinish());
              }
              break;
            }
            case 'cancel': {
              element.style.left = (draggableData.x - draggableData.margin.left) + 'px';
              element.style.top = (draggableData.y - draggableData.margin.top) + 'px';
              dispatch(dragFinish());
              break;
            }
          }
        }
      }
    }
    // return () => {
    //   if(element){
    //     // console.log('hallooo')
    //     if(dragStatus === null && mouseDownListener.current){
    //       element.removeEventListener('mousedown', handleMouseDown);
    //       mouseDownListener.current = false;
    //     } else {
    //       switch(dragStatus){
    //         case 'init': {
    //           //
    //         }
    //       }
    //     }
    //   }

      
    // }
  }, [
      ref, 
      dragStatus,
      draggableData,
      userIsDraggingThis,
      dispatch,
      draggableId,
      draggableIndex
     ]);

  // useEffect(()=>{
  //   console.log('useEffect1');
  //   console.log('Add mouseDown listener<All>:')
  //   const element = ref.current;
  //   if(element && !listenMouseDown.current && !userIsDragging) {
  //     console.log('useEffect1_inner');
  //     element.addEventListener('mousedown', handleMouseDown);
  //     listenMouseDown.current = true;
  //   }
  //   return () => {
  //     console.log('useEffect1_cleanup');
  //     if(element && listenMouseDown.current) {
  //       console.log('useEffect1_cleanup_inner');
  //       element.removeEventListener('mousedown', handleMouseDown);
  //       listenMouseDown.current = false;
  //     }
  //   }
  // }, [ref, userIsDragging, handleMouseDown]);

  // useEffect(() => {
  //   console.log('useEffect2');
  //   console.log('Block input user events<All>:')
  //   const element = ref.current;
  //   if(element && userIsDragging){
  //     console.log('useEffect2_inner');
  //     if(userIsDraggingThis) element.style.userSelect = 'none';
  //     else blockEvents(element);
  //     // blockEvents(element);
  //   }
  //   return () => {
  //     console.log('useEffect2_cleanup');
  //     if(element && !userIsDragging){
  //       console.log('useEffect2_cleanup_inner');
  //       unblockEvents(element);
  //     }
  //   }
  // }, [ref, userIsDraggingThis, userIsDragging])

  // useEffect(() => {
  //   console.log('useEffect3');
  //   console.log('Extract draggable<Current>:');
  //   const element = ref.current;
  //   if(element && userIsDraggingThis && draggableData && !elementIsExtracted.current){
  //     console.log('useEffect3_inner');
  //     extractElement(element, draggableData);
  //     // const droppableId = get_dragOver(event);
  //     // const droppableId = null;
  //     // dispatch(dragStart(draggableData, droppableId));
  //     // elementIsExtracted.current = true;
  //   }
  // }, [ref, userIsDraggingThis, draggableData, elementIsExtracted, dispatch]);


  // useEffect(() => {
  //   console.log('useEffect4');
  //   console.log('Add listeners<Current>:')
  //   const element = ref.current;
  //   if(element && userIsDraggingThis && !listenMouseMove.current && !listenMouseUp.current){
  //     console.log('useEffect4_inner');
  //     document.addEventListener('mousemove', handleMouseMove);
  //     listenMouseMove.current = true;
  //     document.addEventListener('mouseup', handleMouseUp);
  //     listenMouseUp.current = true;
  //   }
  //   return () => {
  //     console.log('useEffect4_cleanup');
  //     if(userIsDragging && listenMouseMove.current && listenMouseUp.current){
  //       console.log('useEffect4_cleanup_inner');
  //       document.removeEventListener('mousemove', handleMouseMove);
  //       listenMouseMove.current = false;
  //       document.removeEventListener('mouseup', handleMouseUp);
  //       listenMouseUp.current = false;
  //     }
  //   }
  // }, [ref, userIsDragging, userIsDraggingThis, handleMouseMove, handleMouseUp]);

  



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