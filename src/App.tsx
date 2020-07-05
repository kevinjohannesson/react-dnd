import React from 'react';
import styled from 'styled-components';

import Droppable, { interface_droppableData } from './components/Droppable/Droppable';
import Block, {SHAPE} from './components/test_components/Block';
import Context from './components/Context/Context';

/* Console.log Color Theme Swatches in Hex */
// #D90B31
// #698C35
// #D2D9A3
// #F2B90F
// #F2780C


// const shapes: SHAPE[] = ['square','rectangle','circle'];
const shapes: SHAPE[] = ['circle','rectangle'];
// const shapes: SHAPE[] = ['square'];

function App() {
  
  const placeholderCSS = {
    border: '3px dashed white',
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: '25px',
    boxShadow: '0px 0px 34px -2px rgba(0,0,0,0.75)',
  }
  // const placeholder2CSS = {
  //   border: '3px solid white',
  //   backgroundColor: 'rgba(255,255,255,0.3)',
  //   borderRadius: '10px',
  //   boxShadow: '0px 0px 40px 6px rgba(0,0,0,0.21)'
  // }
  return (
    <Context>
      <CONTAINER>
        
        <Droppable droppableId="uniqueID" placeholderCSS={placeholderCSS}>
          {(data: interface_droppableData) => (
            <DROPAREA
              userIsDragging={data.userIsDragging}
              isHovered={data.isHovered}
              ref={data.ref}
            >
              { shapes.map((shape, index) => 
                  <Block key={shape} id={shape} shape={shape} index={index}/>)}
              {data.placeholder}
            </DROPAREA>
          )}
        </Droppable>
        
        {/* <Droppable droppableId="anotherID" placeholderCSS={placeholder2CSS}>
          {(droppableData: interface_droppableData) => (
            <DROPAREA 
              userIsDragging={droppableData.userIsDragging}
              userIsDraggingOverThis={droppableData.isHovered}
              position={{position: 'absolute', bottom: '10px', left: '10px', right: '10px', height: '200px'}}
              ref={droppableData.ref} 
            >
              {droppableData.placeholder}
            </DROPAREA>
          )}
        </Droppable>

        <Droppable droppableId="thirdID">
          {(droppableData: interface_droppableData) => (
            <DROPAREA 
              userIsDragging={droppableData.userIsDragging}
              userIsDraggingOverThis={droppableData.isHovered}
              position={{position: 'absolute', top: '10px', left: '10px'}}
              ref={droppableData.ref} 
            >
              {droppableData.placeholder}
            </DROPAREA>
          )}
        </Droppable> */}
    
      </CONTAINER>
    </Context>
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

const DROPAREA = styled.div<{
  userIsDragging: boolean, 
  isHovered: boolean,
  position?: any;
}>`
  min-width: 100px;
  min-height: 100px;
  border: ${props => props.isHovered ? '5px dashed white' : '3px dashed white'};
  border-radius: 25px;
  
  
  background-color: ${props => props.userIsDragging ? 'rgba(50,255,255,0.3)' : 'rgba(255,255,255,0.3)'};
  
  ${props => props.position || ''}

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  box-sizing: border-box;
`;
