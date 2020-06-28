import { T_vector } from "../../redux/dragDrop/dragDrop";
import { I_draggableData } from '../../redux/dragDrop/dragDrop.d';

export default function get_hoverId(event: MouseEvent, draggableData: I_draggableData) {
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
    const hoverId = (()=>{

      for (const vertex in lattice) {
        const vector = lattice[vertex];        
        const elementsFromPoint = document.elementsFromPoint(vector.x, vector.y);
        if(elementsFromPoint.length !== 0){
          const droppable = elementsFromPoint.find(el => el.hasAttribute('data-droppable'));
          if(droppable) return droppable.getAttribute('data-droppable');
        }
      }
      return null
    })()
    return hoverId;
  }

  // const elementsFromPoint = document.elementsFromPoint(x, y);
  // console.log(elementsFromPoint);
  // if(elementsFromPoint.length !== 0){
  //   const droppable = elementsFromPoint.find(el => el.hasAttribute('data-droppable')); 
  //   if(droppable) return droppable.getAttribute('data-droppable');
  //   else return null;
  // } else return null;
  // 
  
  // console.log(hoveredElement);
  // const elementsFromPoint = document.elementsFromPoint(event.clientX, event.clientY);
  // if(elementsFromPoint.length !== 0){
    //   const droppable = elementsFromPoint.find(el => el.hasAttribute('data-droppable')); 
    //   return droppable ? droppable.getAttribute('data-droppable') : null;
    // } else return null;
  // }
  // const dot = document.createElement('div');
  // dot.style.position = 'fixed';
  // dot.style.left = x + 'px';
  // dot.style.top = y + 'px';
  // dot.style.backgroundColor = 'black';
  // dot.style.height = '10px';
  // dot.style.width = '10px';
  // const root = document.querySelector('#root');
  // if(root) root.appendChild(dot);

  // const lattice: {[key: string]: T_vector} = {
    //   topleft: {
    //     x: x - width / 2,
    //     y: y - height / 2
    //   },
    //   topcenter: {
    //     x: x,
    //     y: y - height / 2,
    //   },
    //   topright: {
    //     x: x + width / 2,
    //     y: y - height / 2
    //   },
    //   middleleft: {
    //     x: x - width / 2,
    //     y: y
    //   },
    //   middlecenter: {
    //     x: x,
    //     y: y,
    //   },
    //   middleright: {
    //     x: x + width / 2,
    //     y: y
    //   },
    //   bottomleft: {
    //     x: x - width / 2,
    //     y: y + height / 2
    //   },
    //   bottomcenter: {
    //     x: x,
    //     y: y + height / 2,
    //   },
    //   bottomright: {
    //     x: x + width / 2,
    //     y: y + height / 2
    //   },
    // }

    // console.log(lattice)
    // const hoverId = (function(){
    //   for (const vertex in lattice) {
    //     const {x, y} = lattice[vertex];
    //     // const elementFromPoint = document.elementFromPoint(x, y);
    //     // console.log(elementFromPoint);
    //     const elementsFromPoint = document.elementsFromPoint(x, y);
    //     console.log(elementsFromPoint)
    // if(elementsFromPoint.length !== 0){
    //   const droppable = elementsFromPoint.find(el => el.hasAttribute('data-droppable')); 
    //   return droppable ? droppable.getAttribute('data-droppable') : null;
    // } else return null;
        
    //     // if(elementFromPoint && elementFromPoint.hasAttribute('data-droppable')) 
    //     // return elementFromPoint.getAttribute('data-droppable');
    //   }
    //   return null;
    // })();
    // console.log('klopt dit????', hoverId)
    // return hoverId;