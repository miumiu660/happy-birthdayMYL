export const birthdayTiles=[
 {image:'birthday-cover.png',word:'生'},
 {image:'butterfly-atlas-01.jpg',word:''},
 {image:'apple-photo.png',word:'日'},
 {image:'pressed-cornflower.png',word:''},
 {image:'pearls-jade-photo.png',word:'快'},
 {image:'butterfly.png',word:''},
 {image:'chiikawa-friends.jpg',word:''},
 {image:'embroidery.jpg',word:'乐'},
 {image:'fruit-label.svg',word:''},
];
export function isBirthdaySelection(selected:readonly number[]){
 const unique=new Set(selected),targets=birthdayTiles.flatMap((tile,i)=>tile.word?[i]:[]);
 return unique.size===targets.length&&targets.every(i=>unique.has(i));
}
