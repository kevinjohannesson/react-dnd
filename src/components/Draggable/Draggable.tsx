import React, { useEffect, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { get_draggableDataById, isUserDragging, select_draggableData, userIsDraggingDraggable } from '../../redux/dragDrop/selectors';
import { vector } from '../../redux/dragDrop/dragDrop';

import mouseMove from './mouseMove';
import mouseDown from './mouseDown';
import mouseUp from './mouseUp';

import extractElement from './extractElement';

import blockEvents from './blockEvents';
import unblockEvents from './unblockEvents';
import { dragStart, dragEnd } from '../../redux/dragDrop/actions';
import get_draggableData from './get_draggableData';


interface Props {
  children: any;
  draggableId: string;
  draggableIndex: number;
}

const Draggable = ({draggableId, draggableIndex, children}: Props) => {
  console.log(`%cDraggable ${draggableId}`, 'color: white; background-color: green; padding: 1rem;');

  const dispatch = useDispatch();
  
  const ref = React.createRef<HTMLElement | null>();

  const listenMouseDown = useRef(false);
  const listenMouseMove = useRef(false);
  const listenMouseUp = useRef(false);

  const userIsDragging = useSelector(isUserDragging);
  // const userIsDragging = 

  const draggableData = useSelector(select_draggableData);


  // console.log(listenMouseDown.current);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    console.log('handleMouseMove');
    // console.log(ref.current);
  }, [ref]);

  const handleMouseUp = useCallback((event: MouseEvent) => {
    console.log('handleMouseUp');
    console.log(ref.current);
    if(ref.current){
      document.removeEventListener('mousemove', handleMouseMove);
      listenMouseMove.current = false;
      document.removeEventListener('mouseup', handleMouseUp);
      listenMouseUp.current = false;
      
      dispatch(dragEnd())
    }
  }, [ref, handleMouseMove, dispatch]);

  const handleMouseDown = useCallback((event: MouseEvent) => {
    console.log('handleMouseDown');
    console.log(ref.current);
    if(ref.current) {
      const draggableData = get_draggableData(ref.current, draggableId, draggableIndex);
      console.log(draggableData);
      ref.current.removeEventListener('mousedown', handleMouseDown);
      listenMouseDown.current = false;
      dispatch(dragStart(draggableData));
    }
  }, [ref, dispatch, draggableId, draggableIndex]);

  

  useEffect(()=>{
    console.log('useEffect1');
    const element = ref.current;
    if(element && !listenMouseDown.current && !draggableData) {
      console.log('useEffect1_inner');
      element.addEventListener('mousedown', handleMouseDown);
      listenMouseDown.current = true;
    }
    return () => {
      console.log('useEffect1_cleanup');
      if(element && listenMouseDown.current) {
        console.log('useEffect1_cleanup_inner');
        element.removeEventListener('mousedown', handleMouseDown);
        listenMouseDown.current = false;
      }
    }
  }, [ref, draggableData, handleMouseDown]);

  useEffect(() => {
    console.log('useEffect2');
    const element = ref.current;
    // console.log(element);
    if(element && draggableData && draggableData.id === draggableId && !listenMouseMove.current && !listenMouseUp.current){
      console.log('useEffect2_inner');
      document.addEventListener('mousemove', handleMouseMove);
      listenMouseMove.current = true;
      document.addEventListener('mouseup', handleMouseUp);
      listenMouseUp.current = true;
    }
    return () => {
      console.log('useEffect2_cleanup');
      if(!draggableData && listenMouseMove.current && listenMouseUp.current){
        console.log('useEffect2_cleanup_inner');
        document.removeEventListener('mousemove', handleMouseMove);
        listenMouseMove.current = false;
        document.removeEventListener('mouseup', handleMouseUp);
        listenMouseUp.current = false;
      }
    }
  }, [ref, draggableData, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    console.log('useEffect3');
    const element = ref.current;
    if(element && draggableData){
      console.log('useEffect3_inner');
      if(draggableData.id === draggableId) element.style.userSelect = 'none';
      else blockEvents(element);
    }
    return () => {
      console.log('useEffect3_cleanup');
      if(element && draggableData){
        console.log('useEffect3_cleanup_inner');
        unblockEvents(element);
      }
    }
  })






  const exportedData = {
    ref,
    userIsDraggingThis: false
  }

  return (
    <React.Fragment>
      {children(exportedData)}
    </React.Fragment>
  )
};

export default Draggable;