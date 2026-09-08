'use client';
import {useEffect,useRef,useState} from 'react';
import {Check} from 'lucide-react';
import {birthdayTiles,isBirthdaySelection} from './birthday-verification-data';
export function BirthdayVerification({onComplete,onStart,onSound}:{onComplete:()=>void;onStart:()=>void;onSound:()=>void}){
 const [selected,setSelected]=useState<number[]>([]),[status,setStatus]=useState<'idle'|'wrong'|'passed'>('idle');
 const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);},[]);
 const verify=()=>{if(status==='passed')return;onStart();if(!isBirthdaySelection(selected)){setStatus('wrong');return;}setStatus('passed');onSound();timer.current=setTimeout(onComplete,1500);};
 return <section className={'birthday-check '+status} aria-label="生日图片验证"><header><span className="check-number">09 / 09</span><h2>寻找生日快乐</h2><p>选出分别藏着「生、日、快、乐」的四张图片</p></header><div className="birthday-grid">{birthdayTiles.map((tile,i)=><button key={tile.image} className={'birthday-tile tile-'+i+(selected.includes(i)?' selected':'')} disabled={status==='passed'} aria-label={'图片 '+(i+1)+(tile.word?'，含'+tile.word+'字':'，没有汉字')} aria-pressed={selected.includes(i)} onClick={()=>{onStart();setStatus('idle');setSelected(s=>s.includes(i)?s.filter(n=>n!==i):[...s,i]);}}><img src={'/images/'+tile.image} alt=""/>{tile.word&&<span className="photo-word">{tile.word}</span>}{selected.includes(i)&&<span className="selection-check"><Check/></span>}</button>)}</div><footer><span role="status">{status==='passed'?'验证通过，生日快乐！':status==='wrong'?'还差一点，再找找四个字。':''}</span><button className="verify-button" onClick={verify} disabled={status==='passed'}>{status==='passed'?<><Check/> 已通过</>:'验证'}</button></footer></section>;
}
