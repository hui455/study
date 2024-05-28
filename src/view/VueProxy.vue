<script setup>
import Test from '../components/Test.vue';
import Code from '../components/Code.vue';

const text1 = `
  响应式布局 xxx

  ### 响应式数据的基本实现

1. **相关概念**：
   - 副作用函数：执行后会直接或者间接影响其他函数的执行的函数。
   - 响应式数据：。
   
2. **响应数数据的实现**：
   - 。
   
  ### 设计一个更完美的
1. **哈哈**
   

`
const code = ` //porxy 实现
 const bucket = new Set()
 const data = { text: 'hello world'}
 const obj = new Proxy(data,{
  get(target,key){
    bucket.add(effect)
    return target[key]
  }
  set(target,key){
    target[key] = newVal 
    bucket.forEach(fn => fn())
    return true
  }
 })
 function effect(){
   document.body.innerText = obj.text
 }
 }
`
</script>

<template>
 <Test title="响应式的实现与设计" placeholder="vue响应式系统的设计与实现"></Test>
 <div class="left">
    <v-md-preview :text="text1"></v-md-preview>
  </div>
  <div class="right">
    <Code :code="code"></Code>
  </div>
</template>
<style scoped>
  .left{
   width: calc(50% - 20px);
   height: 100%;
   float: left;
   margin-right: 20px;
 }
 .left >span{
     font-size: 14px;
     line-height: 40px;
 }
 .right{
    padding-right:80px
 }
</style>