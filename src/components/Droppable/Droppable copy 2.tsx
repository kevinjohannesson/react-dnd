import React, { ReactElement, useEffect, useRef } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { select_draggableData, select_status, is_hoverId, select_dropPosition } from '../../redux/dragDrop/selectors';
// // import styled from 'styled-components';
// // import { updateState } from '../../redux/dragDrop/actions';
// import Placeholder from './Placeholder';
// import { T_vector } from '../../redux/dragDrop/dragDrop.d';
// import { Domain } from 'domain';

// interface Props {
//   children: any;
//   droppableId: string;
//   placeholderCSS?: {[key: string]: string};
// }

// export default function Droppable({droppableId, placeholderCSS, children}: Props): ReactElement {
//   // console.log(`%cDroppable ${droppableId}`, 'color: white; background-color: orange; padding: 1rem;');
//   const dispatch = useDispatch();
  
//   const droppableRef = React.createRef<HTMLDivElement>();
//   const placeholderRef = React.createRef<HTMLDivElement>();
  
//   const status = useSelector(select_status);
//   const userIsDragging = status === 'init' || status === 'active';
//   const isHovered = useSelector(is_hoverId(droppableId));
//   const draggableData = useSelector(select_draggableData);
//   const dropPosition = useSelector(select_dropPosition);
  
//     const placeholderIndex = useRef(null);
//     const placeholderInserted = useRef(false);
//   // console.log(placeholderIndex);
//   const mouseMoveListener = useRef(false);

//   const placeholderVisible = useRef(false);

//   type T_origin = {
//     previous: T_vector | null;
//     placeholder: T_vector | null;
//     next: T_vector | null;
//   }
//   const origin = useRef<T_origin>({
//     previous: null,
//     placeholder: null,
//     next: null
//   })
  
//   // const condition = draggableData !== null ? true : false;
//   const placeholder = <Placeholder 
//     ref={placeholderRef}
//     active={userIsDragging && isHovered && draggableData ? true : false} 
//     width={userIsDragging && isHovered && draggableData ? draggableData.width : 0} 
//     height={userIsDragging && isHovered && draggableData ? draggableData.height : 0} 
//     margin={userIsDragging && isHovered && draggableData ? draggableData.margin.all : ''} 
//     css={placeholderCSS}
//   />

//   useEffect(() => {
//     const element = droppableRef.current;
//     if(element) {
//       const placeholderElement = placeholderRef.current;
//       if(placeholderElement){

//       const handleMouseMove = (event: MouseEvent) => {
//         console.log(status);
//         if(!mouseMoveListener.current) {
//           console.log('removing');
//           document.removeEventListener('mousemove', handleMouseMove);
//           mouseMoveListener.current = false;
//         } else {
//           console.log('handleMouseMove');
//           if(isHovered){
//             const y = event.clientY;
//             console.log(y);
//             console.log(origin.current.previous?.y)
//             console.log(origin.current.placeholder?.y)
//             console.log(origin.current.next?.y)
//             // if(origin.current.previous){
//             //   if(y < origin.current.previous.y){
//             //     console.log('move up placeholder');
//             //   }
//             // }
//             // if(origin.current.next){
//             //   if(y > origin.current.next.y){
//             //     console.log('move down placeholder');
//             //   }
//             // }

//           }


//         }
//       }

//       switch(status){
//         case 'inactive': {
//           if(!element.hasAttribute('data-droppable')) {
//             element.setAttribute('data-droppable', droppableId);
//           }
//           break;
//         }
//         case 'init': {
//           if(isHovered && draggableData){
//             const dragEl = element.children[draggableData.index] as HTMLElement;
//             const prevEl = element.children[draggableData.index-1] as HTMLElement || null;
//             const nextEl = (()=>{
//               const el = element.children[draggableData.index+1] as HTMLElement;
//               return el !== placeholderRef.current ? el : null;
//             })();
//             console.log(dragEl);
//             console.log(prevEl);
//             console.log(nextEl);
//             const getOrigin = (el: HTMLElement | null): T_vector | null => {
//               if(el === null) return null
//               else {
//                 const DOMRect = el.getBoundingClientRect();
//                 return {
//                   x: DOMRect.x + DOMRect.width / 2,
//                   y: DOMRect.y + DOMRect.height / 2
//                 }
//               }
//             }
//             const dragOrigin = getOrigin(dragEl);
//             const prevOrigin = getOrigin(prevEl);
//             const nextOrigin = getOrigin(nextEl);
//             console.log(dragOrigin);
//             console.log(prevOrigin);
//             console.log(nextOrigin);

