import React, { ReactElement, useEffect, useCallback, useRef,
  //  useEffect,
    // useCallback,
    //  useMemo 
    } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { select_status, select_draggableId, select_sourceDroppableId, select_hoveredDroppableId, select_dragEndReason, 
  // select_hoveredDroppableId
 } from '../../redux/dragDrop/selectors';
import echo, { error } from '../../echo';
import { I_draggableData } from '../../redux/dragDrop/dragDrop';
import get_draggableData from './get_draggableData';
import translateElement from './translateElement';
// import echo from '../../echo';
// import get_draggableData from './get_draggableData';
// import { 
  // useDispatch, 
  // useSelector } from 'react-redux';
// import { dragInit, dragActive } from '../../redux/dragDrop/actions'
// import { select_status, select_currentDragAction, select_hoveredDroppableId, select_dragEndReason } from '../../redux/dragDrop/selectors';
import extractElement from './extractElement';
import { dragEnd, dragOver, dragFinish, elementExtracted } from '../../redux/dragDrop/actions';
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
  add_draggable: (id: string, index: number, droppableId: string, ref: React.RefObject<HTMLDivElement>) => I_data_draggable;
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
    return this.droppables[droppableId].draggables[id];
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
  const sourceId = useSelector(select_sourceDroppableId);
  const hoveredId = useSelector(select_hoveredDroppableId);


  const dragEndReason = useSelector(select_dragEndReason);
  // console.log(hoveredDroppableId)
  const hoveredDroppableId = useRef<string | null>(null);
  hoveredDroppableId.current = hoveredId;

  const draggableData = useRef<I_draggableData | null>(null);
  const element = useRef<HTMLElement | null>(null);
  const elementIsExtracted = useRef(false);

  const hasMouseMoveListener = useRef(false);
  const hasMouseUpListener = useRef(false);

  const placeholderIndex = useRef(0);


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
            if(draggableId){
              const placeholder = data.droppables[hoveredDroppableId.current].placeholderRef.current;
              if(placeholder){
                const draggable = data.droppables[hoveredDroppableId.current].draggables[draggableId];
                if(draggable){
                console.log(draggable.index)
                const droppable = data.droppables[hoveredDroppableId.current].ref.current;
                if(droppable) {
                  droppable.insertBefore(placeholder, droppable.children[draggable.index]);
                  console.log(draggableData);
                  echo(`Extracting element`, 'context mousemove', 1);
                  extractElement(element.current, draggableData.current);
                  elementIsExtracted.current = true;
                  echo(`Sizing placeholder element`, 'context mousemove', 1);
                  placeholder.style.boxSizing = 'border-box';
                  placeholder.style.height = draggableData.current.height + 'px';
                  placeholder.style.width = draggableData.current.width + 'px';
                  placeholder.style.margin = draggableData.current.margin.computed;
                  const borderRadius = window.getComputedStyle(element.current).getPropertyValue('border-radius');
                  placeholder.style.borderRadius = borderRadius;
                  dispatch(elementExtracted(true));
                } else console.error('Unable to locate droppable');
              } else console.error('Unable to locate draggable');
            } else console.error('Unable to locate placeholderRef.current');
          } else console.error('Unable to find draggableId');
          } else console.error('hoveredDroppableId.current not found');
        }
        translateElement(e, element.current, draggableData.current);
        const currentHoveredDroppableId = get_hoveredDroppableId(e, draggableData.current, data.droppables);
        if(currentHoveredDroppableId !== hoveredDroppableId.current){
          hoveredDroppableId.current = currentHoveredDroppableId;
          echo(`Dispatching dragOver for ${currentHoveredDroppableId}`, 'context mousemove', 2);
          dispatch(dragOver(currentHoveredDroppableId));
          if(hoveredDroppableId.current){
            echo('Creating placeholder', 'context mousemove', 2);
            const placeholder = data.droppables[hoveredDroppableId.current].placeholderRef.current;
            if(placeholder){
              console.log(placeholder)
              echo(`Sizing placeholder element`, 'context mousemove', 1);
              placeholder.style.boxSizing = 'border-box';
              placeholder.style.height = draggableData.current.height + 'px';
              placeholder.style.width = draggableData.current.width + 'px';
              placeholder.style.margin = draggableData.current.margin.computed;
              const borderRadius = window.getComputedStyle(element.current).getPropertyValue('border-radius');
              placeholder.style.borderRadius = borderRadius;
            } else console.error('Unable to find placeholderRef.current for new droppable')
          }

        }
      } else console.error('Unable to find draggableData.current');
    } else console.error('Unable to find element.current');
  }, [
    hoveredDroppableId,
    draggableId,
    // source,
    dispatch,
  ]);

  const handleMouseUp = useCallback((e: MouseEvent) => {
    echo('handleMouseUp', 'context mouseup');
    echo(`Removing eventListener: mousemove from document for draggableId: ${draggableId}`, draggableId+'mouseup', 1);
    document.removeEventListener('mousemove', handleMouseMove);
    hasMouseMoveListener.current = false;
    

    // console.log(source);
    // console.log(hoveredDroppableId.current);
    if(
        hoveredDroppableId.current === null ||
        hoveredDroppableId.current ===  sourceId
      ){
        echo('Dispatching dragEnd: cancel', draggableId+'mouseup', 1);
        dispatch(dragEnd('cancel'));
    }
    else if(hoveredDroppableId.current !== sourceId){
      echo('Dispatching dragEnd: drop', draggableId+'mouseup', 1);
      dispatch(dragEnd('drop'));
    }


    hasMouseUpListener.current = false;

  }, [
    draggableId, 
    handleMouseMove, 
    sourceId,
    dispatch,
  ]);


  useEffect(()=>{
    switch(status){
      case 'active': {
        echo('Context taking over...', 'Context', 1);
        if(draggableId){
          if(sourceId){
            const draggable = data.droppables[sourceId].draggables[draggableId].ref;
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
        console.log('dragEndReason', dragEndReason)
        switch(dragEndReason){
          case 'cancel': {
            echo(`Dragging cancelled`, 'Context', 2);
            const placeholder = sourceId ? data.droppables[sourceId].placeholderRef.current : null;
            if(placeholder){
              if(sourceId){
                if(draggableId){
                  const draggable = data.droppables[sourceId].draggables[draggableId].ref;
                  if(draggable.current){
                    const droppable = data.droppables[sourceId].ref.current;
                    if(droppable){
                      echo(`Resetting component`, 'Context', 2);
                      draggable.current.setAttribute('style', '');
                      placeholder.setAttribute('style', '');
                      dispatch(elementExtracted(false));
                      droppable.appendChild(placeholder);
                      document.body.style.cursor = '';
                      dispatch(dragFinish());
                    } else console.error('Unable to locate droppable.current');
                  } else console.error('Unable to find draggable ref');
                } else console.error('Unable to find draggableId');
              } else console.error('Unable to find sourceId');
            } else console.error('Unable to locate placeholder')
            break;
          }
          case 'drop': {
            echo('Dropping draggable to new droppable', 'Context', 2);
            if(hoveredDroppableId.current){
              const placeholder = data.droppables[hoveredDroppableId.current].placeholderRef.current;
              if(placeholder){
                const DOMRect = placeholder.getBoundingClientRect();
                if(draggableId){
                  if(sourceId){
                    const draggable = data.droppables[sourceId].draggables[draggableId].ref;
                    if(draggable.current){
                      if(draggableData.current){
                        const droppable = data.droppables[hoveredDroppableId.current].ref.current;
                        if(droppable){  
                          const sourceDroppable = data.droppables[sourceId].ref.current;
                          if(sourceDroppable){
                            const sourcePlaceholder = data.droppables[sourceId].placeholderRef.current;
                            if(sourcePlaceholder){

                              const element = draggable.current;
                              element.style.left = DOMRect.x - draggableData.current.margin.left + 'px';
                              element.style.top = DOMRect.y - draggableData.current.margin.top + 'px';
                              
                              echo(`Resetting component`, 'Context', 2);
                              element.setAttribute('style', '');
                              placeholder.setAttribute('style', '');
                              sourcePlaceholder.setAttribute('style', '');
                              dispatch(elementExtracted(false));
                              droppable.appendChild(placeholder);
                              document.body.style.cursor = '';
                              dispatch(dragFinish());
                              
                            } else error('find', 'sourcePlaceholder');
                          } else error('find', 'sourceDroppable');
                        } else error('find', 'droppable')
                      } else error('find', 'draggableData.current');
                    } else error('find', 'draggable.current');
                  } else error('find', 'sourceId');
                } else error('find', 'placeholder');
              } else error('find', 'draggableId');
            } else error('find', 'hoveredDroppableId.current');
            break;
          }
        }
      }
    }
  }, [
    status, 
    draggableId,
    sourceId,
    handleMouseMove,
    handleMouseUp,
    dragEndReason,
    dispatch,
  ]);
  
  return (
    <DragDropContext.Provider value={data}>
      {children}
    </DragDropContext.Provider>
  )
}