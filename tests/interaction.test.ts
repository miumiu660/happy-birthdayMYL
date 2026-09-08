import test from 'node:test';
import assert from 'node:assert/strict';
import {dragProgress,canCollect,layerItems} from '../app/interaction.ts';
test('all 12 scenes require their actual objects, not a page-wide advance',()=>{
 assert.equal(layerItems.length,12);assert.equal(layerItems[6].length,4);assert.equal(layerItems[9].length,8);
 assert.deepEqual(layerItems[2],['label']);assert.deepEqual(layerItems[0],['film']);
 for(let layer=0;layer<12;layer++){const done=new Set<string>();for(const id of layerItems[layer]){assert.equal(canCollect(layer,id,done),true);done.add(id);assert.equal(canCollect(layer,id,done),false);}assert.equal(done.size,layerItems[layer].length);assert.equal(canCollect(layer,'invalid',done),false);}
});
test('small touch gestures remain incomplete and wrong-way movement rebounds',()=>{
 for(const width of [320,390,960]){
 assert.equal(dragProgress('right',-100,0,width),0);assert.equal(dragProgress('up',0,100,width),0);
 assert.ok(dragProgress('right',12,0,width)<.48);assert.ok(dragProgress('up-left',-100,-100,width)>.48);
 assert.equal(dragProgress('down',0,999,width),1);
 }
});
test('tapes, thread and ears must be released before the attached object',()=>{
 assert.equal(canCollect(4,'flower',new Set()),false);
 assert.equal(canCollect(4,'flower',new Set(['tape-a'])),false);
 assert.equal(canCollect(4,'flower',new Set(['tape-a','tape-b'])),true);
 assert.equal(canCollect(7,'tulle',new Set()),false);
 assert.equal(canCollect(10,'character-middle',new Set(['character-left'])),false);
 assert.equal(canCollect(10,'character-middle',new Set(['character-left','character-right'])),true);
});
