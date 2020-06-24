import React from 'react';
import styled from 'styled-components';

import '@atlaskit/css-reset';
import './App.css';

import Draggable from './components/Draggable';
import Droppable from './components/Droppable';


function App() {
  
  return (
    <React.Fragment>
      
        <CONTAINER>
          <Draggable >
            {
              (draggableData: any) => {
                // console.log(drag)
                return (
                  <BLOCK ref={draggableData.ref} isDragging={draggableData.isDragging}/>
                )
              }
            }
          </Draggable>
        </CONTAINER>
        
        <Droppable droppableId="uniqueID">
          {
            (droppableData: any) => {
              // console.log(droppableData)
              return (
              <DROPAREA 
                ref={droppableData.ref} 
                isDragging={droppableData.isDragging}
                isHovered={droppableData.isHovered}
              >
                {droppableData.isDragging ? droppableData.isHovered ? 'Drop item here' : 'Drag item here...' : ''}
                {droppableData.placeholder}
              </DROPAREA>
            )}
          }
        </Droppable>
    
    </React.Fragment>
  );
}

export default App;

const CONTAINER = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  flex: 1;
  
  border: 3px solid black;
`

const DROPAREA = styled.div<{isDragging: boolean, isHovered: boolean}>`
  width: 300px;
  height: 80%;
  border: ${props => props.isHovered ? '5px solid skyblue' : '3px dashed white'};
  border-radius: 40px;
  
  
  background-color: ${props => props.isDragging ? 'rgba(50,255,255,0.3)' : 'rgba(255,255,255,0.3)'};
  position: absolute;
  left: 20px;
  bottom: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
`

const BLOCK = styled.div<{isDragging: boolean}>`
  width: 150px;
  height: 150px;
  border-radius: 20px;
  background-color: white;


  border: 3px solid rgba(0,0,0,0);

  border: ${props => props.isDragging ? '5px dashed skyblue' : '3px solid rgba(0,0,0,0)'};
  
  &:hover {
    border: ${props => props.isDragging ? '5px dashed skyblue' : '3px solid skyblue'};
  }
`

