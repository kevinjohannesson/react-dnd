import React, { useEffect } from 'react'

interface Props {
  children: JSX.Element | JSX.Element[]
  draggableElement: React.RefObject<HTMLDivElement>
}

const Draggable = ({draggableElement, children}: Props) => {
  
  useEffect(() => {
    if(draggableElement.current){
      console.log(draggableElement)
      draggableElement.current.addEventListener('click', ()=>{
        console.log('hallo')
      })
    }

    return () => {
      // cleanup
    }
  }, [draggableElement])

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}

export default Draggable


const dragHandler = () => {
  console.log('dragHandler');
}

const mouseUpHandler = () => {
  console.log('mouseUp');
}