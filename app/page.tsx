'use client';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { FinalCollage } from './pieces';
import { usePaperAudio } from './paper-audio';
import { canCollect, layerItems } from './interaction';
import { Peel } from './physical-peel';
import { TornMagazine } from './magazine';
import { StampBoard } from './stamp-board';
import { ThreadPull } from './thread-pull';
import { BirthdaySong } from './birthday-song';
import { BirthdayVerification } from './birthday-verification';
import { PlumBloom } from './plum-bloom';
import { CharacterArt } from './character-art';

const chapters = [
 ['世界觉得需要 MYL，于是她在这天诞生了。','透明封膜'],
 ['愿这一岁，有新的故事，也有老朋友。','日式杂志'],
 ['愿你被爱，也能自由地做自己。','苹果标签'],
 ['24，是离 18 和 30 一样近的年纪。','拍立得'],
 ['愿你慢慢长大，也慢慢开花。','压花标本'],
 ['愿生活偶尔很甜，愿你一直可爱。','粉色玻璃纸'],
 ['愿每一次想念，都能抵达。','邮票收藏'],
 ['不必成为谁期待的样子，你就是你。','刺绣薄纱'],
 ['愿珍贵的事物，长久地留在你身边。','珍珠与玉'],
 ['愿你自由，愿你有重新出发的勇气。','蝴蝶标本'],
 ['长大一岁，也可以继续当小孩。','乌萨奇贴纸'],
 ['不止生日快乐，愿往后的每一天都快乐。','描图纸'],
] as const;
const A='/images/';
const style=(s:Record<string,string|number>)=>s as CSSProperties;
export function FruitLabel(){return <img className="label-design-image" src={A+'fruit-label.svg'} alt="粉色 pink lady 标签，印有 09"/>;}
function Layer({index,onComplete,onCollect,audio}:{index:number;onComplete:()=>void;onCollect:(id:string)=>void;audio:ReturnType<typeof usePaperAudio>}){
 const [done,setDone]=useState<string[]>([]),[split,setSplit]=useState(0),[thread,setThread]=useState(0);
 const completed=useRef(new Set<string>());
 const count=layerItems[index].length;
 const complete=(id:string)=>{if(!canCollect(index,id,completed.current))return;completed.current.add(id);setDone([...completed.current]);onCollect(index+':'+id);if(index!==9)audio.play('paper-drop',.45);if(completed.current.size===count)onComplete();};
 const props={onDone:complete,onStart:audio.unlock,onTouch:(kind:string,speed=1)=>audio.play(kind,speed,true)};
 const has=(id:string)=>done.includes(id);
 const chip=(_text:string,_dir='↖')=>null;
 switch(index){
 case 0:return <div className="scene opening birthday-cover"><img className="cover-still" src={A+'birthday-cover.png'} alt="草莓蛋糕、丝带与生日礼物"/><h1 aria-label="PEEL HERE">{['P','E','E','L','H','E','R','E'].map((letter,n)=><span key={n} className={'scatter-letter letter-'+n}>{letter}</span>)}</h1><span className="opening-date">09 / 09</span><svg className="corner-arrow" viewBox="0 0 180 140" aria-hidden="true"><path d="M12 16C74 0 120 28 94 54C70 76 40 50 69 40C105 28 142 78 156 119M128 110Q151 116 156 124Q160 105 167 96" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/></svg><Peel {...props} id="film" label="揭开箭头指向的右下角透明膜" className="cover-film" sound="peel-film"><span className="film-sheen"/><span className="cover-grain"/></Peel></div>;
 case 1:return <div className="scene magazine"><div className="magazine-under"><img src={A+'puppy-reveal.jpg'} alt="杂志下面藏着的可爱小狗"/></div><TornMagazine progress={split}/><Peel {...props} id="spread" className="center-tear" direction="right" onProgress={setSplit} label="从杂志中央裂口向两边撕开"/></div>;
 case 2:return <div className="scene fruit-scene"><img className="full-photo" src={A+'apple-photo.png'} alt="亚麻布上的红苹果，果皮有细微水珠"/>{has('label')&&<div className="detached-label-back" aria-label="揭下来的标签纸背面写着生日快乐"><span>生日快乐</span></div>}{!has('label')&&<Peel {...props} id="label" className="apple-label" backText="生日快乐" label="向左上揭下苹果标签" sound="sticker-peel"><FruitLabel/></Peel>}</div>;
 case 3:return <div className={'scene photo-scene'+(has('photo-film')?' dog-smiles':'')}><span className="micro top-left">LIGHT STUDY / SEPTEMBER</span><div className="photo-mat"><div className="photo-image"><img src={A+'puppy-04.jpg'} alt="拍立得里的柯基小狗"/><img className="smiling-puppy" src={A+'puppy-smile.png'} alt="小狗吐着舌头笑"/></div><b>24</b><Peel {...props} id="photo-film" className="photo-film" direction="down" label="向下剥离拍立得薄膜" sound="peel-film"><span className="film-sheen"/>{chip('PULL','↓')}</Peel></div><span className="micro bottom-right">EXPOSURE 024</span></div>;
 case 4:return <div className="scene botanical-scene"><span className="micro top-left">HERBARIUM / SPECIMEN 005</span><div className="specimen-rules"/><div className="botanical-note"><em>Little<br/>blooms.</em><p>一枝，夹在纸页之间。</p></div><Peel {...props} id="flower" className="flower-lift" disabled={!has('tape-a')||!has('tape-b')} direction="up" label="向上拿起压花"><img src={A+'pressed-cornflower.png'} alt="压制的蓝色矢车菊"/></Peel>{!has('tape-a')&&<Peel {...props} id="tape-a" className="specimen-tape tape-a" direction="right" label="揭下上方胶带" sound="sticker-peel"></Peel>}{!has('tape-b')&&<Peel {...props} id="tape-b" className="specimen-tape tape-b" direction="left" label="揭下下方胶带" sound="sticker-peel"></Peel>}</div>;
 case 5:return <div className={'scene pink-scene'+(has('pink-film')?' blooming':'')}><PlumBloom open={has('pink-film')}/><span className="pink-type">a rose-tinted<br/><em>little world.</em></span><Peel {...props} id="pink-film" className="pink-film" direction="right" label="向右拉开粉色玻璃纸" sound="cellophane"><span className="crinkle crinkle-one"/><span className="crinkle crinkle-two"/><span className="crinkle crinkle-three"/>{chip('展开','→')}</Peel></div>;
 case 6:return <div className="scene postal-scene"><StampBoard onDone={complete} onStart={audio.unlock} onSound={()=>audio.play('collage-place',.65)}/></div>;
 case 7:return <div className="scene textile-scene" style={style({'--thread':thread})}><span className="cloth-birthday">happy<br/><em>birthday</em></span><Peel {...props} id="tulle" className="embroidered-cloth" direction="up" disabled={!has('thread')} label="掀开已解开缝线的碎花布" sound="fabric-rub"><img src={A+'embroidery.jpg'} alt="细致花卉刺绣的古董棉纱"/><span className="mesh"/></Peel>{!has('thread')&&<ThreadPull onDone={()=>complete('thread')} onStart={audio.unlock} onSound={()=>audio.play('thread-pull',.5,true)} onProgress={setThread}/>}</div>;
 case 8:return <div className="scene pearl-scene"><img className="full-photo" src={A+'pearls-jade-photo.png'} alt="手工纸上的不规则淡水珍珠和淡绿色玉环"/><span className="pearl-title">Pearl<br/>&amp; jade.</span><Peel {...props} id="washi" className="pearl-envelope" direction="down" label="向下抽出包裹珍珠的纸封套"><span className="envelope-label">LES PETITS TRÉSORS<br/><b>09</b></span>{chip('慢慢拉开','↓')}</Peel></div>;
 case 9:return <div className="scene butterfly-scene"><img className="atlas-page atlas-left" src={A+'butterfly-atlas-01.jpg'} alt="古典蝴蝶图鉴"/><img className="atlas-page atlas-right" src={A+'butterfly-atlas-02.jpg'} alt="蝴蝶收藏图谱"/>{[0,1,2,3,4,5,6,7].map(n=><button key={n} disabled={has('wing-'+n)} className={'living-butterfly butterfly-'+n+(has('wing-'+n)?' flying':'')} aria-label={'让第'+(n+1)+'只蝴蝶飞走'} onClick={()=>{audio.unlock();complete('wing-'+n);}}><img src={A+'butterfly.png'} alt=""/></button>)}</div>;
 case 10:return <div className={'scene character-scene'+(has('character-middle')?' friends-revealed':'')}><div className="sticker-backing"/><img className="friends-picture" src={A+'chiikawa-friends.jpg'} alt="Chiikawa、Hachiware 和 Usagi 的合照"/>{[0,2,1].map(kind=>{const key=kind===0?'character-left':kind===2?'character-right':'character-middle';return !has(key)&&<Peel {...props} key={key} id={key} character={kind} className={'chiikawa-sticker character-'+kind} disabled={kind===1&&(!has('character-left')||!has('character-right'))} direction="up-left" label={'揭下'+['左边的 Chiikawa','中间的 Usagi','右边的 Hachiware'][kind]+'贴纸'} sound="sticker-peel"><CharacterArt kind={kind}/></Peel>;})}</div>;
 default:return <div className="scene tracing-scene"><div className="under-tracing"><img src={A+'butterfly-atlas-02.jpg'} alt="收藏的蝴蝶图鉴"/><span>all the pieces.</span></div><Peel {...props} id="tracing" className="tracing-sheet" direction="up" label="从底部向上揭开描图纸"><div className="draft-letters"><span>M</span><span>Y</span><span>L</span></div><span className="draft-note">a few things,<br/>that spell you.</span>{chip('最后一张','↑')}</Peel></div>;
 }
}
export default function Home(){
 const [index,setIndex]=useState(0),[leaving,setLeaving]=useState(false),[collected,setCollected]=useState<string[]>([]);
 const audio=usePaperAudio(),timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);},[]);
 const next=()=>{timer.current=setTimeout(()=>{setLeaving(true);timer.current=setTimeout(()=>{setIndex(i=>i+1);setLeaving(false);},950);},index===3?2600:index===5?3600:index===10?3000:index===1||index===2||index===7?2400:index===9?500:100);};
 const replay=()=>{if(timer.current)clearTimeout(timer.current);setIndex(0);setCollected([]);setLeaving(false);};
 useEffect(()=>{
  const context=(document as Document & {modelContext?:{registerTool:(tool:unknown,options:{signal:AbortSignal})=>void|Promise<void>}}).modelContext;
  if(!context)return;
  const lifecycle=new AbortController();
  void Promise.resolve(context.registerTool({name:'reveal_peel_here_collage',title:'Reveal the final PEEL HERE collage',description:'Skip the remaining twelve-layer interaction and display the assembled HAPPY BIRTHDAY MYL keepsake.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:false},execute:async(input:Record<string,unknown>)=>{if(input&&Object.keys(input).length)throw new Error('No inputs accepted');if(timer.current)clearTimeout(timer.current);setCollected(layerItems.flatMap((items,i)=>items.map(id=>i+':'+id)));setIndex(13);setLeaving(false);return {status:'revealed',message:'HAPPY BIRTHDAY MYL'};}},{signal:lifecycle.signal})).catch(()=>undefined);
  return()=>lifecycle.abort();
 },[]);
 return <main className={'game-shell'+(index===13?' at-finale':'')}><header className="site-header"><span className="wordmark">PEEL HERE<span> / </span></span><div className="header-tools"><span>09 / 09</span><button className="sound-button" onClick={audio.toggle} aria-pressed={audio.on} aria-label={audio.on?'关闭音效':'开启音效'}>{audio.on?<Volume2/>:<VolumeX/>}</button></div></header>{index<12?<><section className={'stage stage-'+index+(leaving?' scene-leaving':'')} aria-label={'第 '+(index+1)+' 层：'+chapters[index][1]}><Layer key={index} index={index} onComplete={next} onCollect={id=>setCollected(c=>[...c,id])} audio={audio}/></section>{index===0&&<p className="cover-message">{chapters[0][0]}</p>}</>:index===12?<BirthdayVerification onComplete={()=>setIndex(13)} onStart={audio.unlock} onSound={()=>audio.play('collage-place',.6)}/>:<><FinalCollage onReplay={replay} play={audio.play}/><BirthdaySong enabled={audio.on}/></>}<span className="sr-only">可使用触屏或鼠标拖拽。键盘可用 Tab 选中物件，按回车完成揭开。</span></main>;
}
