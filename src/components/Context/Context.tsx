import React, { ReactElement, useEffect, useCallback, useRef,
  //  useEffect,
    // useCallback,
    //  useMemo 
    } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { select_status, select_draggableId, select_sourceDroppableId, select_hoveredDroppableId, select_dragEndReason, 
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


// const checkboxes = {
//   jsFrameworks: {day: 'str', price: 15, checked: false},
//   jsLibs: {day: 'str', price: 15, checked: false},
//   express: {day: 'str', price: 15, checked: false},
//   node: {day: 'str', price: 15, checked: false},
//   buildTools: {day: 'str', price: 15, checked: false},
//   npm: {day: 'str', price: 15, checked: false},
// }

// const camelCaseName = (string: string) => (
//   string.split('-').map((piece, i)=> {
//     if(i === 0) return piece 
//     else return piece.charAt(0).toUpperCase() + piece.slice(1)
//   }
//   ).join('')
// )

// jeCheckboxElement.addEventListener('change', (e)=>checkboxes[camelCaseName(jeCheckboxNameDataAttribute)].checked = e.target.checked)


// const allCheckboxes = Array.from(document.querySelectorAll('input[type=checkbox]'));
// const checkboxes: {[key: string]: any} = {}
// allCheckboxes.forEach( checkbox => {
//   const name = checkbox.getAttribute('data-name');
//   if(name){
//     const cC_name = camelCaseName(name);
//     checkboxes[cC_name] = {
//       day: checkbox.getAttribute('day-and-time'),
//       price: checkbox.getAttribute('price'),
//       checked: checkbox.checked,
//     }
//     checkbox.addEventListener('change', (e)=>checkboxes[cC_name].checked = e.target.checked)
//   }
// } )


// console.log(allCheckboxes)
