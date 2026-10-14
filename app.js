const canvas=document.querySelector("#canvas"),ctx=canvas.getContext("2d");let drawing=false,last=null,tool="pencil",history=[],future=[],layers=[{name:"Line Art",visible:true,opacity:1}],activeLayer=0;
function resize(){const w=Math.min(innerWidth-390,1100),h=Math.min(innerHeight-100,750),d=devicePixelRatio||1;canvas.width=w*d;canvas.height=h*d;canvas.style.width=w+"px";canvas.style.height=h+"px";ctx.setTransform(d,0,0,d,0,0);ctx.fillStyle="#fff";ctx.fillRect(0,0,w,h)}addEventListener("resize",resize);resize();
function save(){history.push(canvas.toDataURL());if(history.length>30)history.shift();future=[]}
function restore(url){const im=new Image;im.onload=()=>{ctx.clearRect(0,0,canvas.width,canvas.height);ctx.drawImage(im,0,0,canvas.clientWidth,canvas.clientHeight)};im.src=url}
save();
function point(e){const r=canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}}
function stroke(a,b){const size=+document.querySelector("#size").value,op=+document.querySelector("#opacity").value/100;color=document.querySelector("#color").value;ctx.globalAlpha=op;ctx.lineCap="round";ctx.lineJoin="round";ctx.lineWidth=tool==="ink"?Math.max(1,size*.7):size;ctx.strokeStyle=tool==="eraser"?"#fff":color;if(tool==="airbrush"){ctx.globalAlpha=op*.15;ctx.shadowBlur=size*2;ctx.shadowColor=color}else{ctx.shadowBlur=0}ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();if(document.querySelector("#symmetry").checked){const x=canvas.clientWidth-b.x,y=canvas.clientWidth-a.x;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(canvas.clientWidth-a.x,b.y);ctx.stroke()}ctx.globalAlpha=1}
canvas.addEventListener("pointerdown",e=>{if(tool==="fill")return;save();drawing=true;last=point(e);canvas.setPointerCapture(e.pointerId)});
canvas.addEventListener("pointermove",e=>{if(!drawing)return;const p=point(e);stroke(last,p);last=p});
canvas.addEventListener("pointerup",()=>{drawing=false;last=null});
document.querySelectorAll(".tool").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tool").forEach(x=>x.classList.remove("active"));b.classList.add("active");tool=b.dataset.tool;status()});
function status(){document.querySelector("#status").textContent=tool+" • "+document.querySelector("#size").value+" px • "+document.querySelector("#opacity").value+"%"}
document.querySelector("#size").oninput=status;document.querySelector("#opacity").oninput=status;
document.querySelector("#undo").onclick=()=>{if(history.length>1){future.push(history.pop());restore(history.at(-1))}};
document.querySelector("#redo").onclick=()=>{if(future.length){const u=future.pop();history.push(u);restore(u)}};
document.querySelector("#clear").onclick=()=>{save();ctx.fillStyle="#fff";ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight)};
document.querySelector("#export").onclick=()=>{const a=document.createElement("a");a.download="anime-drawing.png";a.href=canvas.toDataURL("image/png");a.click()};
const colors=["#20202a","#5b3448","#a84f70","#e887a8","#f5c6d7","#fff","#ffd76a","#72a6d9","#72c9b0","#8f75d6"];const pal=document.querySelector("#palette");colors.forEach(c=>{const b=document.createElement("button");b.className="swatch";b.style.background=c;b.onclick=()=>document.querySelector("#color").value=c;pal.appendChild(b)});
function renderLayers(){const el=document.querySelector("#layers");el.innerHTML="";layers.forEach((l,i)=>{const b=document.createElement("div");b.className="layer"+(i===activeLayer?" active":"");b.textContent=(l.visible?"◉ ":"○ ")+l.name;b.onclick=()=>{activeLayer=i;renderLayers()};el.appendChild(b)})}document.querySelector("#addLayer").onclick=()=>{layers.unshift({name:"Layer "+(layers.length+1),visible:true,opacity:1});activeLayer=0;renderLayers()};renderLayers();
