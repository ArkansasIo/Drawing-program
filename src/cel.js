export const CEL_PASSES=["rough","sketch","line","flats","shadows","highlights","fx","background"]
export const BLEND_MODES=["source-over","multiply","screen","overlay","darken","lighten","color-dodge","color-burn"]
export function makeCel(data={}){return{id:"cel-"+Date.now()+"-"+Math.random().toString(36).slice(2,7),frame:0,layer:"Line Art",exposure:1,visible:true,blendMode:"source-over",opacity:1,...data}}
export function compositeCels(ctx,cels,renderer){
  cels.filter(c=>c.visible).forEach(c=>{ctx.save();ctx.globalAlpha=c.opacity;ctx.globalCompositeOperation=c.blendMode||"source-over";renderer(c,ctx);ctx.restore()})
}
