<script setup>
import Test from '../components/Test.vue';
import Code from '../components/Code.vue';
function test1(){
  setTimeout(function(){
    console.log('定时器开始啦')
});

new Promise(function(resolve){
    console.log('马上执行for循环啦');
    for(var i = 0; i < 10000; i++){
        i == 99 && resolve();
    }
}).then(function(){
    console.log('执行then函数啦')
});

console.log('代码执行结束');

}
const code = ` setTimeout(function(){
    console.log('定时器开始啦')
 });

new Promise(function(resolve){
    console.log('马上执行for循环啦');
    for(var i = 0; i < 10000; i++){
        i == 99 && resolve();
    }
}).then(function(){
    console.log('执行then函数啦')
});

console.log('代码执行结束');`

const text = `
JavaScript 的事件循环是一个非常重要的机制，它使得 JavaScript 作为单线程语言可以有效地处理异步操作。以下是对事件循环机制的简要解释：

### 事件循环的基本原理

1. **执行栈（Call Stack）**：
   - 当一个函数被调用时，它会被添加到调用栈顶端。
   - 当函数执行完毕后，它会从调用栈中移除。
   
2. **任务队列（Task Queue）**：
   - 是一个先进先出的队列，存放的是需要执行的回调任务（例如 setTimeout 回调、事件处理器等）。
   
3. **事件循环（Event Loop）**：
   - 事件循环是一个不断检查调用栈和任务队列的循环。
   - 如果调用栈为空（即没有正在执行的代码），事件循环会从任务队列中取出第一个任务，并将其推入调用栈中进行执行。
   

总结：事件循环不断地协调执行栈、微任务队列和宏任务队列，确保 JavaScript 可以处理异步任务并保持界面响应。
`

</script>

<template>
 <Test title="JavaScript 执行机制" placeholder="">
  <div class="left">
    <v-md-preview :text="text"></v-md-preview>
  </div>
  <div class="right">
    <h3>测试代码</h3>
    <Code :code="code"></Code>
    <span>执行顺序测试</span>
  <button @click="test1()">测试</button>
  </div>
 </Test>
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
</style>