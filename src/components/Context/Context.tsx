import React, { ReactElement, useEffect, useCallback, useRef,
  //  useEffect,
    // useCallback,
    //  useMemo 
    } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { select_status, select_draggableId, select_source, select_hoveredDroppableId, 
  // select_hoveredDroppableId
 } from '../../redux/dragDrop/selectors';
import echo from '../../echo';
import { I_draggableData } from '../../redux/dragDrop/dragDrop';
import get_draggableData from './get_draggableData';
import translateElement from './translateElement';
// import echo from '../../echo';
// import get_draggableData from './get_draggableData';
// import { 
  // useDispatch, 
  // useSelector } from 'react-redux';
// import { dragInit, dragActive } from '../../redux/dragDrop/actions'
// import { select_status, select_currentDragAction, select_hoveredDroppableId } from '../../redux/dragDrop/selectors';
import extractElement from './extractElement';
import { dragEnd, dragOver } from '../../redux/dragDrop/actions';
import get_hoveredDroppableId from './get_hoveredDroppableId';

export interface I_data_draggable {
  id: string;
  index: number;
  ref: React.RefObject<HTMLDivElement>;
}

export type T_draggables = {
    [key: string]: I_data_draggable;
  }

export interface I_data_droppable {
  id: string;
  ref: React.RefObject<HTMLDivElement>;
  draggables: T_draggables;
  placeholderRef: React.RefObject<HTMLDivElement>;
  // id: string,
  // type: string,
  // drop_disabled: boolean,
  // placeholder: {
  //   ref: React.RefObject<HTMLDivElement>,
  // }
}

export interface I_data {
  droppables: {
    [key: string]: I_data_droppable;
  }
  add_droppable: (id: string, ref: React.RefObject<HTMLDivElement>, placeholderRef: React.RefObject<HTMLDivElement>) => I_data_droppable;
  add_draggable: (id: string, index: number, droppableId: string, ref: React.RefObject<HTMLDivElement>) => void;
  test: (id: string, droppableId: string) => React.RefObject<HTMLDivElement>;
}

const data: I_data = {
  droppables: {},
  add_droppable: function(id, ref, placeholderRef){
    this.droppables[id] = {
      ...this.droppables[id],
      id,
      ref,
      placeholderRef
    }

    return this.droppables[id];
  },
  add_draggable: function(id, index, droppableId, ref){
    const droppable = this.droppables[droppableId];
    const new_droppable = {
      ...droppable,
      draggables: {
        ...droppable.draggables,
        [id]: {
          id,
          index,
          ref
        }
      }
    }
    this.droppables[droppableId] = new_droppable;
  },
  test: function(id, droppableId){
    console.log(id);
    console.log(droppableId);
    return React.createRef<HTMLDivElement>()
  }
  
};

export const DragDropContext = React.createContext(data);

interface Props {
  children: any;
}

