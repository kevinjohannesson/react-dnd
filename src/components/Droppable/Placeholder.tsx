import React from 'react'
import styled from 'styled-components'

interface Props {
  height: number;
  width: number;
  margin: string;
  active: boolean;
  css?: {[key: string]: string};
}


const Placeholder = React.forwardRef((props: Props, ref) => (
  <PLACEHOLDER ref={ref as React.RefObject<HTMLDivElement>} {...props} />
))

export default Placeholder;

const PLACEHOLDER = styled.div<Props>`
  width: ${props => props.active ? props.width + 'px' : '0px'};
  height: ${props => props.active ? props.height + 'px' : '0px'};
  margin: ${props => props.margin};

  box-sizing: border-box;
  pointer-events: none;
  user-select: none;

  ${props => props.active ? props.css : ''}
`
