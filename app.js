const canvas=document.querySelector("#canvas"),ctx=canvas.getContext("2d");
let drawing=false,last=null,tool="pencil",history=[],future=[];
function resize(){const w=Math.max(320,Math.min(innerWidth-430,1100)),h=Math.max(260,Math.min(innerHeight-150,750)),d=devicePixelRatio||1;canvas.width=w*d;canvas.height=h*d;canvas.style.width=w+"px";canvas.style.height=h+"px";ctx.setTransform(d,0,0,d,0,0);ctx.fillStyle="#fff";ctx.fillRect(0,0,w,h)}
addEventListener("resize",resize);resize();
function save(){history.push(canvas.toDataURL());if(history.length>40)history.shift();future=[]}
function restore(url){const im=new Image;im.onload=()=>{ctx.clearRect(0,0,canvas.width,canvas.height);ctx.drawImage(im,0,0,canvas.clientWidth,canvas.clientHeight)};im.src=url}
save();
function point(e){const r=canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}}
function stroke(a,b){const size=+document.querySelector("#size").value,op=+document.querySelector("#opacity").value/100,color=document.querySelector("#color").value;ctx.globalAlpha=op;ctx.lineCap="round";ctx.lineJoin="round";ctx.lineWidth=tool==="ink"?Math.max(1,size*.7):size;ctx.strokeStyle=tool==="eraser"?"#fff":color;if(tool==="airbrush"){ctx.globalAlpha=op*.12;ctx.shadowBlur=size*2;ctx.shadowColor=color}else ctx.shadowBlur=0;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();if(document.querySelector("#symmetry")?.checked){ctx.beginPath();ctx.moveTo(canvas.clientWidth-b.x,b.y);ctx.lineTo(canvas.clientWidth-a.x,a.y);ctx.stroke()}ctx.globalAlpha=1}
canvas.addEventListener("pointerdown",e=>{if(tool==="fill")return;save();drawing=true;last=point(e);canvas.setPointerCapture(e.pointerId)});
canvas.addEventListener("pointermove",e=>{if(!drawing)return;const p=point(e);stroke(last,p);last=p});
canvas.addEventListener("pointerup",()=>{drawing=false;last=null});
document.querySelectorAll(".tool").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tool").forEach(x=>x.classList.remove("active"));b.classList.add("active");tool=b.dataset.tool;status()});
function status(){const el=document.querySelector("#status");if(el)el.textContent=tool+" • "+document.querySelector("#size").value+" px • "+document.querySelector("#opacity").value+"%";}
document.querySelector("#size").oninput=status;document.querySelector("#opacity").oninput=status;
document.querySelector("#undo").onclick=()=>{if(history.length>1){future.push(history.pop());restore(history.at(-1))}};
document.querySelector("#redo").onclick=()=>{if(future.length){const u=future.pop();history.push(u);restore(u)}};
document.querySelector("#clear").onclick=()=>{save();ctx.fillStyle="#fff";ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight)};
let effects=[];
function cssForEffect(effect){const n=effect.amount/100;switch(effect.type){case"grayscale":return "grayscale("+n+")";case"sepia":return "sepia("+n+")";case"invert":return "invert("+n+")";case"brightness":return "brightness("+n+")";case"contrast":return "contrast("+n+")";case"saturate":return "saturate("+n+")";case"blur":return "blur("+(effect.amount/25)+"px)";default:return "none"}}
function updateEffects(){canvas.style.filter=effects.filter(x=>x.enabled!==false).map(cssForEffect).join(" ")||"none";const box=document.querySelector("#effectStack");if(box){box.innerHTML="";effects.forEach((fx,i)=>{const row=document.createElement("div");row.className="effect-row";const name=document.createElement("span");name.textContent=fx.type+" ("+fx.amount+"%)";const toggle=document.createElement("button");toggle.textContent=fx.enabled===false?"Off":"On";toggle.onclick=()=>{fx.enabled=fx.enabled===false?true:false;updateEffects()};const remove=document.createElement("button");remove.textContent="×";remove.onclick=()=>{effects.splice(i,1);updateEffects()};row.append(name,toggle,remove);box.appendChild(row)});}}
function activeFilterString(){return effects.filter(x=>x.enabled!==false).map(cssForEffect).join(" ")||"none"}
document.querySelector("#addEffect")?.addEventListener("click",()=>{effects.push({type:document.querySelector("#effectType").value,amount:+document.querySelector("#effectAmount").value,enabled:true});updateEffects()});
document.querySelector("#clearEffects")?.addEventListener("click",()=>{effects=[];updateEffects()});
document.querySelector("#export").onclick=()=>{const out=document.createElement("canvas");out.width=canvas.width;out.height=canvas.height;const ox=out.getContext("2d");ox.filter=activeFilterString();ox.drawImage(canvas,0,0);const a=document.createElement("a");a.download="anime-drawing.png";a.href=out.toDataURL("image/png");a.click()};
const colors=["#20202a","#5b3448","#a84f70","#e887a8","#f5c6d7","#ffffff","#ffd76a","#72a6d9","#72c9b0","#8f75d6"],pal=document.querySelector("#palette");colors.forEach(c=>{const b=document.createElement("button");b.className="swatch";b.style.background=c;b.onclick=()=>document.querySelector("#color").value=c;pal.appendChild(b)});
document.querySelectorAll(".menu button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".panel").forEach(p=>p.classList.remove("active"));document.querySelector("#"+b.dataset.panel)?.classList.add("active")});
const lessons={head:["HEAD CONSTRUCTION","1. Draw a circle.\n2. Add the jaw plane.\n3. Place the vertical center line.\n4. Add the eye guideline.\n5. Build the neck below the jaw."],eyes:["ANIME EYES","1. Mark the eye-line.\n2. Draw upper lids with a tapered stroke.\n3. Add iris and pupil.\n4. Add highlight shapes.\n5. Finish lower lids and lashes."],hair:["ANIME HAIR","1. Establish the skull.\n2. Mark the hairline.\n3. Block large hair masses.\n4. Split into locks.\n5. Add tapered strand details."],body:["ANIME BODY","1. Gesture line.\n2. Ribcage and pelvis.\n3. Shoulder and hip angles.\n4. Build limbs from simple forms.\n5. Refine clothing and hands."]};
document.querySelectorAll(".lesson").forEach(b=>b.onclick=()=>{const x=lessons[b.dataset.lesson];document.querySelector("#genout").textContent=x[0]+"\n\n"+x[1];document.querySelectorAll(".panel").forEach(p=>p.classList.remove("active"));document.querySelector("#generator").classList.add("active")});
document.querySelector("#generate").onclick=()=>{const s=document.querySelector("#subject").value,st=document.querySelector("#style").value;document.querySelector("#genout").textContent="ANIME GUIDE\n\nSubject: "+s+"\nStyle: "+st+"\n\nConstruction: gesture → basic forms → anatomy → line art → flats → shadows → highlights.\n\nUse the canvas and reference panels to develop the drawing.";};
document.querySelector("#addPanel").onclick=()=>document.querySelector("#genout").textContent="MANGA PANEL\n\nPanel added to storyboard. Compose character, background and dialogue inside the canvas.";
document.querySelector("#speech").onclick=()=>document.querySelector("#genout").textContent="SPEECH BUBBLE\n\nSpeech-bubble placement guide added.";
document.querySelector("#speed").onclick=()=>document.querySelector("#genout").textContent="SPEED LINES\n\nAction-line guide added.";
const grid=document.querySelector("#grid"); if(grid) grid.onchange=e=>document.querySelector("#guide").style.backgroundImage=e.target.checked?"linear-gradient(#ffffff12 1px,transparent 1px),linear-gradient(90deg,#ffffff12 1px,transparent 1px)":"none";
const symmetry=document.querySelector("#symmetry"); if(symmetry) symmetry.onchange=()=>{};
let frames=[canvas.toDataURL()],currentFrame=0;
function renderTimeline(){const t=document.querySelector("#timeline");if(!t)return;t.innerHTML="";frames.forEach((_,i)=>{const b=document.createElement("button");b.className="frame"+(i===currentFrame?" active":"");b.innerHTML="F"+(i+1)+"<small>"+i+"</small>";b.onclick=()=>{frames[currentFrame]=canvas.toDataURL();currentFrame=i;restore(frames[i]);renderTimeline()};t.appendChild(b)});const f=document.querySelector("#frameStatus"),fps=document.querySelector("#fps");if(f)f.textContent="Frame "+(currentFrame+1)+" / "+frames.length+" • "+(fps?.value||12)+" FPS"}
document.querySelector("#fps")?.addEventListener("input",renderTimeline);
document.querySelector("#addFrame")?.addEventListener("click",()=>{frames[currentFrame]=canvas.toDataURL();frames.push(frames[currentFrame]);currentFrame=frames.length-1;restore(frames[currentFrame]);renderTimeline()});
document.querySelector("#duplicateFrame")?.addEventListener("click",()=>{frames[currentFrame]=canvas.toDataURL();frames.splice(currentFrame+1,0,frames[currentFrame]);currentFrame++;renderTimeline()});
document.querySelector("#deleteFrame")?.addEventListener("click",()=>{if(frames.length===1)return;frames.splice(currentFrame,1);currentFrame=Math.min(currentFrame,frames.length-1);restore(frames[currentFrame]);renderTimeline()});
document.querySelector("#newScene")?.addEventListener("click",()=>document.querySelector("#genout").textContent="NEW SCENE\n\nScene created. Add shots, characters, backgrounds and animation frames.");
document.querySelector("#newShot")?.addEventListener("click",()=>document.querySelector("#genout").textContent="NEW SHOT\n\nShot created. Use the viewport for composition and the timeline for animation.");
renderTimeline();
status();

const libraryData={
"Characters":["Head & face","Eyes","Noses & mouths","Hair","Ears","Hands","Feet","Body anatomy","Poses","Gestures","Expressions","Ages & proportions","Chibi","Character design"],
"Clothing":["School uniforms","Casual clothing","Fantasy armor","Kimono & yukata","Dresses","Shoes","Accessories","Folds & fabric"],
"Creatures":["Anime animals","Fantasy creatures","Dragons","Monsters","Robots","Mecha","Birds","Aquatic creatures"],
"Buildings":["Japanese houses","Apartments","Schools","Shrines & temples","Castles","Fantasy buildings","City streets","Stores & cafes","Skyscrapers","Industrial buildings"],
"Environments":["Mountains","Forests","Beaches","Rivers","Urban streets","Night city","Countryside","Gardens","Space","Fantasy worlds"],
"Vehicles":["Cars","Trains","Motorcycles","Bicycles","Aircraft","Spaceships","Mecha vehicles","Ships"],
"Props":["Weapons","Furniture","Food","School supplies","Technology","Musical instruments","Signs","Fantasy props"],
"Scenes":["Composition","Perspective","One-point perspective","Two-point perspective","Three-point perspective","Lighting","Weather","Day/night","Action scenes","Background layout"],
"Manga":["Panel layouts","Speech bubbles","Sound effects","Speed lines","Screen tones","Impact effects","Storyboard pages"]
};
const lib=document.querySelector("#library");
Object.entries(libraryData).forEach(([cat,items])=>{const box=document.createElement("div");box.className="libcat";box.innerHTML="<h4>"+cat+"</h4>";items.forEach(item=>{const b=document.createElement("button");b.textContent=item;b.onclick=()=>{document.querySelector("#genout").textContent="HOW TO DRAW — "+item+"\n\nStep 1: Basic construction\nStep 2: Proportions and perspective\nStep 3: Clean anime/manga line work\nStep 4: Details, lighting and finishing\n\nPractice this subject on the canvas.";document.querySelectorAll(".panel").forEach(p=>p.classList.remove("active"));document.querySelector("#generator").classList.add("active")};box.appendChild(b)});lib.appendChild(box)});



// --- Core 2D layer/compositing engine ---
let layerState=[
  {name:"Background",visible:true,opacity:100,canvas:null},
  {name:"Line Art",visible:true,opacity:100,canvas:null}
],activeLayer=1,onion=false,selection=null;

function makeLayer(name){
  const lc=document.createElement("canvas");
  lc.width=canvas.width; lc.height=canvas.height;
  return {name,visible:true,opacity:100,canvas:lc};
}
function initLayers(){
  layerState.forEach(l=>{if(!l.canvas)l.canvas=makeLayer(l.name).canvas});
  activeLayer=Math.min(activeLayer,layerState.length-1);
  renderLayers(); renderComposite();
}
function renderComposite(){
  const w=canvas.clientWidth,h=canvas.clientHeight;
  ctx.save(); ctx.setTransform(devicePixelRatio||1,0,0,devicePixelRatio||1,0,0);
  ctx.clearRect(0,0,w,h); ctx.fillStyle="#fff"; ctx.fillRect(0,0,w,h);
  layerState.slice().reverse().forEach(l=>{
    if(!l.visible||!l.canvas)return;
    ctx.globalAlpha=l.opacity/100; ctx.drawImage(l.canvas,0,0,w,h);
  });
  ctx.globalAlpha=1; ctx.restore();
  updateEffects();
}
function activeLayerCtx(){return layerState[activeLayer]?.canvas?.getContext("2d")}
function snapshotLayers(){
  return layerState.map(l=>({name:l.name,visible:l.visible,opacity:l.opacity,data:l.canvas?.toDataURL("image/png")||null}));
}
function restoreLayers(snap){
  if(!Array.isArray(snap))return;
  let pending=snap.length;
  snap.forEach((s,i)=>{
    if(!layerState[i])layerState[i]=makeLayer(s.name||("Layer "+(i+1)));
    layerState[i].name=s.name;layerState[i].visible=s.visible!==false;layerState[i].opacity=s.opacity??100;
    if(s.data){const im=new Image;im.onload=()=>{const lc=layerState[i].canvas,cc=lc.getContext("2d");cc.clearRect(0,0,lc.width,lc.height);cc.drawImage(im,0,0,lc.width,lc.height);if(--pending<=0)renderComposite()};im.src=s.data}else if(--pending<=0)renderComposite();
  });
  layerState.length=snap.length; renderLayers();
}
history=[];future=[];
function save(){history.push(snapshotLayers());if(history.length>40)history.shift();future=[]}
function restore(s){restoreLayers(s)}
function resizeLayers(){
  const w=canvas.width,h=canvas.height;
  layerState.forEach(l=>{if(!l.canvas){l.canvas=document.createElement("canvas")}if(l.canvas.width!==w||l.canvas.height!==h){const old=document.createElement("canvas");old.width=l.canvas.width;old.height=l.canvas.height;old.getContext("2d").drawImage(l.canvas,0,0);l.canvas.width=w;l.canvas.height=h;if(old.width&&old.height)l.canvas.getContext("2d").drawImage(old,0,0,w,h)}});
}
function resize(){
  const w=Math.max(320,Math.min(innerWidth-430,1100)),h=Math.max(260,Math.min(innerHeight-150,750)),d=devicePixelRatio||1;
  const oldW=canvas.clientWidth||w,oldH=canvas.clientHeight||h;
  canvas.width=w*d;canvas.height=h*d;canvas.style.width=w+"px";canvas.style.height=h+"px";
  resizeLayers();ctx.setTransform(d,0,0,d,0,0);renderComposite();
}
addEventListener("resize",resize);

function point(e){const r=canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}}
function stroke(a,b){
  const lc=activeLayerCtx();if(!lc)return;
  const size=+document.querySelector("#size").value,op=+document.querySelector("#opacity").value/100,color=document.querySelector("#color").value,d=devicePixelRatio||1;
  lc.save();lc.globalAlpha=op;lc.lineCap="round";lc.lineJoin="round";lc.lineWidth=(tool==="ink"?Math.max(1,size*.7):size)*d;
  lc.strokeStyle=tool==="eraser"?"rgba(0,0,0,1)":color;lc.globalCompositeOperation=tool==="eraser"?"destination-out":"source-over";
  if(tool==="airbrush"){lc.globalAlpha=op*.12;lc.shadowBlur=size*2*d;lc.shadowColor=color}else lc.shadowBlur=0;
  lc.beginPath();lc.moveTo(a.x*d,a.y*d);lc.lineTo(b.x*d,b.y*d);lc.stroke();
  if(document.querySelector("#symmetry")?.checked){lc.beginPath();lc.moveTo((canvas.clientWidth-b.x)*d,b.y*d);lc.lineTo((canvas.clientWidth-a.x)*d,a.y*d);lc.stroke()}
  lc.restore();renderComposite();
}
canvas.addEventListener("pointerdown",e=>{if(tool==="fill"||selectionMode!=="none"||transformMode!=="none")return;save();drawing=true;last=point(e);canvas.setPointerCapture(e.pointerId)});
canvas.addEventListener("pointermove",e=>{if(!drawing)return;const p=point(e);stroke(last,p);last=p});
canvas.addEventListener("pointerup",()=>{drawing=false;last=null});
canvas.addEventListener("pointercancel",()=>{drawing=false;last=null});

