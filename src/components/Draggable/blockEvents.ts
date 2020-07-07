export default function blockEvents(element: HTMLElement) {
  if(element.style.userSelect !== 'none') element.style.userSelect = 'none';
  if(element.style.pointerEvents !== 'none') element.style.pointerEvents = 'none';
}