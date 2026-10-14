export class AnimationTimeline{
  constructor(){this.fps=12;this.frames=[{duration:1,hold:1}];this.current=0;this.playing=false;this.loop=true;this.onion=false;this.listeners=new Set();this.timer=null}
  emit(){this.listeners.forEach(f=>f(this))}
  addFrame(copy=true){const src=this.frames[this.current]||{duration:1,hold:1};this.frames.splice(this.current+1,0,copy?{...src}:{duration:1,hold:1});this.current++;this.emit()}
  deleteFrame(){if(this.frames.length<2)return;this.frames.splice(this.current,1);this.current=Math.min(this.current,this.frames.length-1);this.emit()}
  setFPS(v){this.fps=Math.max(1,Math.min(60,+v||12));this.emit()}
  toggleOnion(){this.onion=!this.onion;this.emit()}
  select(i){this.current=Math.max(0,Math.min(this.frames.length-1,i));this.emit()}
  next(){if(this.current>=this.frames.length-1){if(!this.loop){this.stop();return false}this.current=0}else this.current++;this.emit();return true}
  previous(){this.current=this.current<=0?(this.loop?this.frames.length-1:0):this.current-1;this.emit()}
  start(){if(this.playing)return;this.playing=true;this.emit();this.timer=setInterval(()=>this.next(),1000/this.fps)}
  stop(){if(this.timer)clearInterval(this.timer);this.timer=null;this.playing=false;this.emit()}
  togglePlayback(){this.playing?this.stop():this.start()}
  subscribe(f){this.listeners.add(f);f(this);return()=>this.listeners.delete(f)}
  toJSON(){return{fps:this.fps,frames:this.frames,current:this.current,playing:false,loop:this.loop,onion:this.onion}}
  fromJSON(data={}){this.stop();this.fps=data.fps||12;this.frames=Array.isArray(data.frames)&&data.frames.length?data.frames:[{duration:1,hold:1}];this.current=Math.max(0,Math.min(this.frames.length-1,data.current||0));this.loop=data.loop!==false;this.onion=!!data.onion;this.emit()}
}