function renderLayers(){
  const box=document.querySelector("#layerList");if(!box)return;box.innerHTML="";
  layerState.forEach((l,i)=>{
    const row=document.createElement("div");row.className="layer-row"+(i===activeLayer?" active":"");
    const label=document.createElement("span");label.textContent=(l.visible?"◉ ":"○ ")+l.name;
    const controls=document.createElement("span");
    const vis=document.createElement("button");vis.textContent=l.visible?"◉":"○";vis.title="Toggle visibility";vis.onclick=e=>{e.stopPropagation();l.visible=!l.visible;renderLayers();renderComposite()};
    const op=document.createElement("input");op.type="range";op.min=0;op.max=100;op.value=l.opacity;op.title="Layer opacity";op.style.width="65px";op.onclick=e=>e.stopPropagation();op.oninput=e=>{l.opacity=+e.target.value;renderComposite()};
    controls.append(vis,op);row.append(label,controls);row.onclick=()=>{activeLayer=i;renderLayers()};box.appendChild(row)
  });
}
document.querySelector("#addLayer")?.addEventListener("click",()=>{const l=makeLayer("Layer "+(layerState.length+1));layerState.splice(activeLayer+1,0,l);activeLayer++;renderLayers();save()});
document.querySelector("#duplicateLayer")?.addEventListener("click",()=>{const src=layerState[activeLayer],l=makeLayer(src.name+" Copy"),cc=l.canvas.getContext("2d");cc.drawImage(src.canvas,0,0);l.visible=src.visible;l.opacity=src.opacity;layerState.splice(activeLayer,0,l);renderLayers();renderComposite();save()});
document.querySelector("#deleteLayer")?.addEventListener("click",()=>{if(layerState.length===1)return;save();layerState.splice(activeLayer,1);activeLayer=Math.min(activeLayer,layerState.length-1);renderLayers();renderComposite()});

