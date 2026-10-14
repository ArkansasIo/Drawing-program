import {SelectionModel} from "./selection.js";
import {KeyframeTrack} from "./keyframes.js";
import {AudioProject} from "./audio.js";
import {readJSON,validateProjectShape,unwrapProject} from "./importer.js";
import {validateStudioState} from "./validation.js";
import {StageState} from "./stage-state.js";
import {CommandHistory} from "./undo.js";
import {downloadJSON,projectFilename} from "./serialization.js";
import {AnimationTimeline} from "./animation.js";
import {AssetManager} from "./assets.js";
import {Storyboard} from "./storyboard.js";
import {Rig} from "./rigging.js";
import {CameraTrack} from "./camera.js";
import {AnimeProject} from "./project.js";
import {TOOL_REGISTRY} from "./tools.js";
import {RenderQueue} from "./render.js";
import {buildGuide,makeCharacterParts,makeClothingSet} from "./generator.js";
import {makeLipSyncTrack} from "./lipsync.js";
import {AnimeStage3D} from "./stage3d.js";
import {decodeAudio} from "./waveform.js";

const runtime={project:new AnimeProject(),timeline:new AnimationTimeline(),assets:new AssetManager(),storyboard:new Storyboard(),rig:new Rig(),camera:new CameraTrack(),render:new RenderQueue(),tools:TOOL_REGISTRY,selection:new SelectionModel(),audio:new AudioProject(),stage:new StageState(),history:new CommandHistory(),tracks:{}};
window.animeStudio=runtime;

const $=s=>document.querySelector(s);
const out=(title,text)=>{const e=$("#genout");if(e)e.textContent=title+"\n\n"+text};
const setText=(id,text)=>{const e=$("#"+id);if(e)e.textContent=text};
const panel=id=>{document.querySelectorAll(".panel").forEach(x=>x.classList.remove("active"));$("#"+id)?.classList.add("active")};

function snapshot(){
  return {project:JSON.parse(runtime.project.serialize()),timeline:runtime.timeline.toJSON(),storyboard:runtime.storyboard.toJSON(),rig:runtime.rig.toJSON(),camera:runtime.camera.toJSON(),assets:runtime.assets.items,audio:runtime.audio.toJSON(),stage:runtime.stage.toJSON(),tracks:Object.fromEntries(Object.entries(runtime.tracks).map(([k,v])=>[k,v.toJSON()]))};
}
function restore(data){
  const p=unwrapProject(data);runtime.project.version=p.version||1;runtime.project.name=p.name||"Untitled Anime Project";runtime.project.scenes=Array.isArray(p.scenes)?p.scenes:[];runtime.project.settings=p.settings||runtime.project.settings;runtime.project.modifiedAt=p.modifiedAt||Date.now();
  runtime.timeline.fromJSON(data.timeline||{});runtime.storyboard.panels=data.storyboard?.panels||[];runtime.storyboard.current=Math.max(0,Math.min(runtime.storyboard.panels.length-1,data.storyboard?.current||0));
  runtime.rig.bones=data.rig?.bones||[];runtime.rig.controls=data.rig?.controls||[];runtime.rig.actions=data.rig?.actions||[];runtime.rig.name=data.rig?.name||"Character Rig";
  runtime.camera.fromJSON(data.camera||{});runtime.assets.fromJSON(data.assets||[]);runtime.audio.tracks=data.audio?.tracks||[];runtime.audio.master=data.audio?.master??1;runtime.stage.fromJSON(data.stage||{});
  runtime.tracks={};Object.entries(data.tracks||{}).forEach(([k,v])=>{const t=new KeyframeTrack(v.property||k);t.keys=v.keys||[];runtime.tracks[k]=t});
  renderTimeline();renderAssets();renderRig();renderStage();setText("masterVolume",Math.round(runtime.audio.master*100));setText("renderStatus","Project restored.");
  runtime.project.touch();
}

function renderTimeline(){
  const box=$("#timeline");if(box){box.innerHTML="";runtime.timeline.frames.forEach((_,i)=>{const b=document.createElement("button");b.textContent=String(i+1);b.className=i===runtime.timeline.current?"active":"";b.onclick=()=>runtime.timeline.select(i);box.appendChild(b)})}
  setText("frameStatus",`Frame ${runtime.timeline.current+1} / ${runtime.timeline.frames.length} • ${runtime.timeline.fps} FPS • Onion ${runtime.timeline.onion?"ON":"OFF"}`);
}
runtime.timeline.subscribe(renderTimeline);
$("#fps")?.addEventListener("input",e=>runtime.timeline.setFPS(e.target.value));
$("#addFrame")?.addEventListener("click",()=>runtime.timeline.addFrame(false));
$("#duplicateFrame")?.addEventListener("click",()=>runtime.timeline.addFrame(true));
$("#deleteFrame")?.addEventListener("click",()=>runtime.timeline.deleteFrame());
$("#onionSkin")?.addEventListener("click",()=>runtime.timeline.toggleOnion());
$("#playAnimation")?.addEventListener("click",()=>runtime.timeline.togglePlayback());
$("#prevFrame")?.addEventListener("click",()=>runtime.timeline.previous());
$("#nextFrame")?.addEventListener("click",()=>runtime.timeline.next());

