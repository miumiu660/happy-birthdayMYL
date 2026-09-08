'use client';
import { useEffect } from 'react';
import type { CSSProperties } from 'react';
import { RotateCcw } from 'lucide-react';
import { MagazineGraphic } from './magazine';
// Hand-cut physical strokes. No font mask. All textures recur from the twelve scenes.
const strokes:Record<string,string[]>={
 H:['M4 2L25 0 23 139 2 142Z','M76 0L96 3 98 141 74 138Z','M18 60L84 56 86 81 17 84Z'],
 A:['M41 1L59 6 25 142 1 138Z','M46 0L64 2 99 139 76 143Z','M24 91L78 87 85 109 18 114Z'],
 P:['M4 1L28 3 24 141 2 139Z','M19 2L74 0 94 14 99 57 79 79 21 77 23 56 69 58 78 47 76 28 67 21 20 24Z'],
 Y:['M0 3L26 0 53 53 44 76Z','M73 1L98 5 55 81 39 63Z','M40 64L61 62 62 142 37 140Z'],
 B:['M3 1L26 3 23 140 0 138Z','M20 2L70 0 92 17 91 50 73 72 21 74 23 53 65 53 73 43 71 27 63 21 21 23Z','M23 66L75 61 98 81 96 121 76 141 19 139 21 119 65 119 76 110 75 92 65 83 22 86Z'],
 I:['M9 1L92 3 89 24 7 22Z','M39 18L61 21 59 125 36 125Z','M7 119L94 117 91 141 6 138Z'],
 R:['M3 1L26 3 23 140 0 138Z','M20 2L70 0 92 17 94 52 74 77 21 75 24 53 65 54 75 43 71 28 63 21 21 23Z','M55 68L75 63 99 139 74 142 46 78Z'],
 T:['M0 3L99 0 96 25 2 27Z','M39 20L62 24 59 141 36 138Z'],
 D:['M3 2L25 0 24 140 1 139Z','M20 1L63 0 91 22 99 59 96 111 71 139 22 140 24 118 61 117 74 103 78 64 72 36 60 23 21 24Z'],
 M:['M2 2L23 0 24 140 0 141Z','M78 1L98 3 100 139 75 142Z','M18 1L35 0 58 61 45 86Z','M76 1L93 9 56 87 41 70Z'],
 L:['M4 0L27 3 23 138 1 140Z','M18 119L98 115 96 140 17 142Z'],
};
const fills=['magazine','jade','pink','linen','label','blue','paper','photo','tracing','stamp','film','yellow'];
function Definitions(){return <defs>
 <pattern id="magazine" width="100" height="145" patternUnits="userSpaceOnUse"><svg width="225" height="150" x="-55" viewBox="0 0 1000 650"><MagazineGraphic/></svg></pattern>
 <pattern id="jade" width="100" height="145" patternUnits="userSpaceOnUse"><image href="/images/pearls-jade-photo.png" width="210" height="145" x="-68"/></pattern>
 <pattern id="linen" width="100" height="145" patternUnits="userSpaceOnUse"><image href="/images/embroidery.jpg" width="140" height="200" y="-25"/></pattern>
 <pattern id="photo" width="100" height="145" patternUnits="userSpaceOnUse"><rect width="100" height="145" fill="#fffaf0"/><image href="/images/puppy-04.jpg" x="5" y="5" width="90" height="118" preserveAspectRatio="xMidYMid slice"/></pattern>
 <pattern id="stamp" width="100" height="145" patternUnits="userSpaceOnUse"><rect width="100" height="145" fill="#fff9e9"/><image href="/images/puppy-08.jpg" x="7" y="7" width="86" height="116" preserveAspectRatio="xMidYMid slice"/><text x="74" y="135" fill="#665741" fontSize="10">09</text></pattern>
 <pattern id="blue" width="100" height="145" patternUnits="userSpaceOnUse"><rect width="100" height="145" fill="#b6ccd6"/><image href="/images/butterfly.png" x="-20" width="150" height="150"/></pattern>
 <pattern id="label" width="100" height="145" patternUnits="userSpaceOnUse"><rect width="100" height="145" fill="#e8a9bb"/><image href="/images/fruit-label.svg" width="140" height="91" x="-20" y="25"/></pattern>
 <pattern id="pink" width="100" height="145" patternUnits="userSpaceOnUse"><rect width="100" height="145" fill="#d17192" fillOpacity=".7"/><path d="M0 0L75 145M3 0L78 145M60 0L5 145" stroke="#ffdce9" strokeWidth="2"/></pattern>
 <pattern id="paper" width="100" height="145" patternUnits="userSpaceOnUse"><rect width="100" height="145" fill="#e4d6b8"/><path d="M5 15H95M4 23H96M5 31H95M4 39H96M4 47H95M5 55H94M6 63H95M5 71H93M5 79H95" stroke="#827865" strokeWidth=".7"/><text x="5" y="110" fill="#584c3e" fontSize="17">2002</text></pattern>
 <pattern id="tracing" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="#ece8d9"/><path d="M0 0H20V20" fill="none" stroke="#929483" strokeWidth=".4"/></pattern>
 <linearGradient id="film"><stop stopColor="#c0ced0" stopOpacity=".5"/><stop offset=".46" stopColor="#fff" stopOpacity=".9"/><stop offset="1" stopColor="#93aaa7" stopOpacity=".6"/></linearGradient>
 <pattern id="yellow" width="100" height="145" patternUnits="userSpaceOnUse"><rect width="100" height="145" fill="#eee0a6"/><image href="/images/usagi.png" width="100" height="145"/></pattern>
 </defs>;}
