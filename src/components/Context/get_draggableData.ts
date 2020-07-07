export default function get_draggableData(
    element: HTMLElement
  ){
  const DOMRect = element.getBoundingClientRect();
  const {height, width, x, y} = DOMRect;
  const computedMargin = window.getComputedStyle(element, null).getPropertyValue('margin');
  const array = computedMargin.match(/-?\d+/g);  
  const margin = {
    top: array ? parseInt(array[0]) : 0,
    right: array ? parseInt(array[1] || array[0]) : 0,
    bottom: array ? parseInt(array[2] || array[0]) : 0,
    left: array ? parseInt(array[3] || array[1] || array[0]) : 0,
    computed: computedMargin,
  };

  const data = {x, y, height, width, margin};
  return data;
}