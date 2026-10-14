export async function readTextFile(file){return file.text()}
export function readImage(file){
  return new Promise((resolve,reject)=>{
    const url=URL.createObjectURL(file),img=new Image()
    img.onload=()=>resolve({width:img.naturalWidth,height:img.naturalHeight,url,file})
    img.onerror=e=>{URL.revokeObjectURL(url);reject(e)}
    img.src=url
  })
}
export async function readJSON(file){return JSON.parse(await file.text())}
export function validateProjectShape(data){
  const p=data?.project&&typeof data.project==="object"?data.project:data
  return !!p&&typeof p==="object"&&typeof p.version==="number"&&Array.isArray(p.scenes)
}
export function unwrapProject(data){return data?.project&&typeof data.project==="object"?data.project:data}
