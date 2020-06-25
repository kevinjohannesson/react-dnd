import React from 'react';
import styled from 'styled-components';

import '@atlaskit/css-reset';
import './App.css';

import Droppable from './components/Droppable/Droppable';
import Block, {SHAPE} from './components/test_components/Block';


function App() {
  
  return (
    <React.Fragment>
        <CONTAINER>
          <Droppable droppableId="anotherID">
              {
                (droppableData: any) => {
                  // console.log(droppableData)
                  // ref={droppableData.ref}
                return (
                <DROPAREA2
                  ref={droppableData.ref}
                  isDragging={droppableData.isDragging}
                  isHovered={droppableData.isHovered}
                >
              {
                (['square','rectangle','circle'] as SHAPE[]).map((shape, index) => 
                    <Block key={shape} id={shape} shape={shape} index={index}/>)
              }
              {droppableData.placeholder}
              </DROPAREA2>
              )}
            }
          </Droppable>
        </CONTAINER>
{/*         
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

// const DROPAREA = styled.div<{isDragging: boolean, isHovered: boolean}>`
//   width: 300px;
//   height: 300px;
//   border: ${props => (props.isDragging && props.isHovered) ? '5px dashed white' : '3px dashed white'};
//   border-radius: 40px;
  
  
//   background-color: ${props => props.isDragging ? 'rgba(50,255,255,0.3)' : 'rgba(255,255,255,0.3)'};
//   position: absolute;
//   left: 20px;
//   bottom: 20px;

//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

const DROPAREA2 = styled.div<{isDragging: boolean, isHovered: boolean}>`
  min-width: 300px;
  min-height: 100px;
  border: ${props => (props.isDragging && props.isHovered) ? '5px dashed white' : '3px dashed white'};
  border-radius: 40px;
  
  
  background-color: ${props => props.isDragging ? 'rgba(50,255,255,0.3)' : 'rgba(255,255,255,0.3)'};
  position: relative;
  left: 20px;
  bottom: 20px;

  padding: 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;