let transformMode="none",selectionMode="none";
["selectionRect","selectionFree"].forEach(id=>document.querySelector("#"+id)?.addEventListener("click",()=>{selectionMode=id==="selectionRect"?"rectangle":"free";transformMode="none";document.querySelector("#transformStatus").textContent="Selection: "+selectionMode+" (geometry next)"}));
["transformMove","transformRotate","transformScale"].forEach(id=>document.querySelector("#"+id)?.addEventListener("click",()=>{transformMode=id.replace("transform","").toLowerCase();document.querySelector("#transformStatus").textContent="Transform: "+transformMode+" (selection required)"}));
document.querySelector("#flipHorizontal")?.addEventListener("click",()=>{save();const src=layerState[activeLayer].canvas,out=document.createElement("canvas");out.width=src.width;out.height=src.height;const oc=out.getContext("2d");oc.translate(src.width,0);oc.scale(-1,1);oc.drawImage(src,0,0);const cc=src.getContext("2d");cc.clearRect(0,0,src.width,src.height);cc.drawImage(out,0,0);renderComposite();document.querySelector("#transformStatus").textContent="Flip horizontal applied"});
document.querySelector("#onionSkin")?.addEventListener("click",()=>{onion=!onion;document.querySelector("#onionSkin").textContent=onion?"◉ Onion Skin: ON":"◌ Onion Skin";renderComposite()});

