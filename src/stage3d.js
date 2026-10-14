import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

export class AnimeStage3D{
  constructor(container){
    this.container=container;
    this.scene=new THREE.Scene();
    this.scene.background=new THREE.Color("#0d1018");
    this.scene.fog=new THREE.Fog("#0d1018",8,35);
    this.camera=new THREE.PerspectiveCamera(42,1,.1,100);
    this.camera.position.set(0,0,10);
    this.orthoCamera=new THREE.OrthographicCamera(-6,6,4.5,-4.5,.1,100);
    this.orthoCamera.position.set(0,0,10);
    this.cameraMode="Perspective";
    this.activeCamera=this.camera;
    this.renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
    this.renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));
    this.renderer.outputColorSpace=THREE.SRGBColorSpace;
    this.renderer.toneMapping=THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure=1.05;
    this.renderer.domElement.className="stage3d-canvas";
    container.appendChild(this.renderer.domElement);
    this.root=new THREE.Group();
    this.scene.add(this.root);
    this.ambient=new THREE.HemisphereLight("#a9bfff","#17121d",1.25);
    this.key=new THREE.DirectionalLight("#ffd7c4",2.0);
    this.key.position.set(-4,6,8);
    this.rim=new THREE.DirectionalLight("#6fa7ff",1.8);
    this.rim.position.set(5,2,-4);
    this.scene.add(this.ambient,this.key,this.rim);
    this.clock=new THREE.Clock();
    this.pointer={x:0,y:0,down:false,lastX:0,lastY:0};
    this.cards=[];
    this.bind();
    this.resize();
    this.animate();
  }
  bind(){
    addEventListener("resize",()=>this.resize());
    this.renderer.domElement.addEventListener("pointerdown",e=>{this.pointer.down=true;this.pointer.lastX=e.clientX;this.pointer.lastY=e.clientY;this.renderer.domElement.setPointerCapture(e.pointerId)});
    this.renderer.domElement.addEventListener("pointerup",()=>this.pointer.down=false);
    this.renderer.domElement.addEventListener("pointermove",e=>{
      if(!this.pointer.down)return;
      const dx=(e.clientX-this.pointer.lastX)*.012,dy=(e.clientY-this.pointer.lastY)*.012;
      this.root.rotation.y+=dx;this.root.rotation.x=Math.max(-.6,Math.min(.6,this.root.rotation.x+dy));
      this.pointer.lastX=e.clientX;this.pointer.lastY=e.clientY;
    });
    this.renderer.domElement.addEventListener("wheel",e=>{
      e.preventDefault();
      this.activeCamera.position.z=Math.max(3,Math.min(24,this.activeCamera.position.z+e.deltaY*.01));
    },{passive:false});
  }
  resize(){
    const w=Math.max(1,this.container.clientWidth),h=Math.max(1,this.container.clientHeight);
    this.renderer.setSize(w,h,false);
    this.camera.aspect=w/h;this.camera.updateProjectionMatrix();
    const s=5*Math.max(1,w/h*.55);
    this.orthoCamera.left=-s;this.orthoCamera.right=s;this.orthoCamera.top=s*h/w;this.orthoCamera.bottom=-s*h/w;this.orthoCamera.updateProjectionMatrix();
  }
  setProjection(mode){
    this.cameraMode=mode;
    this.activeCamera=mode==="Orthographic"?this.orthoCamera:this.camera;
  }
  setLighting(amount){
    const a=Number(amount);
    this.ambient.intensity=.45+a*1.1;
    this.key.intensity=.6+a*1.8;
    this.rim.intensity=.4+a*1.7;
  }
  addCard({name="2D Asset",textureUrl=null,z=0,parallax=1,color="#d66b91"}={}){
    const group=new THREE.Group();
    const geometry=new THREE.PlaneGeometry(4.8,3.2);
    let material;
    if(textureUrl){
      const texture=new THREE.TextureLoader().load(textureUrl);
      texture.colorSpace=THREE.SRGBColorSpace;
      material=new THREE.MeshStandardMaterial({map:texture,transparent:true,side:THREE.DoubleSide,roughness:.85,metalness:0});
    }else{
      material=new THREE.MeshStandardMaterial({color,transparent:true,opacity:.92,side:THREE.DoubleSide,roughness:.9,metalness:0});
    }
    const mesh=new THREE.Mesh(geometry,material);
    group.add(mesh);
    group.position.z=z/20;
    group.userData={name,parallax,baseY:group.position.y};
    this.root.add(group);
    this.cards.push(group);
    return group;
  }
  clearCards(){
    this.cards.forEach(g=>this.root.remove(g));
    this.cards=[];
  }
  setDepth(depth){
    this.cards.forEach(g=>g.position.z=(Number(depth)||0)/20);
  }
  render(){
    this.renderer.render(this.scene,this.activeCamera);
  }
  animate=()=>{
    requestAnimationFrame(this.animate);
    const t=this.clock.getElapsedTime();
    this.cards.forEach((g,i)=>{
      const p=g.userData.parallax||1;
      g.position.y=g.userData.baseY+Math.sin(t*.35+i)*.0005*p;
    });
    this.render();
  }
}
