import React, { useCallback } from 'react';
import './App.css';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import DropArea from './components/DropArea';
// import Block from './components/Block';
import Draggable from './components/Draggable';

function App() {

  const dropArea = React.createRef<HTMLDivElement>();
  // const dropArea = useRef<HTMLDivElement>(null);
  // const container = useRef<HTMLDivElement>(null);
  const draggable = React.createRef<HTMLDivElement>();

  const handleClick = useCallback( (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log('onClick')
  }, []);
  return (
    <React.Fragment>
      <CONTAINER>
        <Draggable draggableElement={draggable}>
          <BLOCK ref={draggable}/>
        </Draggable>
      </CONTAINER>
      <DROPAREA>
        <DropArea ref={dropArea} />
      </DROPAREA>

      <BUTTON onClick={handleClick}>Click me</BUTTON>
    </React.Fragment>
  );
}

export default App;

const BUTTON = styled.button`
  padding: 1rem;
  font-size: 1.5rem;
  color: skyblue;
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  background-color: white;

  border: 3px solid rgba(0,0,0,0);
  border-radius: 0.5rem;
  
  transform: scale(1);
  &:active {
    transform: scale(0.9);
  }
  &:hover {
    border: 3px solid skyblue
  }
  &:focus {
    outline: none;
  }

`

const CONTAINER = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  flex: 1;
  
  border: 3px solid black;
`

const DROPAREA = styled.div`
  width: 400px;
  height: 80%;
  border: 3px dashed white;
  border-radius: 40px;
  background-color: rgba(255,255,255,0.3);

  position: absolute;
  left: 20px;
  bottom: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
`

const BLOCK = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 20px;
  background-color: white;
`