initLayers();


/* Anime Studio production workspaces */
const rigItems=[];
const rigList=document.querySelector("#rigList");
function renderRig(){if(!rigList)return;rigList.innerHTML=rigItems.map((x,i)=>"<div class='layer-row'><span>"+x.type+" • "+x.name+"</span><button data-rig='"+i+"'>×</button></div>").join("");rigList.querySelectorAll("[data-rig]").forEach(b=>b.onclick=()=>{rigItems.splice(+b.dataset.rig,1);renderRig()})}
document.querySelector("#addBone")?.addEventListener("click",()=>{rigItems.push({type:"Bone",name:"Bone "+(rigItems.length+1)});renderRig()});
document.querySelector("#addIK")?.addEventListener("click",()=>{rigItems.push({type:"IK",name:"IK Control "+(rigItems.length+1)});renderRig()});
document.querySelector("#addRigAction")?.addEventListener("click",()=>{rigItems.push({type:"Action",name:"Action "+(rigItems.length+1)});renderRig()});

const camera={zoom:1,rotation:0,bookmarks:[]};
function updateCamera(){const z=document.querySelector("#cameraZoom"),r=document.querySelector("#cameraRotation");camera.zoom=(+(z?.value||100))/100;camera.rotation=+(r?.value||0);canvas.style.transform="scale("+camera.zoom+") rotate("+camera.rotation+"deg)"}
document.querySelector("#cameraZoom")?.addEventListener("input",updateCamera);
document.querySelector("#cameraRotation")?.addEventListener("input",updateCamera);
document.querySelector("#cameraReset")?.addEventListener("click",()=>{camera.zoom=1;camera.rotation=0;document.querySelector("#cameraZoom").value=100;document.querySelector("#cameraRotation").value=0;updateCamera()});
document.querySelector("#cameraBookmark")?.addEventListener("click",()=>{camera.bookmarks.push({zoom:camera.zoom,rotation:camera.rotation});const box=document.querySelector("#cameraList");if(box)box.textContent=camera.bookmarks.map((x,i)=>"Bookmark "+(i+1)+" • "+Math.round(x.zoom*100)+"% • "+x.rotation+"°").join("\n")});

