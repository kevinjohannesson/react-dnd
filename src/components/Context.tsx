import React, { ReactElement, useEffect } from 'react'

interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function Context({children}: Props): ReactElement {
  console.log('%cContext', 'color: white; background-color: purple; padding: 1rem;');
  console.log(children)

  useEffect(()=>{
    console.log(children)
  },[children])
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}
