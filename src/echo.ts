var seedrandom = require('seedrandom');
// console.log(rng());                  // Always 0.9282578795792454


// export default function echo(str: string, id: string, level?: number){
//   const rng = seedrandom(id);
//   const seededRandomColor = (seed: string) => `rgb(${rng(seed)*255},${rng(seed)*255},${rng(seed)*255})`
//   console.log(`%c${str}`, `background-color: ${seededRandomColor(id)}; color: black; padding-left: ${((level || 0)*10) + 2}px; padding-right: 2px`);
// }

export default function echo(str: string, id: string, level?: number){
  const rng = seedrandom(id);
  const seededRandomColor = (seed: string) => `rgb(${rng(seed)*255},${rng(seed)*255},${rng(seed)*255})`;
  // eslint-disable-next-line
  console.log(`%c${level ? ' ' : str}` + `%c${level ? ' ' : ''}` + `%c${level ? str : ''}`, `background-color: ${seededRandomColor(id)}; color: black; margin-right: 5px; padding-right: 5px; margin-left: ${((level || 0)*10)}px; ${level ? '' : 'padding-left: 5px;'}`, `padding-left: 1px; background-color: ${seededRandomColor(id+level)}; margin-right: 10px;`, '')
}


export function diff (a: number, b: number) { return a > b ? a - b : b - a };