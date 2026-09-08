'use client';
import {useEffect,useRef,useState} from 'react';
import type {PointerEvent as PE} from 'react';
export function threadPath(p:number){
 const anchor=45+(1-p)*150,amplitude=31*Math.pow(1-p,1.3);
 const pts=Array.from({length:85},(_,i)=>{const t=i/84,x=anchor+t*(135+p*100),y=65+Math.sin(t*Math.PI*6)*amplitude*Math.sin(Math.PI*t)+Math.sin(Math.PI*t)*12*(1-p);return [x,y];});
 return {path:pts.map(([x,y],i)=>(i?'L':'M')+x.toFixed(2)+' '+y.toFixed(2)).join(' '),anchor,end:pts[84]};
}
export function ThreadPull({onDone,onStart,onSound,onProgress}:{onDone:()=>void;onStart:()=>void;onSound:()=>void;onProgress:(p:number)=>void}){
 const [p,setP]=useState(0),drag=useRef<{x:number;base:number;pointer:number;span:number}|null>(null),value=useRef(0),finished=useRef(false),timer=useRef<ReturnType<typeof setTimeout>|null>(null),lastSound=useRef(0);
 useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);},[]);
 const update=(next:number)=>{value.current=next;setP(next);onProgress(next);if(next>=1&&!finished.current){finished.current=true;timer.current=setTimeout(onDone,300);}};
 const down=(e:PE<HTMLButtonElement>)=>{if(finished.current||drag.current)return;onStart();e.currentTarget.setPointerCapture(e.pointerId);drag.current={x:e.clientX,base:value.current,pointer:e.pointerId,span:e.currentTarget.clientWidth*.6};};
 const g=threadPath(p);
 return <button className="unravel-thread" aria-label="向右抽出缝线" onPointerDown={down} onPointerMove={e=>{const d=drag.current;if(!d||d.pointer!==e.pointerId)return;const next=Math.max(value.current,Math.min(1,d.base+(e.clientX-d.x)/d.span));if(next>value.current&&performance.now()-lastSound.current>130){onSound();lastSound.current=performance.now();}update(next);}} onPointerUp={e=>{drag.current=null;if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);}} onPointerCancel={()=>{drag.current=null;}} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onStart();onSound();update(1);}}}><svg viewBox="0 0 400 140" aria-hidden="true"><path d={'M22 65H'+g.anchor} stroke="#875268" strokeWidth="2" strokeDasharray="5 7" fill="none"/><path className="thread-shadow" d={g.path} fill="none" stroke="#40263533" strokeWidth="3" transform="translate(1 2)"/><path d={g.path} fill="none" stroke="#9b536e" strokeWidth="2.1" strokeLinecap="round"/><path d={g.path} fill="none" stroke="#efcad7" strokeWidth=".65" strokeLinecap="round" transform="translate(0 -0.65)"/><circle cx={g.end[0]} cy={g.end[1]} r="2.6" fill="#9b536e"/></svg></button>;
}
