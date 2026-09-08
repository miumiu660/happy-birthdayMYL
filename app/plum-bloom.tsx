'use client';
import {useId} from 'react';
import type {CSSProperties} from 'react';
const flowers=[{x:210,y:221,rx:115,ry:117},{x:133,y:475,rx:124,ry:132},{x:358,y:660,rx:63,ry:84}];
export function PlumBloom({open}:{open:boolean}){
 const id=useId().replace(/:/g,'');
 return <svg className={'plum-bloom'+(open?' flowers-open':'')} viewBox="0 0 550 900" role="img" aria-label={open?'梅花缓缓绽放':'含苞的梅花枝'}>
 <defs><mask id={id+'-branch'}><rect width="550" height="900" fill="white"/>{flowers.map((f,i)=><ellipse key={i} cx={f.x} cy={f.y} rx={f.rx} ry={f.ry} fill="black"/>)}</mask>{flowers.map((f,i)=><clipPath id={id+'-flower-'+i} key={i}><ellipse cx={f.x} cy={f.y} rx={f.rx} ry={f.ry}/></clipPath>)}</defs>
 <image href="/images/plum-blossom.png" width="550" height="900" mask={'url(#'+id+'-branch)'}/>
 {flowers.map((f,i)=><g key={i} className="bloom-flower" style={{transformOrigin:f.x+'px '+f.y+'px','--bloom-delay':i*260+'ms'} as CSSProperties}><image href="/images/plum-blossom.png" width="550" height="900" clipPath={'url(#'+id+'-flower-'+i+')'}/></g>)}
 </svg>;
}
