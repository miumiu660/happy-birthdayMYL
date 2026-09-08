'use client';
import {useEffect,useRef,useState} from 'react';
export function BirthdaySong({enabled}:{enabled:boolean}){
 const player=useRef<HTMLAudioElement|null>(null),[blocked,setBlocked]=useState(false);
 useEffect(()=>{const audio=new Audio('/assets/audio/birthday-melody.wav');audio.volume=.65;player.current=audio;return()=>{audio.pause();audio.src='';player.current=null;};},[]);
 useEffect(()=>{const audio=player.current;if(!audio)return;if(enabled){void audio.play().then(()=>setBlocked(false)).catch(()=>setBlocked(true));}else{audio.pause();setBlocked(false);}},[enabled]);
 return blocked&&enabled?<button className="song-start" onClick={()=>{void player.current?.play().then(()=>setBlocked(false));}}>播放生日歌 ♪</button>:null;
}
