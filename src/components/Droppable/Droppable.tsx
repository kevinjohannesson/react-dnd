import React, { ReactElement, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isUserDragging, isUserDraggingOver } from '../../redux/dragDrop/selectors';
import styled from 'styled-components';

interface Props {
  children: any;
  droppableId: string;
}

export default function Droppable({droppableId, children}: Props): ReactElement {
  console.log(`%cDroppable ${droppableId}`, 'color: white; background-color: orange; padding: 1rem;');
  const dispatch = useDispatch();
  
  const ref = React.createRef<HTMLDivElement>();
  
  const userIsDragging = useSelector(isUserDragging);
  // console.log(droppableId)
  const userIsDraggingOver = useSelector(isUserDraggingOver(droppableId));
  // console.log('userIsDraggingOver', userIsDraggingOver)
  const placeholderRef = React.createRef<HTMLDivElement>();
  
  
  const draggable = {height: 100, width: 100}

  useEffect(() => {
    const element = ref.current;
    if(element) {
      if(!element.hasAttribute('[data-droppableId')) {
        element.setAttribute('data-droppableId', droppableId);
      }
    } 
  }, [ref, droppableId]);

  

  // useEffect(() => {
  //   const droppableIsStored = droppables.some(id => id === droppableId)
  //   if(!droppableIsStored){
  //     const element = ref.current;
  //     if(element){
  //       element.setAttribute('data-droppableId', droppableId);
  //       dispatch(addDroppable(droppableId));
  //     }
  //   }
  //   return () => {
  //     // cleanup
  //   }

  // }, [ref, dispatch, droppableId, droppables]);

  


  // useEffect(()=>{
  //   if(draggable && placeholderRef.current){
  //     // const placeholder = placeholderRef.current;
  //     // const parent = placeholder.parentElement;
  //     // if(parent){
  //     //   placeholder.style.width = draggable.width + 'px';
  //     //   placeholder.style.height = draggable.height + 'px';
  //     //   placeholder.style.margin = draggable.margin;

  //     //   parent.insertBefore(placeholder, parent.childNodes[draggable.index+1]);
  //     //   // console.log('hallo world')
  //     // }
  //     // console.log(placeholderRef.current.parentElement)

  //   }
  // },[placeholderRef, draggable])


  
  const placeholder = <PLACEHOLDER 
    ref={placeholderRef}
    userIsDragging={userIsDragging}
    userIsDraggingOver={userIsDraggingOver} 
    height={draggable ? draggable.height : 0} 
    width={draggable ? draggable.width : 0} 
    data-placeholder={droppableId}
  />


  const droppableData: interface_droppableData = {
    ref, 
    userIsDragging,
    userIsDraggingOver,
    placeholder,
  }
  return (
    <React.Fragment>
      {children(droppableData as interface_droppableData)}
    </React.Fragment>
  )
}

const PLACEHOLDER = styled.div<{height: number, width: number, userIsDraggingOver: boolean, userIsDragging: boolean}>`
  width: ${props => (props.userIsDragging && props.userIsDraggingOver) ? props.width + 'px' : '0px'};
  height: ${props => (props.userIsDragging && props.userIsDraggingOver) ? props.height + 'px' : '0px'};
  background-color: rgba(255,255,255,0.3);
  border: ${props => (props.userIsDragging && props.userIsDraggingOver) ? '3px dashed white' : ''};

  border-radius: ${props => props.height/10 + 'px'};

  pointer-events: none;
  user-select: none;

  transition: width, height, 0.1s ease;
`

export interface interface_droppableData {
  ref: React.RefObject<HTMLDivElement>;
  userIsDragging: boolean;
  userIsDraggingOver: boolean;
  placeholder: any;
}

