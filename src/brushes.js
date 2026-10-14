export const BRUSH_PRESETS={
  pencil:{size:.8,opacity:.8,spacing:.04,stabilization:.35},
  ink:{size:1,opacity:1,spacing:.02,stabilization:.5},
  marker:{size:1.8,opacity:.55,spacing:.08,stabilization:.2},
  airbrush:{size:3,opacity:.18,spacing:.15,stabilization:.1},
  soft:{size:2.5,opacity:.35,spacing:.12,stabilization:.3},
  hard:{size:1.2,opacity:1,spacing:.03,stabilization:.4}
}
export function makeBrush(name="ink",overrides={}){return{name,...BRUSH_PRESETS[name]||BRUSH_PRESETS.ink,...overrides}}
export function pressureSize(base,pressure=1,taper=0){const p=Math.max(.05,Math.min(1,pressure));return base*(1-taper+taper*p)}
