import React, { ReactElement } from 'react'
import styled from 'styled-components'


interface Props {
  
}

const Block = React.forwardRef((props: Props, ref) => {
  return (
    <BLOCK ref={ref as any}/>
  )
})

export default Block;


const BLOCK = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`