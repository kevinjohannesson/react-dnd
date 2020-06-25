import React from 'react';
import styled from 'styled-components';

import '@atlaskit/css-reset';
import './App.css';

import Droppable, { interface_droppableData } from './components/Droppable/Droppable';
import Block, {SHAPE} from './components/test_components/Block';

// const shapes: SHAPE[] = ['square','rectangle','circle'];
const shapes: SHAPE[] = ['square','rectangle'];
// const shapes: SHAPE[] = ['square'];

function App() {
  
  return (
    <React.Fragment>
        <CONTAINER>
          <Droppable droppableId="anotherID">
              {
                (droppableData: interface_droppableData) => {
                  // console.log(droppableData);
                return (
                <DROPAREA2
                  ref={droppableData.ref}
                  userIsDragging={droppableData.userIsDragging}
                  userIsDraggingOver={droppableData.userIsDraggingOver}
                >
              {
                shapes.map((shape, index) => 
                    <Block key={shape} id={shape} shape={shape} index={index}/>)
              }
              {/* {droppableData.placeholder} */}
              </DROPAREA2>
              )}
            }
          </Droppable>
        </CONTAINER>
{/*         
        <Droppable droppableId="uniqueID">
          {
            (droppableData: interface_droppableData) => {
                // console.log(droppableData)
              return (
              <DROPAREA 
                ref={droppableData.ref} 
                userIsDragging={droppableData.userIsDragging}
                userIsDraggingOver={droppableData.userIsDraggingOver}
              >
                
                {droppableData.placeholder}
              </DROPAREA>
            )}
          }
        </Droppable> */}
    
    </React.Fragment>
  );
}

export default App;

const CONTAINER = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  flex: 1;
  
  border: 3px solid black;
`

const DROPAREA = styled.div<{userIsDragging: boolean, userIsDraggingOver: boolean}>`
  width: 300px;
  height: 300px;
  border: ${props => (props.userIsDragging && props.userIsDraggingOver) ? '5px dashed white' : '3px dashed white'};
  border-radius: 40px;
  
  
  background-color: ${props => props.userIsDragging ? 'rgba(50,255,255,0.3)' : 'rgba(255,255,255,0.3)'};
  position: absolute;
  left: 20px;
  bottom: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const DROPAREA2 = styled.div<{userIsDragging: boolean, userIsDraggingOver: boolean}>`
  min-width: 300px;
  min-height: 100px;
  border: ${props => (props.userIsDragging && props.userIsDraggingOver) ? '5px dashed white' : '3px dashed white'};
  border-radius: 40px;
  
  
  background-color: ${props => props.userIsDragging ? 'rgba(50,255,255,0.3)' : 'rgba(255,255,255,0.3)'};
  position: relative;
  left: 20px;
  bottom: 20px;

  padding: 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;