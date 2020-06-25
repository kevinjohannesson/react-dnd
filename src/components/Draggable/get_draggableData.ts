export default function get_draggableData(
    element: HTMLElement,
    id: string,
    index: number,
  ){
  const DOMRect = element.getBoundingClientRect();
  const {height, width, x, y} = DOMRect;
  const margin = window.getComputedStyle(element, null).getPropertyValue('margin');
  const data = {id, index, x, y, height, width, margin};
  return data;
}