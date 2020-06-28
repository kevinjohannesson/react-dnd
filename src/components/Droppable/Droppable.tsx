import React, { ReactElement, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { select_draggableData, select_status, is_dragOverId, select_dropPosition } from '../../redux/dragDrop/selectors';
import styled from 'styled-components';
// import { I_draggableData } from '../../redux/dragDrop/dragDrop.d';
import { updateState } from '../../redux/dragDrop/actions';

interface Props {
  children: any;
  droppableId: string;
  placeholderCSS?: {[key: string]: string};
}

export default function Droppable({droppableId, placeholderCSS, children}: Props): ReactElement {
  // console.log(`%cDroppable ${droppableId}`, 'color: white; background-color: orange; padding: 1rem;');
  const dispatch = useDispatch();
  
  const ref = React.createRef<HTMLDivElement>();
  
  // console.log(droppableId)
  // const userIsDraggingOver = useSelector(isUserDraggingOver(droppableId));
  // console.log('userIsDraggingOver', userIsDraggingOver)
  const placeholderRef = React.createRef<HTMLDivElement>();
  
  const draggable = useSelector(select_draggableData)
  // const draggable = {height: 100, width: 100}
  
  const dragStatus = useSelector(select_status);
  const userIsDragging = (draggable !== null && dragStatus === 'active');
  console.log(dragStatus);
  const isDragOver = useSelector(is_dragOverId(droppableId));
  const userIsDraggingOverThis = userIsDragging && isDragOver;
  console.log(userIsDraggingOverThis)

  const dropPosition = useSelector(select_dropPosition);

  useEffect(() => {
    const element = ref.current;
    if(element) {
      if(!element.hasAttribute('data-droppable')) {
        element.setAttribute('data-droppable', droppableId);
      }
    }
    
    if(placeholderRef.current && userIsDraggingOverThis && userIsDragging) {

      const DOMRect = placeholderRef.current.getBoundingClientRect();
      const pos = {
        x: DOMRect.x,
        y: DOMRect.y
      }
      console.log(pos);
      console.log(dropPosition)
      if(!dropPosition || dropPosition.x !== pos.x || dropPosition.y !== pos.y) dispatch(updateState('drop_position', pos));

    }

    // if(userIsDraggingOverThis) dispatch()
    if(dragStatus){
      switch(dragStatus){
        case 'init': {
          //
          break;
        }
        case 'active': {

        }

      }

    }

  }, [ref, droppableId, dragStatus, placeholderRef, userIsDraggingOverThis, userIsDragging, dispatch, dropPosition]);

  

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


  
  // const Placeholder = <PlaceholderElement 
  //   ref={placeholderRef} 
  //   userIsDragging={userIsDragging} 
  //   userIsDraggingOverThis={userIsDraggingOverThis} 
  //   draggable={draggable} 
  // />;
  // const placeholder = React.cloneElement(
  //   Placeholder,
  //   [{userIsDragging: userIsDragging, 
  //     userIsDraggingOverThis: userIsDraggingOverThis, 
  //     draggable: draggable}],
  //   [...children]
  // )
  const placeholder = <PLACEHOLDER 
    ref={placeholderRef}
    userIsDragging={userIsDragging}
    userIsDraggingOverThis={userIsDraggingOverThis} 
    height={draggable && userIsDraggingOverThis ? draggable.height : 0} 
    width={draggable && userIsDraggingOverThis ? draggable.width : 0} 
    margin={draggable && userIsDraggingOverThis ? draggable.margin.all : 0}
    data-placeholder={droppableId}
    css={placeholderCSS}
  />


  const droppableData: interface_droppableData = {
    ref, 
    userIsDragging,
    userIsDraggingOverThis,
    placeholder,
  }
  return (
    <React.Fragment>
      {children(droppableData as interface_droppableData)}
    </React.Fragment>
  )
}

// interface Placeholder_props {
//   userIsDragging: boolean;
//   userIsDraggingOverThis: boolean;
//   draggable: draggableData | null;
// }

// const PlaceholderElement = React.forwardRef(({userIsDragging, userIsDraggingOverThis, draggable}: Placeholder_props, ref) => (
//   <PLACEHOLDER
//     ref={ref as React.RefObject<HTMLDivElement>}
//     userIsDragging={userIsDragging}
//     userIsDraggingOverThis={userIsDraggingOverThis} 
//     height={draggable && userIsDraggingOverThis ? draggable.height : 0} 
//     width={draggable && userIsDraggingOverThis ? draggable.width : 0} 
//     margin={draggable && userIsDraggingOverThis ? draggable.margin.all : 0}
//   />  
// ));


const PLACEHOLDER = styled.div<{height: number, width: number, userIsDraggingOverThis: boolean, userIsDragging: any, margin: string | number, css?: {[key: string]: string}}>`
  width: ${props => props.userIsDraggingOverThis ? props.width + 'px' : '0px'};
  height: ${props => props.userIsDraggingOverThis ? props.height + 'px' : '0px'};
  margin: ${props => props.margin};

  box-sizing: border-box;
  pointer-events: none;
  user-select: none;

  ${props => props.userIsDraggingOverThis ? props.css : ''}
`

export interface interface_droppableData {
  ref: React.RefObject<HTMLDivElement>;
  userIsDragging: any;
  userIsDraggingOverThis: boolean;
  placeholder: JSX.Element;
}

