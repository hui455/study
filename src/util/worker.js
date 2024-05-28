import { createChunk } from "./CutFile";
onmessage = async (e) =>{
  const { file,
    CHUNK_SIZE,
    startIndex,
    endIndex} = e.data
    console.log(file,CHUNK_SIZE,startIndex,endIndex)
    const proms = []
    for(let i = startIndex; i< endIndex;i++){
       proms.push(createChunk(file,i,CHUNK_SIZE))
    }
    const chunks = await Promise.all(proms)
    postMessage(chunks)
}



