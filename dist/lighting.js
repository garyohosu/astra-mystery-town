// World-space flashlight. Ambient moonlight keeps navigation possible when off.
export function lightColor(color, vertices, player, yaw, enabled) {
  const center = vertices.reduce((a,v)=>a.map((n,i)=>n+v[i]/vertices.length),[0,0,0]);
  const dx=center[0]-player.x, dz=center[2]-player.z;
  const distance=Math.hypot(dx,dz), forward=dx*Math.sin(yaw)+dz*Math.cos(yaw);
  const angle=distance<.01?1:forward/distance;
  const cone=Math.max(0,Math.min(1,(angle-.72)/.24));
  const falloff=Math.max(0,1-distance/19);
  const beam=enabled?cone*falloff*Math.max(0,1-Math.abs(center[1]-1.3)/9):0;
  const glow=enabled?Math.max(0,1-distance/3)*.18:0;
  return '#'+color.slice(1).match(/../g).map((c,i)=>{
    const ambient=[.23,.30,.44][i], warmth=[1,.87,.60][i];
    return Math.round(Math.min(255,parseInt(c,16)*(ambient+beam*warmth+glow))).toString(16).padStart(2,'0');
  }).join('');
}
