import { draggableData } from "../../redux/dragDrop/dragDrop";

export default function extractElement(element: HTMLElement, data: draggableData) {
  const margin = data.margin.match(/-?\d+/g);  
  const marginValues = {
    top: margin ? parseInt(margin[0]) : 0,
    right: margin ? parseInt(margin[1] || margin[0]) : 0,
    bottom: margin ? parseInt(margin[2] || margin[0]) : 0,
    left: margin ? parseInt(margin[3] || margin[1] || margin[0]) : 0,
  }
  
  element.style.pointerEvents = '';
  
  element.style.top = data.y - marginValues.top + 'px';
  element.style.left = data.x - marginValues.left + 'px';
  element.style.position = 'fixed';
  element.style.zIndex = '5000';

  // console.log('hallo');
  // const clone = element.cloneNode(true)
  // document.getElementById('root')?.appendChild(clone);
}