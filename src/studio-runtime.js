import {SelectionModel} from "./selection.js";
import {KeyframeTrack} from "./keyframes.js";
import {AudioProject} from "./audio.js";
import {readJSON,validateProjectShape} from "./importer.js";
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
import {RenderQueue,RENDER_PRESETS} from "./render.js";
import {buildGuide,makeCharacterParts,makeClothingSet} from "./generator.js";
import {makeLipSyncTrack} from "./lipsync.js";
import {AnimeStage3D} from "./stage3d.js";

const runtime={project:new AnimeProject(),timeline:new AnimationTimeline(),assets:new AssetManager(),storyboard:new Storyboard(),rig:new Rig(),camera:new CameraTrack(),render:new RenderQueue(),tools:TOOL_REGISTRY,selection:new SelectionModel(),audio:new AudioProject(),stage:new StageState(),history:new CommandHistory()};
window.animeStudio=runtime;

function out(title,text){const e=document.querySelector("#genout");if(e)e.textContent=title+"\n\n"+text}
function panel(id){document.querySelectorAll(".panel").forEach(x=>x.classList.remove("active"));document.querySelector("#"+id)?.classList.add("active")}

runtime.timeline.subscribe(t=>{const s=document.querySelector("#frameStatus");if(s)s.textContent=`Frame ${t.current+1} / ${t.frames.length} • ${t.fps} FPS • Onion ${t.onion?"ON":"OFF"}`});
document.querySelector("#fps")?.addEventListener("input",e=>runtime.timeline.setFPS(e.target.value));
document.querySelector("#addFrame")?.addEventListener("click",()=>runtime.timeline.addFrame());
document.querySelector("#duplicateFrame")?.addEventListener("click",()=>runtime.timeline.addFrame(true));
document.querySelector("#deleteFrame")?.addEventListener("click",()=>runtime.timeline.deleteFrame());
document.querySelector("#onionSkin")?.addEventListener("click",()=>runtime.timeline.toggleOnion());

document.querySelector("#newScene")?.addEventListener("click",()=>{const s=runtime.project.addScene("Scene "+(runtime.project.scenes.length+1));out("NEW SCENE",s.id);});
document.querySelector("#newShot")?.addEventListener("click",()=>{const s=runtime.project.scenes.at(-1)||runtime.project.addScene("Scene 1");const sh=runtime.project.addShot(s.id,{shotNumber:s.shots.length+1});out("NEW SHOT",JSON.stringify(sh,null,2));});

document.querySelector("#addPanel")?.addEventListener("click",()=>{const p=runtime.storyboard.add();out("STORYBOARD PANEL",JSON.stringify(p,null,2));});
document.querySelector("#speech")?.addEventListener("click",()=>out("SPEECH BUBBLE","Dialogue element created for the current storyboard shot."));
document.querySelector("#speed")?.addEventListener("click",()=>out("SPEED LINES","Action-line FX element created for the current shot."));

function renderRig(){const box=document.querySelector("#rigList");if(!box)return;box.innerHTML=[...runtime.rig.bones.map(x=>["Bone",x.name]),...runtime.rig.controls.map(x=>["IK",x.name]),...runtime.rig.actions.map(x=>["Action",x.name])].map(x=>`<div class="layer-row"><span>${x[0]} • ${x[1]}</span></div>`).join("")}
document.querySelector("#addBone")?.addEventListener("click",()=>{runtime.rig.addBone();renderRig()});
document.querySelector("#addIK")?.addEventListener("click",()=>{runtime.rig.addIK();renderRig()});
document.querySelector("#addRigAction")?.addEventListener("click",()=>{runtime.rig.addAction();renderRig()});

document.querySelector("#cameraReset")?.addEventListener("click",()=>{runtime.camera.set(0,0,1,0);document.querySelector("#cameraZoom").value=100;document.querySelector("#cameraRotation").value=0});
document.querySelector("#cameraZoom")?.addEventListener("input",e=>runtime.camera.zoom=+e.target.value/100);
document.querySelector("#cameraRotation")?.addEventListener("input",e=>runtime.camera.rotation=+e.target.value);
document.querySelector("#cameraBookmark")?.addEventListener("click",()=>{runtime.camera.bookmark();const b=document.querySelector("#cameraList");if(b)b.textContent=runtime.camera.bookmarks.map((x,i)=>`Bookmark ${i+1} • ${Math.round(x.zoom*100)}% • ${x.rotation}°`).join("\n")});

function renderAssets(){const box=document.querySelector("#assetLibrary");if(!box)return;const q=document.querySelector("#assetSearch")?.value||"";box.innerHTML="";runtime.assets.search(q).forEach(a=>{const b=document.createElement("button");b.textContent=a.name;b.title=`${a.category} • ${a.license}`;b.onclick=()=>out("ASSET",JSON.stringify(a,null,2));box.appendChild(b)})}
["Anime Character Base","Face Construction Sheet","Eyes & Expressions","Hair Silhouette Pack","School Uniform","Fantasy Armor","Japanese House","City Background","Forest Background","Mecha Parts","Magic FX","Speed Lines","Impact FX","Pose Reference"].forEach((name,i)=>runtime.assets.add({name,category:["Characters","Poses","Expressions","Clothing","Clothing","Creatures","Backgrounds","Backgrounds","Backgrounds","Vehicles","FX","FX","FX","Poses"][i]||"Characters",tags:name.toLowerCase().split(" "),source:"built-in catalog",license:"Original placeholder"}));
document.querySelector("#assetSearch")?.addEventListener("input",renderAssets);document.querySelector("#assetCategory")?.addEventListener("change",e=>{runtime.assets.filters.category=e.target.value;renderAssets()});renderAssets();

