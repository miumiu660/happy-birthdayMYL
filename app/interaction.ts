export type Direction='up-left'|'right'|'left'|'up'|'down';
export const layerItems=[
 ['film'],['spread'],['label'],['photo-film'],['tape-a','tape-b','flower'],['pink-film'],
 ['stamp-0','stamp-1','stamp-2','stamp-3'],['thread','tulle'],['washi'],
 ['wing-0','wing-1','wing-2','wing-3','wing-4','wing-5','wing-6','wing-7'],['character-left','character-right','character-middle'],['tracing'],
] as const;
export function dragProgress(direction:Direction,dx:number,dy:number,width:number){
 const distance=direction==='right'?dx:direction==='left'?-dx:direction==='up'?-dy:direction==='down'?dy:(-dx-dy)*.7;
 return Math.max(0,Math.min(1,distance/Math.min(210,width*.36)));
}
export function canCollect(layer:number,id:string,done:ReadonlySet<string>){
 const items:readonly string[]=layerItems[layer]??[];
 if(!items.includes(id)||done.has(id))return false;
 if(id==='flower')return done.has('tape-a')&&done.has('tape-b');
 if(id==='tulle')return done.has('thread');
 if(id==='character-middle')return done.has('character-left')&&done.has('character-right');
 return true;
}