//             //set index
//             // const parentElement = placeholderElement.parentElement;
//             // if(parentElement) {
//             //   const placeholderIndex = Array.from(parentElement.children).indexOf(placeholderElement);
//             //   const insertIndex = placeholderIndex > draggableData.index ? draggableData.index : draggableData.index + 1;
//             //   parentElement.insertBefore(placeholderElement, parentElement.children[insertIndex]);
              
              
//             //   const placeholderElementDOMRect = placeholderElement.getBoundingClientRect();
//             //   const previousElementSibling = placeholderElement.previousElementSibling;
//             //   const nextElementSibling = (()=>{
//             //     const nextElementSibling = placeholderElement.nextElementSibling;
//             //     if(nextElementSibling) return nextElementSibling.nextElementSibling;
//             //     else return null;
//             //   })();
//             //   console.log(previousElementSibling)
//             //   const previousElementDOMRect = previousElementSibling ? previousElementSibling.getBoundingClientRect() : null;
//             //   console.log(previousElementDOMRect);



//             //   const nextElementDOMRect = nextElementSibling ? nextElementSibling.getBoundingClientRect() : null;
//             //   const prevOrigin = previousElementDOMRect ? { 
//             //     x: previousElementDOMRect.x + previousElementDOMRect.width / 2,
//             //     y: previousElementDOMRect.y + previousElementDOMRect.height / 2,
//             //   } : null;
//             //   const placeholderOrigin = placeholderElementDOMRect ? { 
//             //     x: placeholderElementDOMRect.x + placeholderElementDOMRect.width / 2,
//             //     y: placeholderElementDOMRect.y + placeholderElementDOMRect.height / 2,
//             //   } : null;
//             //   const nextOrigin = nextElementDOMRect ? { 
//             //     x: nextElementDOMRect.x + nextElementDOMRect.width / 2,
//             //     y: nextElementDOMRect.y + nextElementDOMRect.height / 2,
//             //   } : null;
//             //   // console.log(prevOrigin);
//             //   // console.log(placeholderOrigin)
//             //   // console.log(nextOrigin)
//             //   // if()
//             //   origin.current = {
//             //     previous: prevOrigin,
//             //     placeholder: placeholderOrigin,
//             //     next: nextOrigin
//             //   }

//               // parentElement.insertBefore(placeholderElement, parentElement.children[insertIndex]);
//             // }
//           }
//           break;
//         }
//         case 'active':{
//           if(!placeholderVisible.current) placeholderVisible.current = true;
//           //
//           break;
//         }
//         case 'stop':{
//           if(mouseMoveListener.current){
//             mouseMoveListener.current = false;
//           }
//           if(placeholderVisible.current) placeholderVisible.current = false;
//           break;
//         }
//         case 'finish':{
//           //
//           break;
//         }
//       }
//     }
//   }
    
    
//     // if(placeholderRef.current && userIsDraggingOverThis && userIsDragging) {
      
//     //   const DOMRect = placeholderRef.current.getBoundingClientRect();
//     //   const pos = {
//     //     x: DOMRect.x,
//     //     y: DOMRect.y
//     //   }
      
//     //   if(!dropPosition || dropPosition.x !== pos.x || dropPosition.y !== pos.y) dispatch(updateState('drop_position', pos));

//     // }

//     // if(dragStatus){
//     //   switch(dragStatus){
//     //     case 'init': {
//     //       //
//     //       break;
//     //     }
//     //     case 'active': {

//     //     }

//     //   }

//     // }
  

//   }, [droppableRef, 
//     status,
//     droppableId,
//     placeholderRef, 
//     isHovered, 
//     userIsDragging, 
//     dispatch, 
//     dropPosition,
//     mouseMoveListener,

     
//     draggableData]);

//   const droppableData: interface_droppableData = {
//     ref: droppableRef, 
//     userIsDragging,
//     isHovered,
//     placeholder,
//   }
//   return (
//     <React.Fragment>
//       {children(droppableData as interface_droppableData)}
//     </React.Fragment>
//   )
// }


// export interface interface_droppableData {
//   ref: React.RefObject<HTMLDivElement>;
//   userIsDragging: any;
//   isHovered: boolean;
//   placeholder: JSX.Element;
// }