export default function Context({children}: Props): ReactElement {
  echo('Context component init...', 'Context');
  const dispatch = useDispatch();
  
  const status = useSelector(select_status);
  // console.log(status);
  const draggableId = useSelector(select_draggableId);
  const source = useSelector(select_source);
  const hoveredId = useSelector(select_hoveredDroppableId);
  // console.log(hoveredDroppableId)
  const hoveredDroppableId = useRef<string | null>(null);
  hoveredDroppableId.current = hoveredId;

  const draggableData = useRef<I_draggableData | null>(null);
  const element = useRef<HTMLElement | null>(null);
  const elementIsExtracted = useRef(false);

  const hasMouseMoveListener = useRef(false);
  const hasMouseUpListener = useRef(false);


  // console.log(draggableId);
  // console.log('data', JSON.parse(JSON.stringify(data)))
  

  const handleMouseMove = useCallback((e: MouseEvent) => {
    echo(`handleMouseMove`, 'context mousemove');
    console.log(hoveredDroppableId.current);
    // console.log(data.droppables)
    // console.log(element.current)
    // console.log('draggableData.current', draggableData.current)
    if(element.current){
      if(draggableData.current){
        if(!elementIsExtracted.current) {
          if(hoveredDroppableId.current){
            console.log(data.droppables[hoveredDroppableId.current])
            echo(`Extracting element`, 'context mousemove', 1);
            extractElement(element.current, draggableData.current);
            elementIsExtracted.current = true;
          } else console.error('hoveredDroppableId.current not found');
        }
        translateElement(e, element.current, draggableData.current);
        const currentHoveredDroppableId = get_hoveredDroppableId(e, draggableData.current, data.droppables);
        if(currentHoveredDroppableId !== hoveredDroppableId.current){
          hoveredDroppableId.current = currentHoveredDroppableId;
          echo(`Dispatching dragOver for ${currentHoveredDroppableId}`, 'context mousemove', 2);
          dispatch(dragOver(currentHoveredDroppableId));
        }
      } else console.error('Unable to find draggableData.current');
    } else console.error('Unable to find element.current');
  }, [
    hoveredDroppableId,
    // source,
    dispatch,
  ]);

  const handleMouseUp = useCallback((e: MouseEvent) => {
    echo('handleMouseUp', 'context mouseup');
    echo(`Removing eventListener: mousemove from document for draggableId: ${draggableId}`, draggableId+'mouseup', 1);
    document.removeEventListener('mousemove', handleMouseMove);
    hasMouseMoveListener.current = false;
    echo('Dispatching dragEnd', draggableId+'mouseup', 1);
    dispatch(dragEnd('cancel'));
    hasMouseUpListener.current = false;
  }, [
    draggableId, 
    handleMouseMove, 
    dispatch,
  ]);


  useEffect(()=>{
    switch(status){
      case 'active': {
        echo('Context taking over...', 'Context', 1);
        if(draggableId){
          if(source){
            const draggable = data.droppables[source].draggables[draggableId].ref;
            if(draggable.current){
              element.current = draggable.current;
              draggableData.current = get_draggableData(element.current);
              if(!hasMouseMoveListener.current){
                echo(`Adding eventListener: mousemove to document for draggableId: ${draggableId}`, 'Context', 2);
                document.addEventListener('mousemove', handleMouseMove);
                hasMouseMoveListener.current = true;
              }
              if(!hasMouseUpListener.current){
                echo(`Adding eventListener: mouseup to document for draggableId: ${draggableId}`, 'Context', 2);
                document.addEventListener('mouseup', handleMouseUp, {once: true});
                hasMouseUpListener.current = true;
              }
            } else console.error('Unable to find draggable.current');
          } else console.error('Unable to find source');
        } else console.error('Unable to find draggableId');
        break;
      }
      case 'end': {
        echo('Removing eventListener "mousemove" from document', 'Context', 1);
        document.removeEventListener('mousemove', handleMouseMove);
        elementIsExtracted.current = false;
      }
    }
  }, [
    status, 
    draggableId,
    source,
    handleMouseMove,
    handleMouseUp,
  ])
  // const dragAction = useSelector(select_currentDragAction);
  // console.log(dragAction)

  // const handleMouseDown = useCallback((droppableId, draggableId) => {
  //   echo('handleMouseDown', '#698C35');
  //   echo('Calculating draggable data', '#698C35', 1);
  //   console.log(data.droppables[draggableId]);
  //   console.log(draggableId, droppableId)
  //   const draggable = data.droppables[draggableId].draggables[droppableId];
  //   if(draggable.ref.current){
  //     const draggableData = get_draggableData(draggable.ref.current);
  //     echo('Dispatching dragInit', '#698C35', 1);
  //     dispatch(dragInit(draggableId, draggableData, droppableId ));
  //   } else console.error('Unable to find draggable with id: ', draggableId);
  // }, [dispatch]);

  // const handleMouseMove = useCallback((e: MouseEvent, dragAction: {draggableId: string, source: string})=> {
  //   echo('handleMouseMove', '#F2780C');
  //   console.log(dragAction)
  //   // const draggable 
  //   // const draggable = data.droppables[dragAction.source].draggables[dragAction.draggableId];
  //   // console.log(draggable.ref);
  //   // if(draggable.ref.current){
  //     // const draggableData = get_draggableData(draggable.ref.current);
  //     // draggable.ref.current.style.left = (e.clientX - draggableData.margin.left - (draggableData.width/2) ) + 'px';
  //     // draggable.ref.current.style.top = (e.clientY - draggableData.margin.top - (draggableData.height/2)) + 'px';
  //     // draggable.ref.current.style.position = 'fixed';
  //   // }
  // }, []);

  // const handleMouseUp = useCallback((e: MouseEvent) => {

  // }, []);

  // useEffect(()=>{
  //   echo('Context useEffect #1', '#D2D9A3', 1);
  //   for(const droppableId in data.droppables){
  //     for(const draggableId in data.droppables[droppableId].draggables){
  //       const draggable = data.droppables[droppableId].draggables[draggableId];
  //       const element = draggable.ref.current;
  //       if(element) {
  //         const draggableData = get_draggableData(element);
  //         const new_draggable: I_data_draggable = {
  //           ...draggable,
  //           ...draggableData
  //         };
  //         echo(`Storing Draggable component DOM information`, '#D2D9A3', 2);
  //         data.droppables[droppableId].draggables[draggableId] = new_draggable;
  //         echo(`Adding eventListener: mousedown to draggableId: ${draggableId}`, '#D2D9A3', 2);
  //         element.addEventListener('mousedown', () => handleMouseDown(draggableId, droppableId), {once: true});
  //       } else console.error('DOM Element not found.')
  //     }
  //   }

  // }, [handleMouseDown]);

  // useEffect(() => {
  //   echo('Context useEffect #2', '#D2D9A3', 1);
  //   if(status === 'init'){
  //     console.log(data)
  //     console.log(dragAction)
  //     if(dragAction) {
  //       echo(`Adding mousemove listener for ${dragAction.draggableId}`, '#D2D9A3', 2);
  //       document.addEventListener('mousemove', (e)=>handleMouseMove(e, dragAction));
  //       dispatch(dragActive());
  //     } else console.error('dragAction not found');
  //   }
  // }, [status, dragAction, handleMouseMove, dispatch]);


  return (
    <DragDropContext.Provider value={data}>
      {children}
    </DragDropContext.Provider>
  )
}