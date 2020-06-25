export default function unblockEvents(element: HTMLElement) {
  element.style.userSelect= '';
  element.style.pointerEvents = '';
}