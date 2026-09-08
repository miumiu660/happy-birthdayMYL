'use client';
import {useEffect,useId,useRef,useState} from 'react';
import type {CSSProperties,PointerEvent as PE,ReactNode} from 'react';
import type {Direction} from './interaction';
import {peelGeometry,points} from './peel-geometry';
import {characterFrames} from './character-art';
export type PeelProps={id:string;backText?:string;character?:number;className?:string;children?:ReactNode;direction?:Direction;label:string;disabled?:boolean;sound?:string;onDone:(id:string)=>void;onTouch:(sound:string,speed?:number)=>void;onStart:()=>void;onProgress?:(p:number)=>void};
export function Peel({id,backText,character,className='',children,direction='up-left',label,disabled,sound='tear-paper',onDone,onTouch,onStart,onProgress}:PeelProps){
 const [p,setP]=useState(0),[held,setHeld]=useState(false),[gone,setGone]=useState(false),[size,setSize]=useState([600,400]),[axis,setAxis]=useState<Direction>(direction);
 const root=useRef<HTMLButtonElement>(null),value=useRef(0),frame=useRef(0),busy=useRef(false),drag=useRef<{x:number;y:number;p:number;t:number;pointer:number;span:number;base:number}|null>(null);
 const uid=useId().replace(/:/g,'');
 const special=/flower-lift|thread-pull|ear-target|usagi-main|center-tear/.test(className);
 const transparent=/film|cellophane/.test(sound),pink=className==='pink-film',ellipse=className==='apple-label';
 const irreversible=className==='center-tear'||sound==='stamp-tear';
 const free=/chiikawa-sticker|apple-label|stamp-peel|specimen-tape|ear-target|usagi-main/.test(className);
 const update=(v:number)=>{value.current=v;setP(v);onProgress?.(v);};
 useEffect(()=>{const el=root.current;if(!el)return;const observer=new ResizeObserver(()=>setSize([el.clientWidth||600,el.clientHeight||400]));observer.observe(el);return()=>{observer.disconnect();cancelAnimationFrame(frame.current);};},[]);
 const animate=(target:number,complete=false)=>{cancelAnimationFrame(frame.current);const from=value.current,start=performance.now();const duration=window.matchMedia('(prefers-reduced-motion: reduce)').matches?20:complete?480:380;const tick=(now:number)=>{const t=Math.min(1,(now-start)/duration),e=1-Math.pow(1-t,3);update(from+(target-from)*e);if(t<1)frame.current=requestAnimationFrame(tick);else if(complete){setGone(true);onDone(id);}};frame.current=requestAnimationFrame(tick);};
 const finish=()=>{if(busy.current||disabled)return;busy.current=true;setHeld(false);onTouch(sound,.75);animate(1,true);};
 const down=(e:PE<HTMLButtonElement>)=>{if(disabled||busy.current||drag.current)return;const r=e.currentTarget.getBoundingClientRect();if(className==='cover-film'&&(e.clientX-r.left<r.width*.72||e.clientY-r.top<r.height*.67))return;cancelAnimationFrame(frame.current);onStart();e.currentTarget.setPointerCapture(e.pointerId);drag.current={x:e.clientX,y:e.clientY,p:value.current,t:performance.now(),pointer:e.pointerId,base:value.current,span:Math.min(380,Math.max(95,Math.hypot(r.width,r.height)*.48))};setHeld(true);};
 const move=(e:PE<HTMLButtonElement>)=>{const d=drag.current;if(!d||d.pointer!==e.pointerId)return;const dx=e.clientX-d.x,dy=e.clientY-d.y;let current=direction;if(free&&Math.hypot(dx,dy)>6){current=Math.abs(dx)>Math.abs(dy)?dx>0?'right':'left':dy>0?'down':'up';setAxis(current);}let distance=current==='right'?dx:current==='left'?-dx:current==='up'?-dy:current==='down'?dy:(-dx-dy)*.7;if(className==='center-tear')distance=Math.max(Math.abs(dx),Math.abs(dy));const candidate=Math.max(0,Math.min(.995,d.base+distance/d.span));const next=irreversible?Math.max(d.p,candidate):candidate;if(Math.abs(next-d.p)>.02&&performance.now()-d.t>105){onTouch(sound,Math.min(1.25,Math.abs(next-d.p)*8+.3));d.t=performance.now();}d.p=next;update(next);};
 const up=(e:PE<HTMLButtonElement>)=>{const d=drag.current;if(!d||d.pointer!==e.pointerId)return;drag.current=null;setHeld(false);if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);if(d.p>.68)finish();else if(!irreversible)animate(0);};
 const g=peelGeometry(size[0],size[1],Math.max(p,className==='cover-film'?.055:.016),axis,ellipse);
 const clip='polygon('+g.front.map(([x,y])=>(x/size[0]*100)+'% '+(y/size[1]*100)+'%').join(',')+')';
 const line=g.crease.length>1?g.crease.slice(0,2):[];
 return <button ref={root} type="button" className={'peel-object physical-peel '+className+' dir-'+axis+(held?' held':'')+(gone?' gone':'')+(special?' special-peel':'')} style={{'--p':p} as CSSProperties} disabled={disabled||gone} aria-label={label} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={()=>{drag.current=null;setHeld(false);if(!irreversible)animate(0);}} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onStart();finish();}}}>
 <span className="peel-surface" style={special?undefined:{clipPath:clip}}>{children}</span>
 {!special&&<svg className={'physical-fold'+(transparent?' transparent-fold':'')} viewBox={'0 0 '+size[0]+' '+size[1]} preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id={'back-'+uid} x1="0" y1="0" x2="1" y2="1"><stop stopColor={pink?'#f9b3d0':transparent?'#edf5f1':'#fffaf0'} stopOpacity={transparent?.72:1}/><stop offset=".55" stopColor={pink?'#dd7197':transparent?'#c7d7d0':'#dfd5bc'} stopOpacity={transparent?.38:1}/><stop offset="1" stopColor={pink?'#ffe4ef':'#fffef6'} stopOpacity={transparent?.82:1}/></linearGradient><clipPath id={'backclip-'+uid}><polygon points={points(g.back)}/></clipPath></defs>
 {character===undefined?<polygon className="fold-shadow" points={points(g.back)} fill={'url(#back-'+uid+')'} stroke={transparent?'#ffffffa0':'#c6bda9'} strokeWidth=".65"/>:<g clipPath={'url(#backclip-'+uid+')'}><g transform={'matrix('+[1-2*g.nx*g.nx,-2*g.nx*g.ny,-2*g.nx*g.ny,1-2*g.ny*g.ny,2*g.c*g.nx,2*g.c*g.ny].join(' ')+')'}><svg width={size[0]} height={size[1]} viewBox={characterFrames[character].x+' 0 '+characterFrames[character].w+' '+characterFrames[character].h} style={{filter:'brightness(0) invert(1)',opacity:.98}}><image href="/images/character-sheet.png" width="3766" height="463"/></svg></g></g>}
 {backText&&p>.1&&<text clipPath={'url(#backclip-'+uid+')'} x={g.back.reduce((sum,v)=>sum+v[0],0)/Math.max(1,g.back.length)} y={g.back.reduce((sum,v)=>sum+v[1],0)/Math.max(1,g.back.length)} textAnchor="middle" dominantBaseline="middle" fill="#bd526c" fontFamily="BirthdayCute, sans-serif" fontSize={size[0]*.16}>{backText}</text>}
 {character===undefined&&line.length===2&&<><polyline points={points(line)} fill="none" stroke="#2d352438" strokeWidth={2+p*7}/><polyline points={points(line)} fill="none" stroke="#fff9" strokeWidth="1.4"/></>}
 <g style={{display:character===undefined?undefined:'none'}} clipPath={'url(#backclip-'+uid+')'} opacity={transparent?.34:.12}>{Array.from({length:10},(_,i)=><path key={i} d={'M'+(i*size[0]/9)+' 0L'+(i*size[0]/9+size[0]*.15+p*40)+' '+size[1]} stroke={transparent?'white':'#8b7c61'} strokeWidth={transparent?1.5:.5}/>)}</g>
 </svg>}
 </button>;
}
