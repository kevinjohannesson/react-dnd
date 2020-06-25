import React from 'react';
import styled from 'styled-components';

import '@atlaskit/css-reset';
import './App.css';

import Droppable from './components/Droppable';
import Block, {SHAPE} from './components/test_components/Block';


function App() {
  
  return (
    <React.Fragment>
      {/* <Droppable droppableId="anotherID">
          {
            (droppableData: any) => {
              // console.log(droppableData)
              return ( */}
        <CONTAINER
          // ref={droppableData.ref}
        >
          {
            (['square','rectangle','circle'] as SHAPE[]).map(shape => 
              <Block key={shape} id={shape} shape={shape}/>)
          }
          {/* {droppableData.placeholder} */}
        </CONTAINER>
           {/* )}
          }
        </Droppable> */}
        
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
        </Droppable>
    
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

const DROPAREA = styled.div<{isDragging: boolean, isHovered: boolean}>`
  width: 300px;
  height: 80%;
  border: ${props => (props.isDragging && props.isHovered) ? '5px dashed white' : '3px dashed white'};
  border-radius: 40px;
  
  
  background-color: ${props => props.isDragging ? 'rgba(50,255,255,0.3)' : 'rgba(255,255,255,0.3)'};
  position: absolute;
  left: 20px;
  bottom: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
`;