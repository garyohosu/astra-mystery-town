import test from 'node:test';
import assert from 'node:assert/strict';
import {lightColor} from '../dist/lighting.js';
const color=(x,z,yaw,on)=>lightColor('#ffffff',[[x,1.3,z]],{x:0,z:0},yaw,on);
test('Flashlight follows facing direction and off restores ambient light',()=>{
  assert.notEqual(color(0,5,0,true),color(0,5,0,false));
  assert.equal(color(0,-5,0,true),color(0,-5,0,false));
  assert.equal(color(0,5,Math.PI,true),color(0,5,0,false));
  assert.equal(color(5,0,Math.PI/2,true),color(0,5,0,true));
  assert.equal(color(0,25,0,true),color(0,25,0,false));
});
