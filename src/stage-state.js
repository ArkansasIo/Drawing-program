export class StageState{
  constructor(){this.mode="2.5D Stage";this.projection="Perspective";this.depth=0;this.parallax=1;this.light=.7;this.cards=[];this.camera={x:0,y:0,z:10,rotationX:0,rotationY:0}}
  addCard(data={}){const c={id:"stage-card-"+Date.now()+"-"+this.cards.length,name:"2D Card "+(this.cards.length+1),x:0,y:0,z:this.depth,scale:1,parallax:this.parallax,...data};this.cards.push(c);return c}
  removeCard(id){this.cards=this.cards.filter(x=>x.id!==id)}
  reset(){this.mode="2.5D Stage";this.projection="Perspective";this.depth=0;this.parallax=1;this.light=.7;this.cards=[];this.camera={x:0,y:0,z:10,rotationX:0,rotationY:0}}
  fromJSON(data={}){Object.assign(this,data);this.cards=Array.isArray(data.cards)?data.cards:[];this.camera=data.camera||this.camera}
  toJSON(){return{mode:this.mode,projection:this.projection,depth:this.depth,parallax:this.parallax,light:this.light,cards:this.cards,camera:this.camera}}
}
