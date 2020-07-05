import { I_draggableData } from "../../redux/dragDrop/dragDrop";

export default function translateElement(
  event: MouseEvent, 
  element: HTMLElement, 
  data: I_draggableData,
  ){
    element.style.left = (event.clientX - data.margin.left - (data.width/2) ) + 'px';
    element.style.top = (event.clientY - data.margin.top - (data.height/2)) + 'px';
}