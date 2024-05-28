<script setup>
import Test from '../components/Test.vue';
import { onMounted,ref } from 'vue';
import {cutFile,cutFile2} from '../util/CutFile'
let time = ref('')
let time2 = ref('')
let time3 = ref('')
onMounted(()=>{
  const inpFile = document.querySelectorAll('input[type="file"]')
  console.log(inpFile)
  inpFile[0].onchange = async (e)=>{
  console.log(e)
  const file = e.target.files[0]
  console.time('cutFile')
  const oldtime =  Date.now()
  const result = await cutFile(file)
  const newtime = Date.now()
  console.timeEnd('cutFile')
  time.value = newtime -oldtime + 'ms'
  console.log(result)
}
inpFile[1].onchange = async (e)=>{
  console.log(e)
  const file = e.target.files[0]
  console.time('cutFile')
  const oldtime =  Date.now()
  const result = await cutFile2(file)
  const newtime = Date.now()
  time2.value = newtime -oldtime + 'ms'
  console.timeEnd('cutFile')
  console.log(result)
}
inpFile[2].onchange = async (e)=>{
  console.log(e)
  const file = e.target.files[0]
  console.time('cutFile')
  const oldtime =  Date.now()
  const result = await cutFile2(file,12)
  const newtime = Date.now()
  time3.value = newtime -oldtime + 'ms'
  console.timeEnd('cutFile')
  console.log(result)
}
})

</script>

<template>
 <Test title="大文件" placeholder=""></Test>
 <div style="padding:20px 20px 0">
  <span style=" display:inline-block;color: red;font-size: 20px; width: 120px;">方法1：</span><input type="file" >
  <span>用时：{{ time }}</span>
 </div>
 <div style="padding:30px 20px">
  <span style=" display:inline-block;color: red;font-size: 20px; width: 120px">方法2：</span><input type="file" >
  <span>用时：{{ time2 }}</span>
 </div>
 <div style="padding:30px 20px">
  <span style=" display:inline-block;color: red;font-size: 20px; width: 120px">方法2(12)：</span><input type="file" >
  <span>用时：{{ time3 }}</span>
 </div>
 <div>
 </div>
</template>
<style scoped>

</style>