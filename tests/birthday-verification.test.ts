import test from 'node:test';
import assert from 'node:assert/strict';
import {isBirthdaySelection,birthdayTiles} from '../app/birthday-verification-data.ts';
test('birthday verification requires precisely all four different characters',()=>{
 assert.equal(birthdayTiles.map(t=>t.word).join(''),'生日快乐');
 assert.equal(isBirthdaySelection([0,2,4,7]),true);
 assert.equal(isBirthdaySelection([7,4,2,0]),true);
 for(const ids of [[],[0,2,4],[0,2,4,7,8],[0,1,2,4]])assert.equal(isBirthdaySelection(ids),false);
});
