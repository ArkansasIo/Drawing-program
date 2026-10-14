export function solveTwoBoneIK(root,target,lengthA,lengthB){
  const dx=target.x-root.x,dy=target.y-root.y,d=Math.hypot(dx,dy),clamp=Math.max(.0001,Math.min(d,lengthA+lengthB))
  const a=Math.acos(Math.max(-1,Math.min(1,(lengthA*lengthA+clamp*clamp-lengthB*lengthB)/(2*lengthA*clamp))))
  const base=Math.atan2(dy,dx)
  const bend=Math.acos(Math.max(-1,Math.min(1,(lengthA*lengthA+lengthB*lengthB-clamp*clamp)/(2*lengthA*lengthB))))
  return{rootRotation:base-a,jointRotation:Math.PI-bend,reach:clamp}
}
export function evaluateBones(bones){
  const out=new Map()
  const visit=b=>{
    if(out.has(b.id))return out.get(b.id)
    const parent=bones.find(x=>x.id===b.parent)
    const p=parent?visit(parent):{x:0,y:0,rotation:0}
    const rotation=p.rotation+(b.rotation||0),x=p.x+Math.cos(p.rotation)*(b.offsetX||0),y=p.y+Math.sin(p.rotation)*(b.offsetY||0)
    const pose={...b,x,y,rotation,endX:x+Math.cos(rotation)*b.length,endY:y+Math.sin(rotation)*b.length};out.set(b.id,pose);return pose
  }
  bones.forEach(visit);return [...out.values()]
}
