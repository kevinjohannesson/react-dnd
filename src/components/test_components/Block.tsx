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
        (draggableData: any) => (
        <BLOCK ref={draggableData.ref} isDragging={draggableData.isDragging} shape={shape}><h2>{index}</h2></BLOCK>
        )
      }
    </Draggable>
  )
}


const BLOCK = styled.div<{isDragging: boolean, shape?: SHAPE}>`
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

  cursor: ${props => props.isDragging ? 'grabbing' : 'grab'};

  border: ${props => props.isDragging ? '5px dashed skyblue' : '3px solid rgba(0,0,0,0)'};
  
  &:hover {
    border: ${props => props.isDragging ? '5px dashed skyblue' : '3px solid skyblue'};
  }
`