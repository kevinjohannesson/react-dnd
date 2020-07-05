import React, { ReactElement, useContext } from 'react';

import Placeholder from './Placeholder';

import { DragDropContext, I_data_droppable } from '../Context/Context';
// import echo from '../../echo';

import { useSelector } from 'react-redux';
import { select_status } from '../../redux/dragDrop/selectors';

// const data: T_draggables = {};

// create_droppable: function(id: string){
//   console.log('hallo');
// }


interface Props {
  children: any;
  droppableId: string;
  placeholderCSS?: {[key: string]: string};
}


export const DroppableContext = React.createContext<I_data_droppable | null>(null);
// const droppableData = {};
export default function Droppable({droppableId, placeholderCSS, children}: Props): ReactElement {
  // console.log(`%cDroppable ${droppableId}`, 'color: white; background-color: orange; padding: 1rem;');
  // echo('Droppable component init...', '#F2B90F');
  const ref = React.createRef<HTMLDivElement>();
  const context = useContext(DragDropContext);
  // echo('Adding droppable to the context', '#F2B90F', 1);
  const droppable = context.add_droppable(droppableId, ref);

  const status = useSelector(select_status);
  // const DroppableContext2 = React.createContext(data);

  // useEffect(()=>{
  //   echo('Droppable useEffect #1', '#F2B90F', 1);
  //   // data.create_droppable(droppableId);
  // }, [droppableId]);
  
  // useEffect(()=>{
  //   echo('Droppable useEffect #2', '#F2B90F', 1);
  //   // context.add_droppable(droppableId, ref);
  // }, [context, droppableId, ref]);



  const placeholderRef = React.createRef<HTMLDivElement>();
  const placeholder = <Placeholder 
    ref={placeholderRef}
    // active={userIsDragging && isHovered && draggableData ? true : false} 
    // width={userIsDragging && isHovered && draggableData ? draggableData.width : 0} 
    // height={userIsDragging && isHovered && draggableData ? draggableData.height : 0} 
    // margin={userIsDragging && isHovered && draggableData ? draggableData.margin.all : ''} 
    active={false} 
    width={0}
    height={0}
    margin={''}
    css={placeholderCSS}
  />

  

  const droppableData: interface_droppableData = {
    ref: ref, 
    userIsDragging: status !== 'inactive',
    isHovered: false,
    placeholder,
  }
  return (
    <DroppableContext.Provider value={droppable}>
      {children(droppableData as interface_droppableData)}
    </DroppableContext.Provider>  
  )
}


export interface interface_droppableData {
  ref: React.RefObject<HTMLDivElement>;
  userIsDragging: any;
  isHovered: boolean;
  placeholder: JSX.Element;
}