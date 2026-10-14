export class AssetManager{
  constructor(){this.items=[];this.filters={q:"",category:"All"}}
  add(asset){const item={id:asset.id||"asset-"+Date.now()+"-"+Math.random().toString(36).slice(2,7),name:asset.name||"Untitled Asset",category:asset.category||"Characters",tags:asset.tags||[],source:asset.source||"local",license:asset.license||"Original",...asset};this.items.push(item);return item}
  remove(id){this.items=this.items.filter(x=>x.id!==id)}
  search(q){this.filters.q=q??"";const needle=this.filters.q.toLowerCase();return this.items.filter(x=>(!needle||x.name.toLowerCase().includes(needle)||x.tags.some(t=>String(t).toLowerCase().includes(needle)))&&(this.filters.category==="All"||x.category===this.filters.category))}
  importFile(file,meta={}){const url=URL.createObjectURL(file);return this.add({name:file.name,category:meta.category||"Characters",source:"import",license:meta.license||"User supplied",mime:file.type,size:file.size,url})}
  fromJSON(items=[]){this.items=Array.isArray(items)?items.map(x=>({...x})):[];return this.items}
  exportManifest(){return JSON.stringify({version:1,assets:this.items},null,2)}
}
