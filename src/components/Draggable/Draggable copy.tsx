import React, { useEffect, useRef, } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { select_draggableData, select_status, select_dropPosition, select_dragEndReason } from '../../redux/dragDrop/selectors';
// // import { T_vector } from '../../redux/dragDrop/dragDrop';


// import extractElement from './extractElement';

// import blockEvents from './blockEvents';


// import { updateState } from '../../redux/dragDrop/actions';
// import get_draggableData from './get_draggableData';


// import get_hoverId from './get_hoverId';

// interface Props {
//   children: any;
//   draggableId: string;
//   draggableIndex: number;
//   onDragEnd?: () => void;
// }

// const Draggable = ({draggableId, draggableIndex, onDragEnd, children}: Props) => {
//   // console.log(`%cDraggable ${draggableId}`, 'color: white; background-color: green; padding: 1rem;');
//   const dispatch = useDispatch();
//   const ref = React.createRef<HTMLElement | null>();

//   const dragStatus = useSelector(select_status);
//   const status = useSelector(select_status);
//   const draggableData = useSelector(select_draggableData);
//   const dropPosition = useSelector(select_dropPosition);
//   const dragEndReason = useSelector(select_dragEndReason);

//   const hoverId = useRef<string | null>(null);
//   const userIsDraggingThis = (draggableData && draggableData.id === draggableId) || false;
  
  
//   const status_inactive = useRef(false);
//   const status_init = useRef(false);
//   const status_active = useRef(false);
//   const status_stop = useRef(false);
//   const status_finish = useRef(false);
  
//   const mouseDownListener = useRef(false);
//   const mouseMoveListener = useRef(false);
//   const mouseUpListener = useRef(false);
  
//   const elementIsExtracted = useRef(false);

//   useEffect(() => {
//     const element = ref.current;
    
//     const handleMouseDown = (event: MouseEvent) => {
//       if(element){
//         // mouseDownListener.current = false;
//         // const draggableData = get_draggableData(event, element, draggableId, draggableIndex);
//         // const droppableId = get_hoverId(event, draggableData);
//         // dispatch(updateState('init', droppableId, draggableData));
//       }
//     }
//     const handleMouseMove = (event: MouseEvent) => {
//       if(element && draggableData){
//         const position = {x: event.clientX, y: event.clientY};
//         element.style.left = (position.x - draggableData.margin.left - (draggableData.width/2) ) + 'px';
//         element.style.top = (position.y - draggableData.margin.top - (draggableData.height/2)) + 'px';
//         const droppableId = get_hoverId(event, draggableData);
//         if(hoverId.current !== droppableId){
//           hoverId.current = droppableId;
//           dispatch(updateState('hover', droppableId)); 
//         }
//       }
//     }
//     const handleMouseUp = (event: MouseEvent) => {
//       if(element){
//         //Remove pointerEvents to prevent "catching" the draggable with a fast mouse click during state change.
//         element.style.pointerEvents = 'none';
//         //Remove this eventListener and update the local shadowState.
//         document.removeEventListener('mousemove', handleMouseMove);
//         mouseMoveListener.current = false;
//         mouseUpListener.current = false;
//         dispatch(updateState('stop', hoverId.current ? 'drop' : 'cancel'));
//       }
//     }
    
//     if(element){
//       if(element.style.userSelect !== 'none') element.style.userSelect = 'none';
//       // console.log(status)
//       switch(status){
//         case 'inactive': {
//           if(!status_inactive.current){
//             if(!mouseDownListener.current){
//               element.addEventListener('mousedown', handleMouseDown, {once: true});
//               mouseDownListener.current = true;
//             }
//             if(mouseDownListener) {
//               if(element.style.pointerEvents !== '') element.style.pointerEvents = '';
//               status_finish.current = false;
//               status_inactive.current = true;
//             }
//           }
//           break;
//         }
//         case 'init': {
//           if(!status_init.current){
//             if(userIsDraggingThis && draggableData){
//               if(!elementIsExtracted.current){ ///////// breakpoint
//                 extractElement(element, draggableData);
//                 elementIsExtracted.current = true;
//               }
//               if(!mouseMoveListener.current){
//                 document.addEventListener('mousemove', handleMouseMove);
//                 mouseMoveListener.current = true;
//               }
//               if(!mouseUpListener.current){
//                 document.addEventListener('mouseup', handleMouseUp, {once: true});
//                 mouseUpListener.current = true;
//               }
//               if(elementIsExtracted && mouseMoveListener.current && mouseUpListener.current){
//                 status_init.current = true; 
//                 dispatch(updateState('active'));
//               }
//             }
//             else if(!userIsDraggingThis){
//               blockEvents(element);
//               status_init.current = true; 
//             }
//           }
//           break;
//         }
//         case 'active': {
//           //
//           break;
//         }
//         case 'stop': {
//           if(!status_stop.current){
//             if(userIsDraggingThis && draggableData){
//               switch(dragEndReason){
//                 case 'drop': {
//                   if(dropPosition){
//                     element.style.left = (dropPosition.x - draggableData.margin.left) + 'px';
//                     element.style.top = (dropPosition.y - draggableData.margin.top) + 'px';
//                     dispatch(updateState('finish'));
//                     break;
//                   }
//                 }
//                 // eslint-disable-next-line
//                 case 'cancel': {
//                   element.style.left = (draggableData.x - draggableData.margin.left) + 'px';
//                   element.style.top = (draggableData.y - draggableData.margin.top) + 'px';
//                   dispatch(updateState('finish'));
//                   break;
//                 }
//               }
//               if(onDragEnd) onDragEnd();
//               status_stop.current = true;
//             }
//           }
//           break;
//         }
//         case 'finish': {
//           if(!status_finish.current){
//             element.style.pointerEvents = 'none';
//             element.setAttribute('style', '');
//             elementIsExtracted.current = false;

            
            
//             status_inactive.current = false;
//             status_init.current = false;
//             status_active.current = false;
//             status_stop.current = false;

//             if(userIsDraggingThis){
//               dispatch(updateState('inactive'));
//             }
//             status_finish.current = true;
//           }
//           break;
//         }
//       }
//     }
//   }, [
//       ref, 
//       status,
//       dragStatus,
//       draggableData,
//       userIsDraggingThis,
//       dispatch,
//       draggableId,
//       draggableIndex,
//       dropPosition,
//       dragEndReason,
//       onDragEnd
//      ]);

//   const exportedData = {
//     ref,
//     userIsDraggingThis
//   }

//   return (
//     <React.Fragment>
//       {children(exportedData)}
//     </React.Fragment>
//   )
// };

// export default Draggable;