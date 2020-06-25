import { Dispatch } from "react";
import { dragStart } from '../../redux/dragDrop/actions';
import { vector } from '../../redux/dragDrop/dragDrop.d';

export default function mouseDown(
    event: MouseEvent, 
    element: HTMLElement,
    id: string,
    index: number,
    destination: React.MutableRefObject<vector | null>,
    dispatch: Dispatch<any>
  ){
  const DOMRect = element.getBoundingClientRect();
  const {height, width, x, y} = DOMRect;
  const margin = window.getComputedStyle(element, null).getPropertyValue('margin');
  const data = {id, index, x, y, height, width, margin};
  destination.current = {x, y};
  dispatch(dragStart(data));
}