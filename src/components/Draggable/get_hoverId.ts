export default function get_hoverId(event: MouseEvent) {
  const elementsFromPoint = document.elementsFromPoint(event.clientX, event.clientY);
  if(elementsFromPoint.length !== 0){
    const droppable = elementsFromPoint.find(el => el.hasAttribute('data-droppable')); 
    return droppable ? droppable.getAttribute('data-droppable') : null;
  } else return null;
}