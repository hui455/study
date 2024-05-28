import SparkMD5 from "spark-md5";
const  CHUNK_SIZE = 1024 * 1024 *5
let THREAD_COUNT = 8
export  async function cutFile(file){
  const result = []
  const chunkCount = Math.ceil(file.size /CHUNK_SIZE)
  console.log(chunkCount)
  for(let i =0; i<chunkCount;i++){
    const chunk = await createChunk(file,i,CHUNK_SIZE)
    result.push(chunk)
  }
 return result
//  const chunk = await createChunk(file,1,CHUNK_SIZE)
//  console.log(chunk)
}

export function cutFile2(file,count = 8){
return new Promise((resolve)=>{  const result = []
  THREAD_COUNT = count
  let finishCount =0;
  const chunkCount = Math.ceil(file.size /CHUNK_SIZE)
  const workerChunkConut = Math.ceil(chunkCount/THREAD_COUNT)
  const workerConut = Math.ceil(chunkCount/workerChunkConut)
  console.log(workerConut)
  for(let i = 0;i< workerConut;i++){
    const worker = new Worker(new URL('./worker.js',import.meta.url),{
      type:'module'
    })
    console.log(i)
    const startIndex = i * workerChunkConut;
    let endIndex = startIndex + workerChunkConut;
    if(endIndex > chunkCount)endIndex = chunkCount 
    worker.postMessage({
      file,
      CHUNK_SIZE,
      startIndex,
      endIndex
    })
    worker.onmessage = (e)=>{
      console.log(e)
      for(let i = startIndex;i < endIndex;i++) result[i]= e.data[i-startIndex]
      worker.terminate();

      finishCount++;
      if(finishCount === workerConut) resolve(result)
    }
  
   
  }}
)
}


export function createChunk(file,index,chunKSize){
  return new Promise((resolve) =>{
    const start = index * chunKSize;
    const end = start + chunKSize;
    const spark = new SparkMD5.ArrayBuffer()
    const reader = new FileReader()
    reader.onload = (e)=>{
      spark.append(e.target.result)
      resolve({
        start,
        end,
        index,
        hash:spark.end()
      })
    }
    reader.readAsArrayBuffer(file.slice(start,end))
})
}



 