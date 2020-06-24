import React, { ReactElement, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userIsDragging, getHoverId, getDroppables } from '../redux/dragDrop/selectors';
import { addDroppable } from '../redux/dragDrop/actions';
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
  
  const dispatch = useDispatch();
  
  const droppables = useSelector(getDroppables);

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

  const placeholder = React.createRef<HTMLDivElement>();

  const droppableData: IdroppableData = {
    ref, isDragging, isHovered, placeholder: <PLACEHOLDER ref={placeholder} height={200} width={100}></PLACEHOLDER>
  }
  return (
    <React.Fragment>
      {children(droppableData)}
    </React.Fragment>
  )
}

const PLACEHOLDER = styled.div<{height: number, width: number}>`
  width: 100%;
  height: 200px;
  background-color: rgba(100,100,255,0.6);

  pointer-events: none;
`

interface IdroppableData {
  ref: React.RefObject<HTMLDivElement>;
  isDragging: boolean;
  isHovered: boolean;
  placeholder: any;
}