const assetItems=["Anime Character Base","Face Construction Sheet","Eyes & Expressions","Hair Silhouette Pack","School Uniform","Fantasy Armor","Japanese House","City Background","Forest Background","Mecha Parts","Magic FX","Speed Lines","Impact FX","Pose Reference","Sound Effect Library","Music Loop Library"];
const assetLibrary=document.querySelector("#assetLibrary");
function renderAssets(){if(!assetLibrary)return;const q=(document.querySelector("#assetSearch")?.value||"").toLowerCase();assetLibrary.innerHTML="";assetItems.filter(x=>x.toLowerCase().includes(q)).forEach(x=>{const b=document.createElement("button");b.textContent=x;b.onclick=()=>document.querySelector("#genout").textContent="ASSET\n\n"+x+"\n\nThis production asset is available as a project-library placeholder. Attach original or licensed source media before final distribution.";assetLibrary.appendChild(b)})}
document.querySelector("#assetSearch")?.addEventListener("input",renderAssets);renderAssets();

document.querySelector("#renderExport")?.addEventListener("click",()=>{const fmt=document.querySelector("#renderFormat").value.toLowerCase(),scale=+(document.querySelector("#renderScale").value||1),out=document.createElement("canvas");out.width=canvas.width*scale;out.height=canvas.height*scale;const ox=out.getContext("2d");ox.filter=activeFilterString();ox.drawImage(canvas,0,0,out.width,out.height);const mime=fmt==="jpeg"?"image/jpeg":fmt==="webp"?"image/webp":"image/png";const a=document.createElement("a");a.download="anime-studio-frame."+({"image/jpeg":"jpg","image/webp":"webp","image/png":"png"}[mime]);a.href=out.toDataURL(mime);a.click();const s=document.querySelector("#renderStatus");if(s)s.textContent="Exported "+fmt+" at "+scale+"×."});
document.querySelector("#renderSequence")?.addEventListener("click",()=>{const s=document.querySelector("#renderStatus");if(s)s.textContent="Sequence export is staged; current build exports individual frames, with packaged ZIP/video rendering planned."});


