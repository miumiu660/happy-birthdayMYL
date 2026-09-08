import {writeFileSync} from 'node:fs';
const tune=[[67,.5],[67,.5],[69,1],[67,1],[72,1],[71,2],[67,.5],[67,.5],[69,1],[67,1],[74,1],[72,2],[67,.5],[67,.5],[79,1],[76,1],[72,1],[71,1],[69,2],[77,.5],[77,.5],[76,1],[72,1],[74,1],[72,2.5]];
const rate=22050,beat=.46,length=Math.ceil((tune.reduce((n,v)=>n+v[1],0)*beat+2)*rate),samples=new Float64Array(length);
let cursor=.3;
for(const [note,beats] of tune){const duration=beats*beat,frequency=440*2**((note-69)/12);
 for(let i=0;i<Math.min(rate*2,length-Math.floor(cursor*rate));i++){const t=i/rate,envelope=Math.min(1,t/.012)*Math.exp(-t/Math.max(.2,duration*.9));samples[Math.floor(cursor*rate)+i]+=.18*envelope*(Math.sin(2*Math.PI*frequency*t)+.22*Math.sin(2*Math.PI*frequency*2*t)+.07*Math.sin(2*Math.PI*frequency*3*t));}cursor+=duration;}
const wav=Buffer.alloc(44+length*2);wav.write('RIFF');wav.writeUInt32LE(wav.length-8,4);wav.write('WAVEfmt ',8);wav.writeUInt32LE(16,16);wav.writeUInt16LE(1,20);wav.writeUInt16LE(1,22);wav.writeUInt32LE(rate,24);wav.writeUInt32LE(rate*2,28);wav.writeUInt16LE(2,32);wav.writeUInt16LE(16,34);wav.write('data',36);wav.writeUInt32LE(length*2,40);for(let i=0;i<length;i++)wav.writeInt16LE(Math.round(Math.max(-1,Math.min(1,samples[i]))*32767),44+i*2);
writeFileSync(new URL('../public/assets/audio/birthday-melody.wav',import.meta.url),wav);
