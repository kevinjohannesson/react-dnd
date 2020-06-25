import React, { useEffect, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDraggableDataById, isUserDragging } from '../../redux/dragDrop/selectors';
import { vector } from '../../redux/dragDrop/dragDrop';

import mouseMove from './mouseMove';
import mouseDown from './mouseDown';
import mouseUp from './mouseUp';

import extractElement from './extractElement';

import blockEvents from './blockEvents';
import unblockEvents from './unblockEvents';


interface Props {
  children: any;
  draggableId: string;
  draggableIndex: number;
}

const Draggable = ({draggableId, draggableIndex, children}: Props) => {

  const dispatch = useDispatch();
  
  const ref = React.createRef<HTMLElement | null>();
  
  const userIsDragging = useSelector(isUserDragging);
  const draggableData = useSelector(getDraggableDataById(draggableId));

  const dragoverId = useRef<string | null>(null);
  const destination = useRef<vector | null>(null);

  
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if(ref.current) mouseMove(event, ref.current, dragoverId, dispatch);
  }, [ref, dragoverId, dispatch]);

  const handleMouseUp = useCallback((event: MouseEvent) => {
    if(ref.current) mouseUp(event, ref.current, destination, dragoverId, handleMouseMove, dispatch);
  }, [ref, destination, handleMouseMove, dispatch]);

  const handleMouseDown = useCallback((event: MouseEvent) => {
    if(ref.current) mouseDown(event, ref.current, draggableId, draggableIndex, destination, dispatch);
  }, [ref, draggableId, draggableIndex, destination, dispatch]);


  useEffect(() => {
    const element = ref.current;
    if(element) element.addEventListener('mousedown', handleMouseDown);
    return () => { if(element) element.removeEventListener('mousedown', handleMouseDown); };
  }, [ref, handleMouseDown]);

  useEffect(() => {
    const element = ref.current;
    if(element){
      if(userIsDragging) blockEvents(element);
      else unblockEvents(element);
    }
  }, [userIsDragging, ref]);

  useEffect(() => {
    const element = ref.current;
    if(userIsDragging && draggableData && element){
        extractElement(element, draggableData);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      if(!userIsDragging && element){
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      }
    }
  }, [userIsDragging, draggableData, ref, handleMouseMove, handleMouseUp]);


  const exportedData = {
    ref,
    isDragging: draggableData ? true : false
  }

  return (
    <React.Fragment>
      {children(exportedData)}
    </React.Fragment>
  )
};

export default Draggable;