function Letter({letter,n}:{letter:string;n:number}){return <g className="cut-letter" transform={'rotate('+((n%3)-1)*1.2+' 50 70)'}>{strokes[letter].map((d,j)=><path key={j} d={d} fill={'url(#'+fills[(n*3+j*5)%fills.length]+')'} className="assembled-scrap" style={{'--delay':((n*3+j)*48)+'ms'} as CSSProperties} stroke="#5c4939" strokeOpacity=".17" strokeWidth=".7"/>)}</g>;}
function Word({word,y,width,start}:{word:string;y:number;width:number;start:number}){const unit=width/word.length;return <g transform={'translate('+((1000-width)/2)+' '+y+')'}>{[...word].map((l,i)=><g key={i} transform={'translate('+(i*unit)+' 0) scale('+((unit-13)/100)+' 1)'}><Letter letter={l} n={start+i}/></g>)}</g>;}
export function FinalCollage({onReplay,play}:{onReplay:()=>void;play:(kind:string,intensity?:number,snippet?:boolean)=>void}){
 useEffect(()=>{const timers=Array.from({length:16},(_,i)=>setTimeout(()=>play(i===13?'thread-pull':'collage-place',.55),i*150+100));return()=>timers.forEach(clearTimeout);},[play]);
 return <section className="final-collage" aria-label="HAPPY BIRTHDAY MYL，用前十二层收集的素材拼成"><p className="final-eyebrow">EVERY LITTLE PIECE, BACK TOGETHER.</p><svg className="final-art" viewBox="0 0 1000 650" role="img" aria-label="HAPPY BIRTHDAY MYL"><Definitions/><Word word="HAPPY" y={22} width={700} start={0}/><Word word="BIRTHDAY" y={211} width={978} start={5}/>
 <g transform="translate(250 410) scale(1.55)"><path className="assembled-scrap" d="M2 2L23 0 24 140 0 141Z" fill="url(#jade)"/><path className="assembled-scrap" d="M78 1L98 3 100 139 75 142Z" fill="url(#magazine)"/><path className="assembled-scrap" d="M18 1L35 0 58 61 45 86Z" fill="url(#paper)"/><image className="assembled-object" href="/images/plum-blossom.png" x="37" y="-9" width="53" height="115" transform="rotate(22 63 48)"/><text x="2" y="133" fontSize="9" fill="#44372c">2002</text></g>
 <g transform="translate(439 410) scale(1.55)"><path className="assembled-scrap" d="M38 62L60 65 62 140 36 142Z" fill="url(#magazine)"/><path className="assembled-scrap" d="M76 0L100 5 55 85 39 66Z" fill="url(#pink)"/><g className="assembled-object"><svg x="22" y="-9" width="33" height="84" viewBox="96 0 72 140" transform="rotate(-28 42 68)"><image href="/images/character-sheet.png" x="-690" width="3766" height="463"/></svg><svg x="47" y="-9" width="33" height="84" viewBox="175 0 72 140" transform="rotate(28 55 68)"><image href="/images/character-sheet.png" x="-690" width="3766" height="463"/></svg></g></g>
 <g transform="translate(637 410) scale(1.55)"><path className="assembled-scrap" d="M4 0L27 3 23 138 1 140Z" fill="url(#linen)"/><path className="assembled-scrap" d="M18 119L98 115 96 140 17 142Z" fill="url(#photo)"/><g className="assembled-object" transform="rotate(9 94 120)"><rect x="72" y="93" width="44" height="57" fill="#fff9e9" stroke="#b9aa8f" strokeDasharray="2 2"/><image href="/images/puppy-08.jpg" x="76" y="97" width="36" height="43" preserveAspectRatio="xMidYMid slice"/><text x="100" y="147" fontSize="5" fill="#665741">09</text></g></g>
 <image className="assembled-object" href="/images/butterfly.png" x="788" y="16" width="100" height="96" transform="rotate(18 838 64)"/><image className="assembled-object" href="/images/butterfly.png" x="81" y="392" width="104" height="94" transform="rotate(-24 133 439)"/>
 <image className="assembled-object" href="/images/fruit-label.svg" x="28" y="224" width="69" height="44" transform="rotate(-9 60 245)"/><text x="510" y="326" fontFamily="Georgia" fontSize="15" fill="#5b3c36">24</text>
 </svg><div className="final-bottom"><span>09 / 09 · ALL TWELVE LAYERS</span><button className="replay-button" onClick={onReplay}><RotateCcw/> 再揭一次</button></div></section>;
}