document.querySelector("#renderExport")?.addEventListener("click",()=>{const job=runtime.render.add({preset:"custom",format:document.querySelector("#renderFormat").value,scale:+document.querySelector("#renderScale").value,frame:runtime.timeline.current});runtime.render.start(job.id);const c=document.querySelector("#canvas");const a=document.createElement("a");a.download="anime-studio-frame.png";a.href=c.toDataURL("image/png");a.click();runtime.render.complete(job.id);document.querySelector("#renderStatus").textContent="Render job "+job.id+" complete."});
document.querySelector("#renderSequence")?.addEventListener("click",()=>{const job=runtime.render.add({preset:"anime",frames:runtime.timeline.frames.length});document.querySelector("#renderStatus").textContent="Queued "+job.id+" • "+job.frames+" frames."});
document.querySelector("#export")?.addEventListener("click",()=>document.querySelector("#renderExport")?.click());

document.querySelector("#generate")?.addEventListener("click",()=>{const g=buildGuide(document.querySelector("#subject").value,document.querySelector("#style").value);out("ANIME GUIDE",JSON.stringify(g,null,2))});
document.querySelector("#generateCharacter")?.addEventListener("click",()=>out("CHARACTER PARTS",JSON.stringify(makeCharacterParts({style:document.querySelector("#style").value}),null,2)));
document.querySelector("#generateClothing")?.addEventListener("click",()=>out("CLOTHING SET",JSON.stringify(makeClothingSet("fantasy jacket",document.querySelector("#style").value),null,2)));

document.querySelector("#addVoiceTrack")?.addEventListener("click",()=>{const text=document.querySelector("#voiceScript")?.value.trim();if(!text)return;const track=makeLipSyncTrack(text,1200);out("DIALOGUE + LIP SYNC",JSON.stringify({speaker:document.querySelector("#voiceSpeaker")?.value||"Narrator",markers:track.markers},null,2))});

const stageHost=document.querySelector("#stage3dViewport");if(stageHost&&!window.animeStage3D){try{window.animeStage3D=new AnimeStage3D(stageHost)}catch(e){console.warn("3D stage unavailable",e)}}
window.saveAnimeProject=()=>{runtime.project.saveLocal();return runtime.project.serialize({timeline:runtime.timeline.toJSON(),storyboard:runtime.storyboard.toJSON(),rig:runtime.rig.toJSON(),camera:runtime.camera.toJSON(),assets:runtime.assets.items})};
window.getAnimeStudioToolRegistry=()=>runtime.tools;
window.validateAnimeStudio=()=>validateStudioState({project:runtime.project,timeline:runtime.timeline,assets:runtime.assets.items,rig:runtime.rig.toJSON()});
window.exportAnimeStudioProject=()=>{const data={project:JSON.parse(runtime.project.serialize()),timeline:runtime.timeline.toJSON(),storyboard:runtime.storyboard.toJSON(),rig:runtime.rig.toJSON(),camera:runtime.camera.toJSON(),assets:runtime.assets.items,audio:runtime.audio.toJSON(),stage:runtime.stage.toJSON()};downloadJSON(projectFilename(runtime.project.name),data);return data};
window.addStudioKeyframe=(property,time,value,easing="linear")=>{const t=runtime[property]||new KeyframeTrack(property);if(!runtime[property])runtime[property]=t;return t.add(time,value,easing)};
window.getStudioKeyframe=(property,time)=>runtime[property]?.evaluate(time)??null;

document.querySelector("#selectionClear")?.addEventListener("click",()=>{runtime.selection.clear();const s=document.querySelector("#transformStatus");if(s)s.textContent="Selection cleared."});
document.querySelector("#cameraKeyframe")?.addEventListener("click",()=>{runtime.camera.keyframe(runtime.timeline.current);const e=document.querySelector("#cameraList");if(e)e.textContent+="\nKeyframe "+runtime.timeline.current});
document.querySelector("#exportProject")?.addEventListener("click",()=>window.exportAnimeStudioProject());
document.querySelector("#importProject")?.addEventListener("change",async e=>{const file=e.target.files?.[0];if(!file)return;try{const data=await readJSON(file);if(!validateProjectShape(data))throw new Error("Invalid Anime Studio project file");window.animeStudioImportedProject=data;out("PROJECT IMPORTED",JSON.stringify({name:data.name,scenes:data.scenes.length,version:data.version},null,2))}catch(err){out("PROJECT IMPORT ERROR",err.message)}});
document.querySelector("#masterVolume")?.addEventListener("input",e=>runtime.audio.setMaster(+e.target.value/100));
