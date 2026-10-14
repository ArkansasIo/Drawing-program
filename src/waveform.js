export async function decodeAudio(fileOrBlob){
  const AC=window.AudioContext||window.webkitAudioContext;if(!AC)throw new Error("Web Audio API unavailable")
  const ctx=new AC(),buffer=await ctx.decodeAudioData(await fileOrBlob.arrayBuffer());return{duration:buffer.duration,sampleRate:buffer.sampleRate,channels:buffer.numberOfChannels,buffer}
}
export function peaks(buffer,width=800){
  const data=buffer.getChannelData(0),step=Math.max(1,Math.floor(data.length/width)),out=[]
  for(let i=0;i<data.length;i+=step){let min=1,max=-1;for(let j=i;j<Math.min(data.length,i+step);j++){const v=data[j];if(v<min)min=v;if(v>max)max=v}out.push({min,max})}return out
}
