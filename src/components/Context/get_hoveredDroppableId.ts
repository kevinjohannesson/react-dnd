import { T_vector } from "../../redux/dragDrop/dragDrop";
import { I_draggableData } from '../../redux/dragDrop/dragDrop';
import { I_data_droppable } from './Context';

export default function get_hoveredDroppableId(
    event: MouseEvent, 
    draggableData: I_draggableData,
    droppables: { [key: string]: I_data_droppable }
  ){
  const x = event.clientX,
        y = event.clientY;
  const {width, height} = draggableData;

  const lattice: {[key: string]: T_vector} = {
      topleft: {
        x: x - width / 2,
        y: y - height / 2
      },
      topcenter: {
        x: x,
        y: y - height / 2,
      },
      topright: {
        x: x + width / 2,
        y: y - height / 2
      },
      middleleft: {
        x: x - width / 2,
        y: y
      },
      middlecenter: {
        x: x,
        y: y,
      },
      middleright: {
        x: x + width / 2,
        y: y
      },
      bottomleft: {
        x: x - width / 2,
        y: y + height / 2
      },
      bottomcenter: {
        x: x,
        y: y + height / 2,
      },
      bottomright: {
        x: x + width / 2,
        y: y + height / 2
      },
    }
    const hoveredDroppable = (()=>{
      for (const vertex in lattice) {
        const vector = lattice[vertex]; 
        const elementFromPoint = document.elementFromPoint(vector.x, vector.y);
        for(const droppable in droppables){
          if(droppables[droppable].ref.current){
            if(droppables[droppable].ref.current === elementFromPoint) return droppables[droppable].id;
          } else console.error('Unable to find ref.current')
        }
      }
      return null
    })()
    return hoveredDroppable;
  }