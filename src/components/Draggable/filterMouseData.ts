export default function filterMouseData(event: MouseEvent) {
    return {
      movement: {
        x: event.movementX,
        y: event.movementY,
      },
      position: {
        x: event.clientX,
        y: event.clientY
      }
    };
};