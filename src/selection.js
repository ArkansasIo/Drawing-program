export class SelectionModel{
  constructor(){this.type="none";this.rect=null;this.points=[];this.active=false}
  rectangle(x,y,w,h){this.type="rectangle";this.rect={x:Math.min(x,x+w),y:Math.min(y,y+h),w:Math.abs(w),h:Math.abs(h)};this.points=[];this.active=true;return this.rect}
  polygon(points){this.type="polygon";this.points=[...points];this.rect=null;this.active=points.length>2;return this.points}
  clear(){this.type="none";this.rect=null;this.points=[];this.active=false}
  contains(x,y){
    if(this.type==="rectangle"&&this.rect){const r=this.rect;return x>=r.x&&y>=r.y&&x<=r.x+r.w&&y<=r.y+r.h}
    if(this.type!=="polygon"||this.points.length<3)return false
    let inside=false
    for(let i=0,j=this.points.length-1;i<this.points.length;j=i++){
      const a=this.points[i],b=this.points[j]
      if((a.y>y)!=(b.y>y)&&x<(b.x-a.x)*(y-a.y)/(b.y-a.y)+a.x)inside=!inside
    }
    return inside
  }
  bounds(){
    if(this.type==="rectangle")return {...this.rect}
    if(this.type!=="polygon"||!this.points.length)return null
    const xs=this.points.map(p=>p.x),ys=this.points.map(p=>p.y)
    const x=Math.min(...xs),y=Math.min(...ys)
    return{x,y,w:Math.max(...xs)-x,h:Math.max(...ys)-y}
  }
  toJSON(){return{type:this.type,rect:this.rect,points:this.points,active:this.active}}
}