$("#newScene")?.addEventListener("click",()=>{const s=runtime.project.addScene("Scene "+(runtime.project.scenes.length+1));out("NEW SCENE",JSON.stringify(s,null,2))});
$("#newShot")?.addEventListener("click",()=>{const s=runtime.project.scenes.at(-1)||runtime.project.addScene("Scene 1");out("NEW SHOT",JSON.stringify(runtime.project.addShot(s.id,{shotNumber:s.shots.length+1}),null,2))});
$("#addPanel")?.addEventListener("click",()=>out("STORYBOARD PANEL",JSON.stringify(runtime.storyboard.add(),null,2)));

function renderRig(){const box=$("#rigList");if(!box)return;box.innerHTML=[...runtime.rig.bones.map(x=>["Bone",x.name]),...runtime.rig.controls.map(x=>["IK",x.name]),...runtime.rig.actions.map(x=>["Action",x.name])].map(([a,b])=>`<div class="layer-row"><span>${a} • ${b}</span></div>`).join("")}
$("#addBone")?.addEventListener("click",()=>{runtime.rig.addBone({parent:runtime.rig.bones.at(-1)?.id||null});renderRig()});
$("#addIK")?.addEventListener("click",()=>{runtime.rig.addIK({chain:runtime.rig.bones.slice(-2).map(x=>x.id)});renderRig()});
$("#addRigAction")?.addEventListener("click",()=>{runtime.rig.addAction();renderRig()});

function applyCamera(){const c=runtime.camera;const canvas=$("#canvas");if(canvas)canvas.style.transform=`scale(${c.zoom}) rotate(${c.rotation}deg)`;const stage=window.animeStage3D;if(stage&&stage.activeCamera){stage.activeCamera.position.x=c.x;stage.activeCamera.position.y=c.y;stage.activeCamera.position.z=Math.max(3,10/c.zoom)}}
$("#cameraReset")?.addEventListener("click",()=>{runtime.camera.set(0,0,1,0);$("#cameraZoom").value=100;$("#cameraRotation").value=0;applyCamera()});
$("#cameraZoom")?.addEventListener("input",e=>{runtime.camera.zoom=+e.target.value/100;applyCamera()});
$("#cameraRotation")?.addEventListener("input",e=>{runtime.camera.rotation=+e.target.value;applyCamera()});
$("#cameraBookmark")?.addEventListener("click",()=>{runtime.camera.bookmark();renderCameraList()});
$("#cameraKeyframe")?.addEventListener("click",()=>{runtime.camera.keyframe(runtime.timeline.current);renderCameraList()});
function renderCameraList(){const e=$("#cameraList");if(e)e.textContent=[...runtime.camera.bookmarks.map((x,i)=>`Bookmark ${i+1} • ${Math.round(x.zoom*100)}% • ${x.rotation}°`),...runtime.camera.keyframes.map(x=>`Keyframe ${x.time}`)].join("\n")}

function renderAssets(){const box=$("#assetLibrary");if(!box)return;const q=$("#assetSearch")?.value||"";box.innerHTML="";runtime.assets.search(q).forEach(a=>{const b=document.createElement("button");b.textContent=a.name;b.title=`${a.category} • ${a.license}`;b.onclick=()=>out("ASSET",JSON.stringify(a,null,2));box.appendChild(b)})}
$("#assetSearch")?.addEventListener("input",renderAssets);$("#assetCategory")?.addEventListener("change",e=>{runtime.assets.filters.category=e.target.value;renderAssets()});
$("#assetImport")?.addEventListener("change",e=>{[...e.target.files].forEach(f=>{const a=runtime.assets.importFile(f,{category:$("#assetCategory")?.value||"Characters"});out("ASSET IMPORTED",JSON.stringify({name:a.name,size:a.size,type:a.mime},null,2))});renderAssets()});
function renderStage(){const s=runtime.stage;const mode=$("#stageMode"),proj=$("#projection");if(mode)mode.value=s.mode==="2.5D Stage"?"2.5D Stage":s.mode;if(proj)proj.value=s.projection;if($("#assetDepth"))$("#assetDepth").value=s.depth;if($("#parallax"))$("#parallax").value=Math.round(s.parallax*100);if($("#stageLight"))$("#stageLight").value=Math.round(s.light*100);const host=window.animeStage3D;if(host){host.setProjection(s.projection);host.setLighting(s.light);host.setDepth(s.depth)}const box=$("#stageCards");if(box)box.innerHTML=s.cards.map(x=>`<div class="layer-row"><span>${x.name} • Z ${x.z}</span></div>`).join("")}
["stageMode","projection","assetDepth","parallax","stageLight"].forEach(id=>$("#"+id)?.addEventListener("input",()=>{runtime.stage.mode=$("#stageMode")?.value||runtime.stage.mode;runtime.stage.projection=$("#projection")?.value||runtime.stage.projection;runtime.stage.depth=+($("#assetDepth")?.value||0);runtime.stage.parallax=(+($("#parallax")?.value||100))/100;runtime.stage.light=(+($("#stageLight")?.value||70))/100;renderStage()}));
$("#addStageCard")?.addEventListener("click",()=>{const c=runtime.stage.addCard();window.animeStage3D?.addCard({name:c.name,z:c.z,parallax:c.parallax});renderStage()});
$("#resetStage")?.addEventListener("click",()=>{runtime.stage.reset();window.animeStage3D?.clearCards();renderStage()});

