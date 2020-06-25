import { vector } from "../../redux/dragDrop/dragDrop";

export const translateElement = (
    element: HTMLElement, 
    position: vector
  ) => {
  if(element){
    // const translate = { 
    //   x: movement.x, 
    //   y: movement.y 
    // }

    // const {top, left} = element.style;

    // const left = movement.x + 
// 
    element.style.zIndex = '5000';
    element.style.left = `${position.x}px`;
    element.style.top = `${position.y}px`;
  }
}