import React from 'react'
import styled from 'styled-components'

interface Props {
  height: number;
  width: number;
  margin: string;
  active: boolean;
  css?: {[key: string]: string};
}

const Placeholder = React.forwardRef((props: Props, ref) => {
  return <PLACEHOLDER ref={ref as React.RefObject<HTMLDivElement>} {...props} />
})

export default Placeholder;

const PLACEHOLDER = styled.div<Props>`
  box-sizing: border-box;
  pointer-events: none;
  user-select: none;

  display: ${props => props.active ? 'block' : 'none'};

  ${props => props.active ? props.css : ''}
`
