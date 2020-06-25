export default function blockEvents(element: HTMLElement) {
  element.style.userSelect= 'none';
  element.style.pointerEvents = 'none';
}