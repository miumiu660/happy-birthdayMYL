import test from 'node:test';
import assert from 'node:assert/strict';
import {peelGeometry,polygonArea} from '../app/peel-geometry.ts';
test('attached front and reflected back conserve real sheet area',()=>{
 for(const direction of ['up-left','up','down','left','right'] as const){
  let last=Infinity;
  for(const p of [0,.01,.1,.25,.5,.75,.99,1]){
   const g=peelGeometry(960,600,p,direction),front=polygonArea(g.front),back=polygonArea(g.back);
   assert.ok(Math.abs(front+back-576000)<.01);
   assert.ok(front<=last);last=front;
   for(const [x,y] of [...g.front,...g.back])assert.ok(Number.isFinite(x)&&Number.isFinite(y));
  }
  assert.equal(polygonArea(peelGeometry(960,600,1,direction).front),0);
 }
});
test('a sticker retains its oval silhouette throughout peeling',()=>{
 const full=polygonArea(peelGeometry(160,100,0,'up-left',true).front);
 for(const p of [.1,.4,.7,.95]){const g=peelGeometry(160,100,p,'up-left',true);assert.ok(Math.abs(polygonArea(g.front)+polygonArea(g.back)-full)<.01);}
 assert.ok(full<16000&&full>11000);
});
