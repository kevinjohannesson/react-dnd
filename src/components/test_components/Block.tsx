import React, { ReactElement } from 'react'
import styled from 'styled-components'
import Draggable from '../Draggable/Draggable'

interface Props {
  id: string;
  shape?: SHAPE;
  index: number;
}

export type SHAPE = 'square' | 'rectangle' | 'circle';

export default function Block({id, index, shape}: Props): ReactElement {
  return (
    <Draggable draggableId={id} draggableIndex={index}>
      {
        (draggableData: any) => 
        {
          // console.log(draggableData)
          return(
            <BLOCK ref={draggableData.ref} userIsDraggingThis={draggableData.userIsDraggingThis} shape={shape}><h2>{index}</h2></BLOCK>
          )}
      }
    </Draggable>
  )
}


const BLOCK = styled.div<{userIsDraggingThis: boolean, shape?: SHAPE}>`
  width: ${props => props.shape === 'rectangle' ? '250px' : props.shape === 'circle' ? '100px' : '150px'};
  height: ${props => props.shape === 'circle' ? '100px' : '150px' };
  border-radius: ${props => props.shape === 'circle' ? '75px' : '25px'};
  background-color: white;

  border: 3px solid rgba(0,0,0,0);

  margin: 10px;
  /* margin: 10px 12px 8px 6px; */

  flex: 0 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;
  
  color: #a8c0ff;
  cursor: ${props => props.userIsDraggingThis ? 'grabbing' : 'grab'};
  
  border: ${props => props.userIsDraggingThis ? '5px dashed skyblue' : '3px solid rgba(0,0,0,0)'};
  
  &:hover {
    border: ${props => props.userIsDraggingThis ? '5px dashed skyblue' : '3px solid skyblue'};
  }
`