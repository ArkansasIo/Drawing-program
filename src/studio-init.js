import {buildGuide,makeCharacterParts,makeClothingSet} from "./generator.js";
import {AnimeStage3D} from "./stage3d.js";

const canvas=document.querySelector("#stage3dViewport");
if(canvas){
  const stage3d=new AnimeStage3D(canvas);
  window.animeStage3D=stage3d;
  const mode=document.querySelector("#stageMode");
  const projection=document.querySelector("#projection");
  const depth=document.querySelector("#assetDepth");
  const parallax=document.querySelector("#parallax");
  const light=document.querySelector("#stageLight");
  const sync=()=>{
    stage3d.setProjection(projection?.value||"Perspective");
    stage3d.setLighting((+(light?.value||70))/100);
    stage3d.setDepth(+(depth?.value||0));
    stage3d.container.classList.toggle("stage-hidden",(mode?.value||"2D Canvas")==="2D Canvas");
  };
  [mode,projection,depth,parallax,light].filter(Boolean).forEach(x=>x.addEventListener("input",sync));
  document.querySelector("#addStageCard")?.addEventListener("click",()=>{
    const colors=["#9b5d82","#456d93","#b86a58","#6e609d","#4c8b78"];
    stage3d.addCard({name:"Generated 2D Asset",z:+(depth?.value||0),parallax:(+(parallax?.value||100))/100,color:colors[stage3d.cards.length%colors.length]});
  });
  document.querySelector("#resetStage")?.addEventListener("click",()=>{stage3d.clearCards();stage3d.root.rotation.set(0,0,0);stage3d.camera.position.z=10;stage3d.orthoCamera.position.z=10;sync()});
  sync();
}

const gen=document.querySelector("#generate");
if(gen)gen.addEventListener("click",()=>{
  const subject=document.querySelector("#subject")?.value||"Character";
  const style=document.querySelector("#style")?.value||"Modern Anime";
  const guide=buildGuide(subject,style);
  const output=document.querySelector("#genout");
  if(output)output.textContent=[
    "ANIME STUDIO GENERATOR",
    "",
    "Subject: "+guide.subject,
    "Style: "+guide.style,
    "Editable parts: YES",
    "",
    "Workflow:",
    guide.steps.map((x,i)=>(i+1)+". "+x).join("\n"),
    "",
    "Palette: "+Object.entries(guide.palette).map(([k,v])=>k+"="+v).join(" • ")
  ].join("\n");
});

window.generateCharacterParts=(options={})=>makeCharacterParts(options);
window.generateClothing=(type,style)=>makeClothingSet(type,style);
document.querySelector("#generateCharacter")?.addEventListener("click",()=>{
  const style=document.querySelector("#style")?.value||"Modern Anime";
  const asset=makeCharacterParts({style});
  const out=document.querySelector("#genout");
  if(out)out.textContent=JSON.stringify(asset,null,2);
});
document.querySelector("#generateClothing")?.addEventListener("click",()=>{
  const style=document.querySelector("#style")?.value||"Modern Anime";
  const asset=makeClothingSet("fantasy jacket",style);
  const out=document.querySelector("#genout");
  if(out)out.textContent=JSON.stringify(asset,null,2);
});
