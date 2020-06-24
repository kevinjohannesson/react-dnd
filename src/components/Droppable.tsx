import React, { ReactElement, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userIsDragging, getHoverId } from '../redux/dragDrop/selectors';
import { addDroppable } from '../redux/dragDrop/actions';
import styled from 'styled-components';

interface Props {
  // droppableElement: React.RefObject<HTMLDivElement>;
  children: any;
  droppableId: string;
}

export default function Droppable({droppableId, children}: Props): ReactElement {
  console.log('%cDroppable', 'color: white; background-color: orange; padding: 1rem;');
  
  const isDragging = useSelector(userIsDragging);
  const currentHoverId = useSelector(getHoverId);
  const isHovered = currentHoverId === droppableId;

  console.log(isHovered);

  const ref = React.createRef<HTMLDivElement>();
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    const element = ref.current;
    if(element){
      
      // console.log('hallo');
      dispatch(addDroppable(droppableId, element));
    }
    return () => {
      // cleanup
    }

  }, [ref, dispatch, droppableId]);


  const placeholder = React.createRef<HTMLDivElement>();
  const placeholderDiv = React.createElement('div', {ref: placeholder});
  console.log('placeholderDiv', placeholderDiv);
  console.log('ref.current', placeholderDiv.ref);

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
`


interface IdroppableData {
  ref: React.RefObject<HTMLDivElement>;
  isDragging: boolean;
  isHovered: boolean;
  placeholder: any;
}

