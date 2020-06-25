import React, { ReactElement, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userIsDragging, getHoverId, getDroppables, getDraggable } from '../../redux/dragDrop/selectors';
import { addDroppable } from '../../redux/dragDrop/actions';
import styled from 'styled-components';

interface Props {
  children: any;
  droppableId: string;
}

export default function Droppable({droppableId, children}: Props): ReactElement {
  // console.log('%cDroppable', 'color: white; background-color: orange; padding: 1rem;');
  
  const isDragging = useSelector(userIsDragging);
  
  const currentHoverId = useSelector(getHoverId);

  const isHovered = currentHoverId === droppableId;

  const ref = React.createRef<HTMLDivElement>();

  const placeholderRef = React.createRef<HTMLDivElement>();
  
  const dispatch = useDispatch();
  
  const droppables = useSelector(getDroppables);

  const draggable = useSelector(getDraggable);



  useEffect(() => {
    const droppableIsStored = droppables.some(id => id === droppableId)
    if(!droppableIsStored){
      const element = ref.current;
      if(element){
        element.setAttribute('data-droppableId', droppableId);
        dispatch(addDroppable(droppableId));
      }
    }
    return () => {
      // cleanup
    }

  }, [ref, dispatch, droppableId, droppables]);

  


  useEffect(()=>{
    if(draggable && placeholderRef.current){
      const placeholder = placeholderRef.current;
      const parent = placeholder.parentElement;
      if(parent){
        placeholder.style.width = draggable.width + 'px';
        placeholder.style.height = draggable.height + 'px';
        placeholder.style.margin = draggable.margin;

        parent.insertBefore(placeholder, parent.childNodes[draggable.index+1]);
        console.log('hallo world')
      }
      // console.log(placeholderRef.current.parentElement)

    }
  },[placeholderRef, draggable])


  
  const placeholder = <PLACEHOLDER 
    ref={placeholderRef} 
    isHovered={isHovered} 
    isDragging={isDragging} 
    height={draggable ? draggable.height : 0} 
    width={draggable ? draggable.width : 0} 
    data-placeholder={droppableId}
  />


  const droppableData: IdroppableData = {
    ref, 
    isDragging,
    isHovered, 
    placeholder,
  }
  return (
    <React.Fragment>
      {children(droppableData)}
    </React.Fragment>
  )
}

const PLACEHOLDER = styled.div<{height: number, width: number, isHovered: boolean, isDragging: boolean}>`
  width: ${props => (props.isDragging && props.isHovered) ? props.width + 'px' : '0px'};
  height: ${props => (props.isDragging && props.isHovered) ? props.height + 'px' : '0px'};
  background-color: rgba(255,255,255,0.3);
  border: ${props => (props.isDragging && props.isHovered) ? '3px dashed white' : ''};

  border-radius: ${props => props.height/10 + 'px'};

  pointer-events: none;

  user-select: none;

  transition: width, height, 10.1s ease;
`

interface IdroppableData {
  ref: React.RefObject<HTMLDivElement>;
  isDragging: boolean;
  isHovered: boolean;
  placeholder: any;
}

