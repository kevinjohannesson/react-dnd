import { vector } from "../../redux/dragDrop/dragDrop";
import { Dispatch } from 'react';
import { dragEnd } from "../../redux/dragDrop/actions";
import { translateElement } from './translateElement';
import resetElement from './resetElement';

export default function mouseUp(
    event: MouseEvent,
    element: HTMLElement,
    destination: React.MutableRefObject<vector | null>,
    dragoverId: React.MutableRefObject<string | null>, 
    mouseMoveHandler: (event: MouseEvent) => void,
    dispatch: Dispatch<any>,
  ){
  document.removeEventListener('mousemove', mouseMoveHandler);

  const DOMRect = element.getBoundingClientRect();
  const start = {
    x: DOMRect.x,
    y: DOMRect.y
  };

  if(dragoverId.current){
    const placeholder = document.querySelector(`[data-placeholder=${dragoverId.current}]`);
    if(placeholder) {
      const placeholder_DOMRect = placeholder.getBoundingClientRect();
      const {x, y} = placeholder_DOMRect;
      destination.current = {x, y};
    }
  }

  if(destination.current){
    const distance = Math.sqrt( 
      (Math.pow((start.x - destination.current.x), 2)) +
      (Math.pow((start.y - destination.current.y), 2))
    );

    const translation = {
      x: -(DOMRect.x - destination.current.x),
      y: destination.current.y - DOMRect.y,
    };

    const handleTransitionEnd = () => {
      resetElement(element);
      element.removeEventListener('transitionend', handleTransitionEnd);
    }
    element.addEventListener('transitionend', handleTransitionEnd);
    const time = distance / 1000;
    element.style.transition = `transform ${0.1 + ((time > 1 ? 1 : time)/3)}s ease`;
    translateElement(element, translation);
    dispatch(dragEnd());
  }
}

