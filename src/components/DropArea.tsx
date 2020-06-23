import React from 'react'
import styled from 'styled-components'

interface Props {
  
}

const DropArea = React.forwardRef((props: Props, ref) => {
  return (
    <CONTAINER ref={ref as any}>
      <TITLE>DropArea</TITLE>
    </CONTAINER>
  )
});

export default DropArea

const CONTAINER = styled.div`
  height: 100%;
  width: 100%;
  border: 3px solid pink;
`

const TITLE = styled.h2`
  color: white;
`
