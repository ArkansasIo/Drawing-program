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
function status(){document.querySelector("#status").textContent=tool+" • "+document.querySelector("#size").value+" px • "+document.querySelector("#opacity").value+"%"}
document.querySelector("#size").oninput=status;document.querySelector("#opacity").oninput=status;
document.querySelector("#undo").onclick=()=>{if(history.length>1){future.push(history.pop());restore(history.at(-1))}};
document.querySelector("#redo").onclick=()=>{if(future.length){const u=future.pop();history.push(u);restore(u)}};
document.querySelector("#clear").onclick=()=>{save();ctx.fillStyle="#fff";ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight)};
document.querySelector("#export").onclick=()=>{const a=document.createElement("a");a.download="anime-drawing.png";a.href=canvas.toDataURL("image/png");a.click()};
const colors=["#20202a","#5b3448","#a84f70","#e887a8","#f5c6d7","#ffffff","#ffd76a","#72a6d9","#72c9b0","#8f75d6"],pal=document.querySelector("#palette");colors.forEach(c=>{const b=document.createElement("button");b.className="swatch";b.style.background=c;b.onclick=()=>document.querySelector("#color").value=c;pal.appendChild(b)});
document.querySelectorAll(".menu button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".panel").forEach(p=>p.classList.remove("active"));document.querySelector("#"+b.dataset.panel)?.classList.add("active")});
const lessons={head:["HEAD CONSTRUCTION","1. Draw a circle.\n2. Add the jaw plane.\n3. Place the vertical center line.\n4. Add the eye guideline.\n5. Build the neck below the jaw."],eyes:["ANIME EYES","1. Mark the eye-line.\n2. Draw upper lids with a tapered stroke.\n3. Add iris and pupil.\n4. Add highlight shapes.\n5. Finish lower lids and lashes."],hair:["ANIME HAIR","1. Establish the skull.\n2. Mark the hairline.\n3. Block large hair masses.\n4. Split into locks.\n5. Add tapered strand details."],body:["ANIME BODY","1. Gesture line.\n2. Ribcage and pelvis.\n3. Shoulder and hip angles.\n4. Build limbs from simple forms.\n5. Refine clothing and hands."]};
document.querySelectorAll(".lesson").forEach(b=>b.onclick=()=>{const x=lessons[b.dataset.lesson];document.querySelector("#genout").textContent=x[0]+"\n\n"+x[1];document.querySelectorAll(".panel").forEach(p=>p.classList.remove("active"));document.querySelector("#generator").classList.add("active")});
document.querySelector("#generate").onclick=()=>{const s=document.querySelector("#subject").value,st=document.querySelector("#style").value;document.querySelector("#genout").textContent="ANIME GUIDE\n\nSubject: "+s+"\nStyle: "+st+"\n\nConstruction: gesture → basic forms → anatomy → line art → flats → shadows → highlights.\n\nUse the canvas and reference panels to develop the drawing.";};
document.querySelector("#addPanel").onclick=()=>document.querySelector("#genout").textContent="MANGA PANEL\n\nPanel added to storyboard. Compose character, background and dialogue inside the canvas.";
document.querySelector("#speech").onclick=()=>document.querySelector("#genout").textContent="SPEECH BUBBLE\n\nSpeech-bubble placement guide added.";
document.querySelector("#speed").onclick=()=>document.querySelector("#genout").textContent="SPEED LINES\n\nAction-line guide added.";
document.querySelector("#grid").onchange=e=>document.querySelector("#guide").style.backgroundImage=e.target.checked?"linear-gradient(#ffffff12 1px,transparent 1px),linear-gradient(90deg,#ffffff12 1px,transparent 1px)":"none";
document.querySelector("#symmetry").onchange=()=>{};
status();