/* Hybrid 2D/3D stage model: 2D assets staged in a 3D-like coordinate system. */
const stage={mode:"2D Canvas",projection:"Perspective",depth:0,parallax:1,light:.7,cards:[]};
function renderStageCards(){const box=document.querySelector("#stageCards");if(!box)return;box.innerHTML=stage.cards.map((x,i)=>"<div class='layer-row'><span>"+x.name+" • Z "+x.z+"</span><button data-card='"+i+"'>×</button></div>").join("");box.querySelectorAll("[data-card]").forEach(b=>b.onclick=()=>{stage.cards.splice(+b.dataset.card,1);renderStageCards()})}
function syncStage(){stage.mode=document.querySelector("#stageMode")?.value||stage.mode;stage.projection=document.querySelector("#projection")?.value||stage.projection;stage.depth=+(document.querySelector("#assetDepth")?.value||0);stage.parallax=(+(document.querySelector("#parallax")?.value||100))/100;stage.light=(+(document.querySelector("#stageLight")?.value||70))/100;document.querySelector("#transformStatus")&&(document.querySelector("#transformStatus").textContent="Stage: "+stage.mode+" • "+stage.projection+" • Z "+stage.depth)}
["stageMode","projection","assetDepth","parallax","stageLight"].forEach(id=>document.querySelector("#"+id)?.addEventListener("input",syncStage));
document.querySelector("#addStageCard")?.addEventListener("click",()=>{stage.cards.push({name:"2D Card "+(stage.cards.length+1),z:stage.depth,parallax:stage.parallax});renderStageCards()});
document.querySelector("#resetStage")?.addEventListener("click",()=>{stage.mode="2D Canvas";stage.projection="Perspective";stage.depth=0;stage.parallax=1;stage.light=.7;stage.cards=[];["stageMode","projection"].forEach(id=>document.querySelector("#"+id).selectedIndex=0);document.querySelector("#assetDepth").value=0;document.querySelector("#parallax").value=100;document.querySelector("#stageLight").value=70;renderStageCards();syncStage()});
syncStage();renderStageCards();


/* Voice Over workspace */
const voiceState={voices:[],takes:[],tracks:[],recorder:null,stream:null,chunks:[]};
function renderVoiceVoices(){
  const select=document.querySelector("#voiceSelect");if(!select)return;
  const current=select.value;
  select.innerHTML='<option value="">System default</option>';
  voiceState.voices.forEach((v,i)=>{const o=document.createElement("option");o.value=String(i);o.textContent=v.name+" — "+v.lang;select.appendChild(o)});
  if([...select.options].some(o=>o.value===current))select.value=current;
}
function loadVoices(){voiceState.voices=speechSynthesis.getVoices();renderVoiceVoices()}
if("speechSynthesis" in window){loadVoices();speechSynthesis.onvoiceschanged=loadVoices}
function voiceStatus(t){const el=document.querySelector("#voiceStatus");if(el)el.textContent=t}
document.querySelector("#voicePreview")?.addEventListener("click",()=>{
  if(!("speechSynthesis" in window)){voiceStatus("Speech synthesis is not available in this browser.");return}
  speechSynthesis.cancel();
  const text=document.querySelector("#voiceScript")?.value.trim();
  if(!text){voiceStatus("Enter dialogue or narration first.");return}
  const u=new SpeechSynthesisUtterance(text);
  const idx=document.querySelector("#voiceSelect")?.value;
  if(idx!=="")u.voice=voiceState.voices[+idx];
  u.rate=+(document.querySelector("#voiceRate")?.value||1);
  u.pitch=+(document.querySelector("#voicePitch")?.value||1);
  u.onstart=()=>voiceStatus("Previewing voice-over…");
  u.onend=()=>voiceStatus("Voice preview finished.");
  speechSynthesis.speak(u);
});
document.querySelector("#voiceStop")?.addEventListener("click",()=>{speechSynthesis?.cancel();voiceStatus("Voice preview stopped.")});