$("#generate")?.addEventListener("click",()=>out("ANIME GUIDE",JSON.stringify(buildGuide($("#subject").value,$("#style").value),null,2)));
$("#generateCharacter")?.addEventListener("click",()=>out("CHARACTER PARTS",JSON.stringify(makeCharacterParts({style:$("#style").value}),null,2)));
$("#generateClothing")?.addEventListener("click",()=>out("CLOTHING SET",JSON.stringify(makeClothingSet("fantasy jacket",$("#style").value),null,2)));
$("#addVoiceTrack")?.addEventListener("click",()=>{const text=$("#voiceScript")?.value.trim();if(!text)return;const track=makeLipSyncTrack(text,1200);out("DIALOGUE + LIP SYNC",JSON.stringify({speaker:$("#voiceSpeaker")?.value||"Narrator",markers:track.markers},null,2))});

$("#selectionClear")?.addEventListener("click",()=>{runtime.selection.clear();setText("transformStatus","Selection cleared.")});
["selectionRect","selectionFree"].forEach(id=>$("#"+id)?.addEventListener("click",()=>{runtime.selection.type=id==="selectionRect"?"rectangle":"polygon";setText("transformStatus",`Selection mode: ${runtime.selection.type}`)}));

$("#renderExport")?.addEventListener("click",async()=>{const canvas=$("#canvas"),fmt=($("#renderFormat")?.value||"PNG").toLowerCase(),scale=+($("#renderScale")?.value||1);const mime=fmt==="jpeg"?"image/jpeg":fmt==="webp"?"image/webp":"image/png";const outCanvas=document.createElement("canvas");outCanvas.width=canvas.width*scale;outCanvas.height=canvas.height*scale;const c=outCanvas.getContext("2d");c.drawImage(canvas,0,0,outCanvas.width,outCanvas.height);const a=document.createElement("a");a.download=`anime-studio-frame-${runtime.timeline.current+1}.${mime==="image/jpeg"?"jpg":mime==="image/webp"?"webp":"png"}`;a.href=outCanvas.toDataURL(mime,.92);a.click();runtime.render.add({format:fmt,scale,frame:runtime.timeline.current,status:"complete"});setText("renderStatus",`Exported ${fmt} at ${scale}×.`)});

window.saveAnimeProject=()=>{const data=snapshot();localStorage.setItem("anime-studio-project",JSON.stringify(data));return data};
window.loadAnimeProject=()=>{const raw=localStorage.getItem("anime-studio-project");if(!raw)return null;const data=JSON.parse(raw);restore(data);return data};
window.validateAnimeStudio=()=>validateStudioState({project:runtime.project,timeline:runtime.timeline,assets:runtime.assets.items,rig:runtime.rig.toJSON()});
window.exportAnimeStudioProject=()=>{const data=snapshot();downloadJSON(projectFilename(runtime.project.name),data);return data};
window.addStudioKeyframe=(property,time,value,easing="linear")=>{const t=runtime.tracks[property]||(runtime.tracks[property]=new KeyframeTrack(property));return t.add(time,value,easing)};
window.getStudioKeyframe=(property,time)=>runtime.tracks[property]?.evaluate(time)??null;

$("#exportProject")?.addEventListener("click",()=>window.exportAnimeStudioProject());
$("#importProject")?.addEventListener("change",async e=>{const file=e.target.files?.[0];if(!file)return;try{const data=await readJSON(file);if(!validateProjectShape(data))throw new Error("Invalid Anime Studio project file");restore(data);window.animeStudioImportedProject=data;out("PROJECT IMPORTED",JSON.stringify({name:unwrapProject(data).name,scenes:unwrapProject(data).scenes.length,version:unwrapProject(data).version},null,2))}catch(err){out("PROJECT IMPORT ERROR",err.message)}});
$("#masterVolume")?.addEventListener("input",e=>runtime.audio.setMaster(+e.target.value/100));
$("#audioImport")?.addEventListener("change",async e=>{for(const file of e.target.files||[]){try{const meta=await decodeAudio(file);runtime.audio.addTrack(file.name).clips.push({source:file.name,duration:meta.duration,type:file.type})}catch{runtime.audio.addTrack(file.name)}}out("AUDIO IMPORTED",`${e.target.files?.length||0} file(s)`)});

const stageHost=$("#stage3dViewport");if(stageHost&&!window.animeStage3D){try{window.animeStage3D=new AnimeStage3D(stageHost);renderStage();applyCamera()}catch(e){console.warn("3D stage unavailable",e)}}
renderAssets();renderRig();renderCameraList();
try{if(localStorage.getItem("anime-studio-project"))window.loadAnimeProject()}catch(e){console.warn("Autosave restore failed",e)}
