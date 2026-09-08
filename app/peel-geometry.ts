import type {Direction} from './interaction';
export type Point=[number,number];
function clipped(poly:Point[],nx:number,ny:number,c:number,keep:boolean):Point[]{
 const output:Point[]=[];const sign=keep?1:-1;
 for(let i=0;i<poly.length;i++){
  const a=poly[i],b=poly[(i+1)%poly.length],da=(a[0]*nx+a[1]*ny-c)*sign,db=(b[0]*nx+b[1]*ny-c)*sign;
  if(da<=0)output.push(a);
  if((da<=0)!==(db<=0)){const t=da/(da-db);output.push([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t]);}
 }
 return output;
}
export function peelGeometry(width:number,height:number,progress:number,direction:Direction,ellipse=false){
 const w=Math.max(1,width),h=Math.max(1,height),p=Math.max(0,Math.min(1,progress));
 const [nx,ny]=direction==='up-left'?[Math.SQRT1_2,Math.SQRT1_2]:direction==='up'?[0,1]:direction==='down'?[0,-1]:direction==='left'?[1,0]:[-1,0];
 const polygon:Point[]=ellipse?Array.from({length:64},(_,i)=>[w/2+Math.cos(i*Math.PI/32)*w*.49,h/2+Math.sin(i*Math.PI/32)*h*.47]):[[0,0],[w,0],[w,h],[0,h]];
 const projections=polygon.map(v=>v[0]*nx+v[1]*ny),max=Math.max(...projections),min=Math.min(...projections),c=max-p*(max-min);
 const front=clipped(polygon,nx,ny,c,true),removed=clipped(polygon,nx,ny,c,false);
 const back:Point[]=removed.map(([x,y])=>{const d=x*nx+y*ny-c;return [x-2*d*nx,y-2*d*ny];});
 const crease=front.filter(v=>Math.abs(v[0]*nx+v[1]*ny-c)<.01);
 return {front,back,crease,nx,ny,c};
}
export const points=(poly:Point[])=>poly.map(p=>p.map(v=>v.toFixed(2)).join(',')).join(' ');
export function polygonArea(poly:Point[]){return Math.abs(poly.reduce((sum,a,i)=>{const b=poly[(i+1)%poly.length];return sum+a[0]*b[1]-b[0]*a[1];},0)/2);}