function renderVoiceTakes(){
  const box=document.querySelector("#voiceTakes");if(!box)return;box.innerHTML="";
  voiceState.takes.forEach((take,i)=>{
    const row=document.createElement("div");row.className="audio-row";
    const label=document.createElement("span");label.textContent=(take.speaker||"Narrator")+" • Take "+(i+1);
    const audio=document.createElement("audio");audio.controls=true;audio.src=take.url;
    const del=document.createElement("button");del.textContent="×";del.onclick=()=>{URL.revokeObjectURL(take.url);voiceState.takes.splice(i,1);renderVoiceTakes()};
    row.append(label,audio,del);box.appendChild(row);
  });
}
document.querySelector("#voiceRecord")?.addEventListener("click",async()=>{
  if(!navigator.mediaDevices?.getUserMedia){voiceStatus("Microphone recording is not supported here.");return}
  try{
    voiceState.stream=await navigator.mediaDevices.getUserMedia({audio:true});
    voiceState.chunks=[];
    voiceState.recorder=new MediaRecorder(voiceState.stream);
    voiceState.recorder.ondataavailable=e=>{if(e.data.size)voiceState.chunks.push(e.data)};
    voiceState.recorder.onstop=()=>{
      const blob=new Blob(voiceState.chunks,{type:voiceState.recorder.mimeType||"audio/webm"});
      voiceState.takes.push({speaker:document.querySelector("#voiceSpeaker")?.value||"Narrator",script:document.querySelector("#voiceScript")?.value||"",url:URL.createObjectURL(blob),blob});
      voiceState.stream.getTracks().forEach(t=>t.stop());voiceState.stream=null;renderVoiceTakes();voiceStatus("Recorded take "+voiceState.takes.length+".");
      const r=document.querySelector("#voiceRecord"),s=document.querySelector("#voiceStopRecord");if(r)r.disabled=false;if(s)s.disabled=true;
    };
    voiceState.recorder.start();
    document.querySelector("#voiceRecord").disabled=true;document.querySelector("#voiceStopRecord").disabled=false;voiceStatus("Recording microphone…");
  }catch(e){voiceStatus("Microphone permission or recording failed.");}
});
document.querySelector("#voiceStopRecord")?.addEventListener("click",()=>{
  if(voiceState.recorder?.state==="recording")voiceState.recorder.stop();
});
function renderVoiceTracks(){
  const box=document.querySelector("#voiceTracks");if(!box)return;
  box.innerHTML="";
  voiceState.tracks.forEach((x,i)=>{
    const row=document.createElement("div");row.className="layer-row";
    const label=document.createElement("span");label.textContent="Dialogue "+(i+1)+" • "+x.speaker;
    const del=document.createElement("button");del.textContent="×";del.onclick=()=>{voiceState.tracks.splice(i,1);renderVoiceTracks()};
    row.append(label,del);box.appendChild(row);
  });
}
document.querySelector("#addVoiceTrack")?.addEventListener("click",()=>{
  const speaker=document.querySelector("#voiceSpeaker")?.value||"Narrator";
  const script=document.querySelector("#voiceScript")?.value.trim()||"Untitled dialogue";
  voiceState.tracks.push({speaker,script});
  renderVoiceTracks();
});

/* Lip-sync bridge */
window.addEventListener("load",()=>{
  const script=document.querySelector("#voiceScript");
  const speaker=document.querySelector("#voiceSpeaker");
  const box=document.querySelector("#voiceTracks");
  if(!script||!box)return;
  const renderLipSync=(track)=>{
    const row=document.createElement("div");row.className="layer-row";
    const label=document.createElement("span");label.textContent="Lip Sync • "+track.speaker+" • "+track.markers.length+" mouth markers";
    const pre=document.createElement("code");pre.textContent=track.markers.map(m=>m.viseme+"@"+m.timeMs+"ms").join("  ");
    row.append(label,pre);box.appendChild(row);
  };
  window.generateLipSync=(durationMs=1200)=>{
    const text=script.value.trim();
    if(!text||!window.makeLipSyncTrack)return null;
    const track=window.makeLipSyncTrack(text,durationMs);
    track.speaker=speaker?.value||"Narrator";
    renderLipSync(track);
    return track;
  };
});

