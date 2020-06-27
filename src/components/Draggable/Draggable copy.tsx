import React, { useEffect, useCallback, useRef } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { get_draggableDataById, userIsDraggingDraggable } from '../../redux/dragDrop/selectors';
// import { vector } from '../../redux/dragDrop/dragDrop';

// import mouseMove from './mouseMove';
// import mouseDown from './mouseDown';
// import mouseUp from './mouseUp';

// import extractElement from './extractElement';

// import blockEvents from './blockEvents';
// import unblockEvents from './unblockEvents';
// import { dragStart } from '../../redux/dragDrop/actions';


// interface Props {
//   children: any;
//   draggableId: string;
//   draggableIndex: number;
// }

// const Draggable = ({draggableId, draggableIndex, children}: Props) => {
//   console.log(`%cDraggable ${draggableId}`, 'color: white; background-color: green; padding: 1rem;');

//   const dispatch = useDispatch();
  
//   const ref = React.createRef<HTMLElement | null>();

//   const userIsDragging = useSelector(isUserDragging);
//   const userIsDraggingThis = useSelector(userIsDraggingDraggable(draggableId));
  
//   const draggableData = useSelector(get_draggableDataById(draggableId));

//   const dragoverId = useRef<string | null>(null);
//   const destination = useRef<vector | null>(null);

//   const position = useRef<vector | null>(null);

  
//   const handleMouseMove = useCallback((event: MouseEvent) => {
//     console.log('mouseMove')
//     console.log(ref.current)
//     if(ref.current) mouseMove(event, ref.current, dragoverId, position, dispatch);
//   }, [ref, dragoverId, position, dispatch]);

//   const handleMouseUp = useCallback((event: MouseEvent) => {
//     console.log('mouseUp')
//     console.log(ref.current)
//     if(ref.current) mouseUp(event, ref.current, destination, dragoverId, handleMouseMove, handleMouseUp, dispatch);
//   }, [ref, destination, handleMouseMove, dispatch]);

//   const handleMouseDown = useCallback((event: MouseEvent) => {
//     console.log('mouseDown' + Math.random())
//     console.log(ref.current)
//     if(ref.current) {
//       console.log('hallo')
//       const droppableData = mouseDown(ref.current, draggableId, draggableIndex);
//       console.log(droppableData)
//       const {x, y} = droppableData;
//       destination.current = {x, y};
//       position.current = {x, y};
//       // dispatch(dragStart(droppableData));
//       // mouseDown(event, ref.current, draggableId, draggableIndex, destination, position, dispatch);
//       // ref.current.removeEventListener('mousedown', handleMouseDown);
//     }
//   }, [ref, draggableId, draggableIndex, destination, position, dispatch]);


//   useEffect(() => {
//     const element = ref.current;
//     if(!userIsDraggingThis && element) element.addEventListener('mousedown', handleMouseDown);
//   }, [ref, handleMouseDown,userIsDraggingThis]);

//   useEffect(() => {
//     const element = ref.current;
//     if(element && userIsDragging && !userIsDraggingThis) blockEvents(element); 
//   }, [ref, userIsDragging, userIsDraggingThis]);

//   useEffect(()=>{
//     const element = ref.current;
//     if(element && userIsDragging && userIsDraggingThis && draggableData){
//       extractElement(element, draggableData);

//     }
//     // document.addEventListener('mousemove', mouseMoveHandler);
//     // document.addEventListener('mouseup', mouseUpHandler);
//     // element.removeEventListener('mousedown', mouseDownHandler);
//   }, [ref, userIsDragging, userIsDraggingThis, draggableData])
//   // useEffect(() => {
//   //   if(!userIsDragging){

//   //   }
//   // }, [])

//   // useEffect(() => {
//   //   const element = ref.current;
    
//   //   if(userIsDraggingThis && draggableData && element && !userIsDragging){
        
//   //       element.style.pointerEvents = '';
//   //       extractElement(element, draggableData);
//   //       document.addEventListener('mousemove', handleMouseMove);
//   //       document.addEventListener('mouseup', handleMouseUp);
//   //   }


//   //     return () => {
//   //       if(draggableData && element){
//   //         console.log('Second useEffects cleanup')
//   //         document.removeEventListener('mousemove', handleMouseMove);
//   //         document.removeEventListener('mouseup', handleMouseUp);
//   //       }
//   //     }
  
//   // }, [userIsDragging, userIsDraggingThis, draggableData, ref, handleMouseMove, handleMouseUp]);


//   const exportedData = {
//     ref,
//     userIsDraggingThis: draggableData ? true : false
//   }

//   return (
//     <React.Fragment>
//       {children(exportedData)}
//     </React.Fragment>
//   )
// };

// export default Draggable;