import { I_draggableData } from "../../redux/dragDrop/dragDrop";

export default function extractElement(
    element: HTMLElement, 
    data: I_draggableData
  ){

  // element.style.top = data.y - data.margin.top + 'px';
  // element.style.left = data.x - data.margin.left + 'px';

  // element.style.left = (data.cursorPosition.x - data.margin.left - (data.width/2) ) + 'px';
  // element.style.top = (data.cursorPosition.y - data.margin.top - (data.height/2)) + 'px';
  // element.style.zIndex = '5000';
  // element.style.position = 'fixed';
  
  // requestAnimationFrame(()=>{
  //   const resetTransition = () => {
  //     element.style.transition = '';
  //     element.removeEventListener('transitionend', resetTransition);
  //   };
  //   element.addEventListener('transitionend', resetTransition);
  //   // element.style.transition = 'top, left, 0.03s ease';
  //   element.style.left = (data.cursorPosition.x - data.margin.left - (data.width/2) ) + 'px';
  //   element.style.top = (data.cursorPosition.y - data.margin.top - (data.height/2)) + 'px';
  // });
}