import React, { ReactElement, useEffect, useRef, useReducer } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { select_draggableData, select_status, is_dragOverId, select_dropPosition } from '../../redux/dragDrop/selectors';
// import styled from 'styled-components';
// import { I_draggableData, T_vector } from '../../redux/dragDrop/dragDrop.d';
// import { updateState } from '../../redux/dragDrop/actions';
// import get_margin from '../get_margin';
// import filterMouseData from '../Draggable/filterMouseData';

// interface Props {
//   children: any;
//   droppableId: string;
//   placeholderCSS?: {[key: string]: string};
// }

// export default function Droppable({droppableId, placeholderCSS, children}: Props): ReactElement {
//   // console.log(`%cDroppable ${droppableId}`, 'color: white; background-color: orange; padding: 1rem;');
//   const dispatchRedux = useDispatch();
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const ref = React.createRef<HTMLDivElement>();
  
//   const placeholderRef = React.createRef<HTMLDivElement>();
  
//   const draggable = useSelector(select_draggableData);
  
//   const dragStatus = useSelector(select_status);
//   const status = useSelector(select_status);
//   const userIsDragging = (draggable !== null && dragStatus === 'active');

//   const isDragOver = useSelector(is_dragOverId(droppableId));
//   const userIsDraggingOverThis = userIsDragging && isDragOver;
//   const isHovered = status !== 'inactive' && isDragOver;
//   const dropPosition = useSelector(select_dropPosition);

//   const mouseMoveListener = useRef(false);

//   const placeholderIndex = useRef(null);
  
//   useEffect(() => {
//     const element = ref.current;
//     if(element) {
//       const handleMouseMove = () => {
//         if(!mouseMoveListener.current) 
//           {
//             console.log('removing mousemove');
//             document.removeEventListener('mousemove', handleMouseMove);
//           }
//         else{
//           console.log('listening for mousemove');
//         }
//         // console.log(droppableId);
//       }
    
    
//       switch(status){
//         case 'inactive':{
//           if(!element.hasAttribute('data-droppable')) {
//             element.setAttribute('data-droppable', droppableId);}
//           break;
//         }
//         case 'init': {
//           break;

          
//         }
//         case 'active': {
//           console.log(isHovered)
//           if(isHovered){
//             const placeholderElement = placeholderRef.current;
//             if(placeholderElement && draggable){
//               element.insertBefore(placeholderElement, element.childNodes[draggable.index]);
//             }
//             if(!mouseMoveListener.current){
//               console.log('adding')
//               document.addEventListener('mousemove', handleMouseMove);
//               mouseMoveListener.current = true;
//             }
//           }
//           else {
//             if(mouseMoveListener.current){
//               console.log('removing')
//               // document.removeEventListener('mousemove', handleMouseMove);
//               mouseMoveListener.current = false;
//             }
//           }
//         }
//         case 'stop': {
//           ///
//         }
//         case 'finish': {
//           // if(mouseMoveListener.current) {
//           //   document.removeEventListener('mousemove', handleMouseMove);
//           //   mouseMoveListener.current = false;
//           // }
//         }
//       }
//     }
    
//     if(placeholderRef.current && userIsDraggingOverThis && userIsDragging) {
      
//       const DOMRect = placeholderRef.current.getBoundingClientRect();
//       const pos = {
//         x: DOMRect.x,
//         y: DOMRect.y
//       }
      
//       if(!dropPosition || dropPosition.x !== pos.x || dropPosition.y !== pos.y) dispatchRedux(updateState('drop_position', pos));

//     }

//     if(dragStatus){
//       switch(dragStatus){
//         case 'init': {
//           //
//           break;
//         }
//         case 'active': {

//         }

//       }

//     }
  

//   }, [ref, 
//     status,
//     droppableId,
//     dragStatus, 
//     placeholderRef, 
//     userIsDraggingOverThis, 
//     userIsDragging, 
//     dispatch,
//     dispatchRedux, 
//     dropPosition,
//     isHovered, 
//     draggable]);

//   const placeholder = <PLACEHOLDER 
//     ref={placeholderRef}
//     userIsDragging={userIsDragging}
//     userIsDraggingOverThis={userIsDraggingOverThis} 
//     height={draggable && userIsDraggingOverThis ? draggable.height : 0} 
//     width={draggable && userIsDraggingOverThis ? draggable.width : 0} 
//     margin={draggable && userIsDraggingOverThis ? draggable.margin.all : 0}
//     data-placeholder={droppableId}
//     css={placeholderCSS}
//   />


//   const droppableData: interface_droppableData = {
//     ref, 
//     userIsDragging,
//     userIsDraggingOverThis,
//     placeholder,
//   }
//   return (
//     <React.Fragment>
//       {children(droppableData as interface_droppableData)}
//     </React.Fragment>
//   )
// }

// const PLACEHOLDER = styled.div<{height: number, width: number, userIsDraggingOverThis: boolean, userIsDragging: any, margin: string | number, css?: {[key: string]: string}}>`
//   width: ${props => props.userIsDraggingOverThis ? props.width + 'px' : '0px'};
//   height: ${props => props.userIsDraggingOverThis ? props.height + 'px' : '0px'};
//   margin: ${props => props.margin};

//   box-sizing: border-box;
//   pointer-events: none;
//   user-select: none;

//   ${props => props.userIsDraggingOverThis ? props.css : ''}
// `

// export interface interface_droppableData {
//   ref: React.RefObject<HTMLDivElement>;
//   userIsDragging: any;
//   userIsDraggingOverThis: boolean;
//   placeholder: JSX.Element;
// }


// interface State {
//   placeholderIndex: number | null;
//   mouseMoveListener: boolean;
// }

// const initialState: State = {
//   placeholderIndex: null,
//   mouseMoveListener: false,
// };

// function reducer(state: State, action: any) {
//   switch (action.type) {
    
//     default:
//       return state;
//       // throw new Error();
//   }
// }
