import {interpolate} from "./keyframes.js"
export class CameraTrack{
  constructor(){this.zoom=1;this.rotation=0;this.x=0;this.y=0;this.bookmarks=[];this.keyframes=[]}
  set(x,y,zoom,rotation){this.x=+x||0;this.y=+y||0;this.zoom=+zoom||1;this.rotation=+rotation||0}
  bookmark(name="Camera Bookmark"){this.bookmarks.push({name,x:this.x,y:this.y,zoom:this.zoom,rotation:this.rotation});return this.bookmarks.at(-1)}
  keyframe(time){const k={time:+time||0,x:this.x,y:this.y,zoom:this.zoom,rotation:this.rotation};this.keyframes.push(k);this.keyframes.sort((a,b)=>a.time-b.time);return k}
  evaluate(time){if(!this.keyframes.length)return{x:this.x,y:this.y,zoom:this.zoom,rotation:this.rotation};if(time<=this.keyframes[0].time)return{...this.keyframes[0]};if(time>=this.keyframes.at(-1).time)return{...this.keyframes.at(-1)};for(let i=1;i<this.keyframes.length;i++){const a=this.keyframes[i-1],b=this.keyframes[i];if(time<=b.time){const t=(time-a.time)/(b.time-a.time);return{time,x:interpolate(a.x,b.x,t),y:interpolate(a.y,b.y,t),zoom:interpolate(a.zoom,b.zoom,t),rotation:interpolate(a.rotation,b.rotation,t)}}}}
  toJSON(){return{zoom:this.zoom,rotation:this.rotation,x:this.x,y:this.y,bookmarks:this.bookmarks,keyframes:this.keyframes}}
  fromJSON(data={}){this.zoom=data.zoom??1;this.rotation=data.rotation??0;this.x=data.x??0;this.y=data.y??0;this.bookmarks=data.bookmarks||[];this.keyframes=data.keyframes||[]}
}