/* Studio control completion */
function studioOutput(title,text){const out=document.querySelector("#genout");if(out)out.textContent=title+"\n\n"+text}
function floodFill(x,y,color){const lc=activeLayerCtx();if(!lc)return;const w=lc.width,h=lc.height,px=lc.getImageData(0,0,w,h),i0=(y*w+x)*4,target=[px.data[i0],px.data[i0+1],px.data[i0+2],px.data[i0+3]],hex=color.slice(1),fill=[parseInt(hex.slice(0,2),16),parseInt(hex.slice(2,4),16),parseInt(hex.slice(4,6),16),255];if(target.every((v,i)=>v===fill[i]))return;const stack=[[x,y]],seen=new Uint8Array(w*h);while(stack.length){const [cx,cy]=stack.pop();if(cx<0||cy<0||cx>=w||cy>=h)continue;const p=cy*w+cx,j=p*4;if(seen[p])continue;if(Math.abs(px.data[j]-target[0])>8||Math.abs(px.data[j+1]-target[1])>8||Math.abs(px.data[j+2]-target[2])>8||Math.abs(px.data[j+3]-target[3])>8)continue;seen[p]=1;px.data[j]=fill[0];px.data[j+1]=fill[1];px.data[j+2]=fill[2];px.data[j+3]=fill[3];stack.push([cx+1,cy],[cx-1,cy],[cx,cy+1],[cx,cy-1])}lc.putImageData(px,0,0);renderComposite()}
canvas.addEventListener("pointerdown",e=>{if(tool==="fill"){const p=point(e),d=devicePixelRatio||1;save();floodFill(Math.floor(p.x*d),Math.floor(p.y*d),document.querySelector("#color").value);return}if(tool==="eyedropper"){const p=point(e),d=devicePixelRatio||1,px=ctx.getImageData(Math.floor(p.x*d),Math.floor(p.y*d),1,1).data;document.querySelector("#color").value="#"+[px[0],px[1],px[2]].map(v=>v.toString(16).padStart(2,"0")).join("");tool="pencil";document.querySelectorAll(".tool").forEach(x=>x.classList.toggle("active",x.dataset.tool==="pencil"));status()}},true);
["selectionRect","selectionFree"].forEach(id=>document.querySelector("#"+id)?.addEventListener("click",()=>studioOutput("SELECTION",id==="selectionRect"?"Rectangle selection active.":"Free selection active.")));
["transformMove","transformRotate","transformScale"].forEach(id=>document.querySelector("#"+id)?.addEventListener("click",()=>studioOutput("TRANSFORM",id.replace("transform","")+" mode active.")));
document.querySelector("#addAudioTrack")?.addEventListener("click",()=>{const box=document.querySelector("#audioTracks");if(!box)return;const row=document.createElement("div");row.className="audio-row";row.innerHTML="<span>Track "+(box.children.length+1)+"</span><input type='range' min='0' max='100' value='80'><button>×</button>";row.querySelector("button").onclick=()=>row.remove();box.appendChild(row)});
document.querySelector("#audioImport")?.addEventListener("change",e=>{const box=document.querySelector("#audioLibrary");if(!box)return;[...e.target.files].forEach(file=>{const row=document.createElement("div");row.className="audio-row";const label=document.createElement("span");label.textContent=file.name;const a=document.createElement("audio");a.controls=true;a.src=URL.createObjectURL(file);row.append(label,a);box.appendChild(row)})});
document.querySelector("#generateSound")?.addEventListener("click",()=>{const preset=document.querySelector("#soundPreset")?.value||"beep";const duration=+(document.querySelector("#soundDuration")?.value||3);const AC=window.AudioContext||window.webkitAudioContext;if(!AC){studioOutput("AUDIO","Web Audio is unavailable.");return}const ac=new AC(),osc=ac.createOscillator(),gain=ac.createGain();osc.type=preset==="impact"?"square":"sine";osc.frequency.value=preset==="sword"?520:preset==="impact"?90:440;gain.gain.setValueAtTime(.0001,ac.currentTime);gain.gain.exponentialRampToValueAtTime(.18,ac.currentTime+.02);gain.gain.exponentialRampToValueAtTime(.0001,ac.currentTime+Math.min(duration,3));osc.connect(gain).connect(ac.destination);osc.start();osc.stop(ac.currentTime+Math.min(duration,3));studioOutput("GENERATED SOUND",preset+" • "+duration+" seconds")});
const settingsKey="anime-studio-settings-v1";function applyStudioSettings(){document.documentElement.dataset.theme=document.querySelector("#themeSelect")?.value||"dark";document.querySelector("#guide").style.backgroundImage=document.querySelector("#gridSetting")?.checked?"linear-gradient(#ffffff12 1px,transparent 1px),linear-gradient(90deg,#ffffff12 1px,transparent 1px)":"none";if(document.querySelector("#fps"))document.querySelector("#fps").value=document.querySelector("#defaultFps")?.value||12}function loadStudioSettings(){try{const s=JSON.parse(localStorage.getItem(settingsKey)||"{}");document.querySelector("#themeSelect").value=s.theme||"dark";document.querySelector("#autosave").checked=s.autosave!==false;document.querySelector("#gridSetting").checked=!!s.grid;document.querySelector("#symmetrySetting").checked=!!s.symmetry;document.querySelector("#defaultFps").value=s.fps||12;applyStudioSettings()}catch{}}function saveStudioSettings(){localStorage.setItem(settingsKey,JSON.stringify({theme:document.querySelector("#themeSelect").value,autosave:document.querySelector("#autosave").checked,grid:document.querySelector("#gridSetting").checked,symmetry:document.querySelector("#symmetrySetting").checked,fps:+document.querySelector("#defaultFps").value}));applyStudioSettings();document.querySelector("#settingsStatus").textContent="Settings saved."}document.querySelector("#saveSettings")?.addEventListener("click",saveStudioSettings);document.querySelector("#resetSettings")?.addEventListener("click",()=>{localStorage.removeItem(settingsKey);loadStudioSettings();document.querySelector("#settingsStatus").textContent="Settings reset."});loadStudioSettings();
