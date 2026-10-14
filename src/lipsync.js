const VISEMES=["A","E","I","O","U","M","F","L","WQ","BMP","CDG","TH","FV","REST"];
const PHONEME_RULES=[
  [/\b(m|b|p)\b/gi,"BMP"],[/[mfv]/gi,"FV"],[/[θð]/gi,"TH"],[/[l]/gi,"L"],
  [/[wq]/gi,"WQ"],[/[oɔ]/gi,"O"],[/[uʊ]/gi,"U"],[/[iɪ]/gi,"I"],[/[eɛ]/gi,"E"],
  [/[aɑə]/gi,"A"],[/[cgjkɡsʃztdnɹh]/gi,"CDG"]
];
export function estimateVisemes(text,durationMs=1200){
  const clean=(text||"").replace(/\s+/g," ").trim(); if(!clean)return [];
  const units=[...clean].filter(c=>/[^\s]/.test(c)); const step=Math.max(45,durationMs/Math.max(units.length,1));
  return units.map((c,i)=>({timeMs:Math.round(i*step),durationMs:Math.round(step),viseme:charToViseme(c)}));
}
function charToViseme(c){
  const x=c.toLowerCase();
  if(/[bmp]/.test(x))return "BMP"; if(/[fv]/.test(x))return "FV"; if(/[l]/.test(x))return "L";
  if(/[wq]/.test(x))return "WQ"; if(/[o]/.test(x))return "O"; if(/[u]/.test(x))return "U";
  if(/[i]/.test(x))return "I"; if(/[e]/.test(x))return "E"; if(/[a]/.test(x))return "A";
  if(/[cdgkjtndszrhy]/.test(x))return "CDG"; return "REST";
}
export function makeLipSyncTrack(text,durationMs=1200){
  return {text,durationMs,markers:estimateVisemes(text,durationMs),mouthShapes:VISEMES};
}
export function applyViseme(character,viseme){
  if(!character)return;
  character.mouthViseme=viseme;
  character.mouthOpen=viseme==="REST"?0:viseme==="I"?0.25:viseme==="E"?0.4:viseme==="A"?0.65:viseme==="O"?0.8:viseme==="U"?0.55:0.35;
}

if(typeof window!=="undefined"){window.makeLipSyncTrack=makeLipSyncTrack;window.applyViseme=applyViseme;}
