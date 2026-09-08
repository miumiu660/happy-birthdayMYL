'use client';
import {useId} from 'react';
export function MagazineGraphic(){return <g>
 <rect width="1000" height="650" fill="#faf8f1"/>
 <image href="/images/puppy-01.jpg" x="30" y="25" width="443" height="485" preserveAspectRatio="xMidYMid slice"/>
 <text x="52" y="91" fill="white" fontFamily="Georgia" fontSize="65" letterSpacing="-3">good days,</text>
 <text x="53" y="145" fill="white" fontFamily="Georgia" fontStyle="italic" fontSize="60">good dogs.</text>
 <text x="41" y="568" fill="#425439" fontFamily="sans-serif" fontSize="28">犬と、暮らす。</text>
 <text x="42" y="602" fill="#67735b" fontFamily="sans-serif" fontSize="14" letterSpacing="2">きみがいる、いつもの毎日。</text>
 <image href="/images/puppy-02.jpg" x="526" y="25" width="443" height="274" preserveAspectRatio="xMidYMid slice"/>
 <image href="/images/puppy-03.jpg" x="526" y="320" width="202" height="280" preserveAspectRatio="xMidYMid slice"/>
 <image href="/images/japanese-magazine.jpg" x="753" y="320" width="196" height="280" preserveAspectRatio="xMidYMid meet"/>
 <text x="911" y="629" fontFamily="Georgia" fontSize="16" fill="#797b6a">2002</text>
 <path d="M500 0V650" stroke="#716b511f" strokeWidth="4"/>
 </g>;}
// The tear grows from the centre. Upper strips flex away while the unbroken
// lower sheet stays attached; image coordinates remain continuous across strips.
export function TornMagazine({progress}:{progress:number}){
 const id=useId().replace(/:/g,''),p=progress,tip=Math.min(650,60+p*750),rows=32,step=650/rows;
 const edge=(y:number)=>500+Math.sin(y*1.17)*2.3+Math.sin(y*.19)*3.7;
 const gap=(y:number)=>Math.pow(Math.max(0,(tip-y)/650),1.4)*p*225+Math.max(0,p-.88)*900;
 const path=(side:number)=>{const pts=[];for(let y=0;y<=tip;y+=7)pts.push([edge(y)+side*gap(y),y]);pts.push([500,tip]);return pts;};
 const left=path(-1),right=path(1),trace=(pts:number[][])=>pts.map((v,i)=>(i?'L':'M')+v.join(' ')).join(' ');
 return <svg className="torn-magazine" viewBox="0 0 1000 650" preserveAspectRatio="none" aria-label="日式狗狗生活杂志"><defs><g id={'print-'+id}><MagazineGraphic/></g><linearGradient id={'reverse-'+id}><stop stopColor="#ddd5c2"/><stop offset=".4" stopColor="#fffdf5"/><stop offset="1" stopColor="#f0e9d7"/></linearGradient>{Array.from({length:rows},(_,i)=>{const y=i*step;return <g key={i}><clipPath id={id+'-l-'+i}><path d={'M0 '+y+'H'+edge(y)+'L'+edge(y+step)+' '+(y+step+.5)+'H0Z'}/></clipPath><clipPath id={id+'-r-'+i}><path d={'M'+edge(y)+' '+y+'H1000V'+(y+step+.5)+'H'+edge(y+step)+'Z'}/></clipPath></g>;})}</defs>
 {Array.from({length:rows},(_,i)=>{const y=i*step,d=gap(y);return <g key={i}><g transform={'translate('+(-d)+' 0)'}><use href={'#print-'+id} clipPath={'url(#'+id+'-l-'+i+')'}/></g><g transform={'translate('+d+' 0)'}><use href={'#print-'+id} clipPath={'url(#'+id+'-r-'+i+')'}/></g></g>;})}
 {p>.01&&<><path d={trace(left)} fill="none" stroke="#584b332a" strokeWidth="12"/><path d={trace(right)} fill="none" stroke="#584b3326" strokeWidth="13"/><path d={trace(left)} fill="none" stroke="#fffcef" strokeWidth="3.4"/><path d={trace(right)} fill="none" stroke="#fffcef" strokeWidth="3"/><path d={trace(left)+'L'+(left[0][0]-Math.min(48,p*100))+' 0Z'} fill={'url(#reverse-'+id+')'} opacity=".75"/>
 {Array.from({length:24},(_,i)=>{const y=(tip-8)*i/24,x=edge(y),g=gap(y);return <g key={i} opacity=".75"><path d={'M'+(x-g-2)+' '+y+'l'+(3+i%3)+' '+(i%2?2:-3)} stroke="#fffdf3" strokeWidth=".8"/><path d={'M'+(x+g+2)+' '+y+'l-4 3'} stroke="#fffdf3" strokeWidth=".6"/></g>;})}</>}
 {p<.015&&<path d="M501 5l-4 12 7 13-5 12" stroke="#78674688" strokeWidth="2" fill="none"/>}
 </svg>;
}
