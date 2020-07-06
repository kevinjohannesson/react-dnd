import React, { useContext, useEffect, useRef, useCallback, } from 'react'
// import { T_vector } from '../../redux/dragDrop/dragDrop';

// import { ThemeContext } from 'styled-components';
import { DragDropContext } from '../Context/Context';
import echo, { diff } from '../../echo';
import { DroppableContext } from '../Droppable/Droppable';
import { useDispatch, useSelector } from 'react-redux';
// import get_draggableData from '../Context/get_draggableData';
import { dragInit, dragEnd, 
  // dragFinish, 
  dragActive } from '../../redux/dragDrop/actions';
import { select_status, userIsDraggingThis, select_hoveredDroppableId } from '../../redux/dragDrop/selectors';
import { T_vector } from '../../redux/dragDrop/dragDrop.d';



interface Props {
  children: any;
  draggableId: string;
  draggableIndex: number;
}

const Draggable = ({draggableId, draggableIndex, children}: Props) => {
  // console.log(`Draggable #${draggableId}...`);
  echo(`Draggable component init #${draggableId}`, draggableId);
  const ref = React.createRef<HTMLDivElement>();
  const refError = (origin: string) => console.error('Unable to locate DOM element', origin);
  const context = useContext(DragDropContext);
  const droppableContext = useContext(DroppableContext);

  const status = useSelector(select_status);
  const isBeingDragged = useSelector(userIsDraggingThis(draggableId));

  const dispatch = useDispatch();

  const hasMouseDownListener = useRef(false);
  const hasMouseMoveListener = useRef(false);
  const hasMouseUpListener = useRef(false);
  const dragOrigin = useRef<T_vector | null>(null)

  const isHovering = useSelector(select_hoveredDroppableId);
  const draggable = droppableContext ? context.add_draggable(draggableId, draggableIndex, droppableContext.id, ref) : null;
  console.log(draggable);

  // if(droppableContext){
  //   testRef.current = context.test(draggableId, droppableContext.id).current
  // } else console.error('Unable to locate droppableContext');
  // useEffect(()=>{
  //   if(droppableContext){
  //     echo('Adding draggable to the context', draggableId, 1);
  //     context.add_draggable(draggableId, draggableIndex, droppableContext.id, ref);
  //   } else {
  //     console.error('Cannot find droppableContext.');
  //   } 
  // },[droppableContext, context, draggableId, draggableIndex, ref])

  // console.log(droppableContext);
    

  const handleMouseDown = useCallback((e: MouseEvent) => {
    echo('handleMouseDown', draggableId+'mouseDown');
    
    // document.body.style.border = '10px solid blue';
    if(droppableContext){
      if(ref.current){
        echo(`Setting cursor to grabbing for document.body`, draggableId, 2);
        ref.current.style.cursor = '';
        document.body.style.cursor = 'grabbing';
        // echo('Calculating draggable data for:', draggableId+'mouseDown', 1);
        // console.dir(ref.current);
        // const draggableData = get_draggableData(ref.current);
        // console.log('draggableData', draggableData);
        echo('Storing cursor position', draggableId+'mouseDown', 1);
        dragOrigin.current = {x: e.clientX, y: e.clientY};
        console.log(dragOrigin.current);
        echo('Dispatching dragInit', draggableId+'mouseDown', 1);
        dispatch(dragInit(droppableContext.id, draggableId));
        hasMouseDownListener.current = false;
        
      } else refError('handleMouseDown');
    } else console.error('Unable to locate droppableContext');
  }, [droppableContext, ref, draggableId, dragOrigin, dispatch]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    echo(`handleMouseMove, dragging ${draggableId}`, draggableId+'mousemove');
    const threshold = 10;
    if(dragOrigin.current){
      if( 
        diff(e.clientX, dragOrigin.current.x) > threshold ||
        diff(e.clientY, dragOrigin.current.y) > threshold
        ) {
          echo(`Removing eventListener: mousemove from document for draggableId: ${draggableId}`, draggableId+'mousemove', 1);
          document.removeEventListener('mousemove', handleMouseMove);
          hasMouseMoveListener.current = false;
          echo('Dispatching dragActive', draggableId+'mousemove', 1);
          dispatch(dragActive())
        }
    }
  }, [draggableId, dragOrigin, dispatch]);

  const handleMouseUp = useCallback(() => {
    echo('handleMouseUp', draggableId+'mouseup');
    if(hasMouseMoveListener.current){
      echo(`Removing eventListener: mousemove from document for draggableId: ${draggableId}`, draggableId+'mouseup', 1);
      document.removeEventListener('mousemove', handleMouseMove);
      hasMouseMoveListener.current = false;
    }
    echo('Dispatching dragEnd', draggableId+'mouseup', 1);
    dispatch(dragEnd('cancel'));
  }, [draggableId, handleMouseMove, dispatch]);

  useEffect(() => {
    echo('Draggable useEffect #1', draggableId, 1);
    const element = ref.current;
    if(element) {
      switch(status){
        case 'inactive': {
          // if(droppableContext){
          //   echo('Adding draggable to the context', draggableId, 1);
          //   context.add_draggable(draggableId, draggableIndex, droppableContext.id, ref);
          // } else {
          //   console.error('Cannot find droppableContext.');
          // } 

          if(!hasMouseDownListener.current){
            echo(`Adding eventListener: mousedown to draggableId: ${draggableId}`, draggableId, 2);
            element.addEventListener('mousedown', handleMouseDown, {once: true});
            hasMouseDownListener.current = true;
          }
          if(element.style.userSelect !== 'none') {
            echo('Setting userSelect to none', draggableId, 2);
            element.style.userSelect = 'none';
          }

          if(element.style.cursor !== 'grab'){
            echo(`Setting cursor to 'grab' for element`, draggableId, 2);
            element.style.cursor = 'grab';
          }

          break;
        }
        case 'init': {
          if(isBeingDragged){
            if(!hasMouseMoveListener.current){
              echo(`Adding eventListener: mousemove to document for draggableId: ${draggableId}`, draggableId, 2);
              document.addEventListener('mousemove', handleMouseMove);
              hasMouseMoveListener.current = true;
            }
            if(!hasMouseUpListener.current){
              echo(`Adding eventListener: mouseup to document for draggableId: ${draggableId}`, draggableId, 2);
              document.addEventListener('mouseup', handleMouseUp, {once: true});
              hasMouseUpListener.current = true;
            }
            
          }
          break;
        }

        
        case 'end': {
          //   echo(`Setting cursor to '' for document.body`, draggableId, 2);
          //   document.body.style.cursor = '';
          if(!isBeingDragged){
            echo(`Resetting component`, draggableId, 2);
            element.setAttribute('style', '');
        //     echo('Dispatching dragFinish', draggableId, 2);
        //     dispatch(dragFinish());
          }

        }
      }
    } else refError('useEffects #2');

    return () => {
      if(element){
        switch(status){
          case 'inactive': {
            if(hasMouseDownListener.current){
              echo(`Removing eventListener: mousedown from element for draggableId: ${draggableId}`, draggableId, 2);
              element.removeEventListener('mousedown', handleMouseDown);
              hasMouseDownListener.current = false;
            } 
            break;
          }
          case 'init': {
            if(isBeingDragged){
              if(hasMouseMoveListener.current){
                echo(`Removing eventListener: mousemove from element for draggableId: ${draggableId}`, draggableId, 2);
                document.removeEventListener('mousemove', handleMouseMove);
                hasMouseMoveListener.current = false;
              }
              if(hasMouseUpListener.current){
                echo(`Removing eventListener: mouseup from element for draggableId: ${draggableId}`, draggableId, 2);
                document.removeEventListener('mouseup', handleMouseUp);
                hasMouseUpListener.current = false;
              }
              echo(`Setting pointerEvents to none for draggableId: ${draggableId}`, draggableId, 2);
              element.style.pointerEvents = 'none'
              
            } else {
              echo(`Setting pointerEvents to none for draggableId: ${draggableId}`, draggableId, 2);
              element.style.pointerEvents = 'none'
            }
            break;
          }
        }
      }
    }
  }, [
    context, draggableIndex, droppableContext,
    ref, 
    status, 
    draggableId, 
    handleMouseDown,
    isBeingDragged,
    handleMouseMove,
    handleMouseUp,
    dispatch,
  ]);



  


  // const handleClick = useCallback(() => {
  //   console.log(Math.random())
  //   set_state(!state);  
  // }, [state]);

  // useEffect(()=>{
  //   echo('Draggable useEffect #2', 'gold', 1);
  //   // if(ref.current) {
  //   //   echo('Adding listener:', 'gold', 2);
  //   //   ref.current.addEventListener('click', handleClick)
  //   // }
  // }, [ref, handleClick])



  
  
  
  // useEffect(() => {
  //   console.log('#2 draggable UE');
  //   // context.add_draggable(draggableRef);
  // }, [
  //      draggableRef,
  //      context,
  //    ]);

  const exportedData = {
    ref,
    userIsDraggingThis: isBeingDragged,
    isHovering,
  }

  return (
    <React.Fragment>
      {children(exportedData)}
    </React.Fragment>
  )
};

export default Draggable;