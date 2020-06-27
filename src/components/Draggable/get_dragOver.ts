export default function get_dragOver(event: MouseEvent) {
  const elementsFromPoint = document.elementsFromPoint(event.clientX, event.clientY);
  if(elementsFromPoint.length !== 0){
    const droppable = elementsFromPoint.find(el => el.hasAttribute('data-droppable')); 
    const droppableId = droppable ? droppable.getAttribute('data-droppable') : null;
    return droppableId;
  } else return null;
}