import React, { ReactElement, useEffect, useRef, useContext } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { select_draggableData, select_status, is_hoverId, select_dropPosition } from '../../redux/dragDrop/selectors';
// // import styled from 'styled-components';
// // import { updateState } from '../../redux/dragDrop/actions';
// import Placeholder from './Placeholder';
// import { T_vector } from '../../redux/dragDrop/dragDrop.d';
// import { DragDropContext } from '../Context/Context';
// import echo from '../../echo';

// const data = {
//   droppables: [],
//   add_droppable: function(ref: React.RefObject<HTMLDivElement>){
//     console.log('hallo');
//   }
// };


// interface Props {
//   children: any;
//   droppableId: string;
//   placeholderCSS?: {[key: string]: string};
// }


// export const DroppableContext = React.createContext(data);

// export default function Droppable({droppableId, placeholderCSS, children}: Props): ReactElement {
//   // console.log(`%cDroppable ${droppableId}`, 'color: white; background-color: orange; padding: 1rem;');
//   echo('Droppable component init...', '#F2B90F');
//   const ref = React.createRef<HTMLDivElement>();
//   const context = useContext(DragDropContext);
  
//   useEffect(()=>{
//     echo('Droppable useEffect #1', '#F2B90F', 1);
//     context.add_droppable(droppableId, ref);
//     // eslint-disable-next-line
//   }, []);




//   // console.log(context);
//   const dispatch = useDispatch();

//   // useEffect(()=>{
//   //   console.log('#1 droppable UE')
//   //   // console.log(droppableRef);
//   //   // console.log(droppableId);
    
  
//   // }, [
//   //   context,
//   //   droppableId,
//   //   ref, 
//   // ]);

  
//   const placeholderRef = React.createRef<HTMLDivElement>();
  
//   const status = useSelector(select_status);
//   const userIsDragging = status === 'init' || status === 'active';
//   const isHovered = useSelector(is_hoverId(droppableId));
//   const draggableData = useSelector(select_draggableData);
//   const dropPosition = useSelector(select_dropPosition);
  
  
//   const mouseMoveListener = useRef(false);



//   type T_origin = {
//     previous: T_vector | null;
//     placeholder: T_vector | null;
//     next: T_vector | null;
//   }
//   // const origin = useRef<T_origin>({
//   //   previous: null,
//   //   placeholder: null,
//   //   next: null
//   // })

  
//   // const condition = draggableData !== null ? true : false;
//   const placeholder = <Placeholder 
//     ref={placeholderRef}
//     // active={userIsDragging && isHovered && draggableData ? true : false} 
//     // width={userIsDragging && isHovered && draggableData ? draggableData.width : 0} 
//     // height={userIsDragging && isHovered && draggableData ? draggableData.height : 0} 
//     // margin={userIsDragging && isHovered && draggableData ? draggableData.margin.all : ''} 
//     active={false} 
//     width={0}
//     height={0}
//     margin={''}
//     css={placeholderCSS}
//   />

//   useEffect(() => {
//     const element = ref.current;
//     if(element) {
//       const placeholderElement = placeholderRef.current;
//       if(placeholderElement){

//       // const handleMouseMove = (event: MouseEvent) => {
//       //   console.log('mousemove');
//       // }

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
//           }
          
//           break;
//         }
//         case 'active':{
          
//           //
//           break;
//         }
//         case 'stop':{
//           //
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
  

//   }, [ref, 
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
//     ref: ref, 
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