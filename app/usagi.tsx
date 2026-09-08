import {useId} from 'react';
export function UsagiArt({left=true,right=true}:{left?:boolean;right?:boolean}){
 const id=useId().replace(/:/g,'');
 return <svg className="usagi-art" viewBox="0 0 335 463" role="img" aria-label="乌萨奇"><defs><clipPath id={'usagi-'+id}><rect x="0" y="136" width="335" height="327"/>{left&&<rect x="96" y="0" width="72" height="140"/>}{right&&<rect x="175" y="0" width="72" height="140"/>}</clipPath></defs><image href="/images/character-sheet.png" x="-690" width="3766" height="463" clipPath={'url(#usagi-'+id+')'}/></svg>;
}
export function UsagiEar({right=false}:{right?:boolean}){return <svg className="ear-art" viewBox={(right?'175':'96')+' 0 72 140'} aria-hidden="true"><image href="/images/character-sheet.png" x="-690" width="3766" height="463"/></svg>;}
