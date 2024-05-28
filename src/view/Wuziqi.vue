<script setup>
import Test from '../components/Test.vue';
import { ref } from 'vue';

const data = ref( createArray(15) );
const data2 = ['','X','O']
let data3 = false
console.log(data.value);


function createArray(n){
  return Array.from({length: n}, () => Array.from({length: n}, () => 0));
}

const addqi = (index1, index2) => {
  if(data.value[index1][index2] === 0){
    if(data3) data.value[index1][index2] = 2
    else data.value[index1][index2] = 1
    data3 = !data3
    const Win =win(index1,index2, data.value[index1][index2])
    if(Win){
      alert(`${data3?'X':'O'} 赢了!}`)
      data.value = createArray(15)
    }
  
   
  }
    
}

const win = (index1,index2,n)=>{
   if(winCompute(index1,index2,n,lRow,rRow)) return true
   if(winCompute(index1,index2,n,lHyp,rHyp)) return true
   if(winCompute(index1,index2,n,lCol,rCol)) return true
   return false
}
function winCompute(index1,index2,n,fun1,fun2){
   let count = 1
   let left = [index1,index2],right= [index1,index2]
   while(1){
       left = fun1(left)
       if(left[0] < 0 ) break
       if(data.value[left[0]][left[1]] !== n){
          break
       }
       count++
   }
   while(1){
       right = fun2(right)
       if(right[0] < 0 ) break
       if(right === null) break
       if(data.value[right[0]][right[1]] !== n){
          break
       }
       count++
   }
   return count >= 5 ? true : false
}

const lHyp = (index)=>{
  return [index[0]-1,index[1]-1] 
}
const rHyp = (index)=>{
  return [index[0]+1,index[1]+1]
}
const lCol = (index)=>{
  return [index[0]-1,index[1]] 
}
const rCol = (index)=>{
  return [index[0]+1,index[1]] 
}
const lRow = (index)=>{
  return [index[0],index[1]-1] 
}
const rRow = (index)=>{
  return [index[0],index[1]+1] 
}

</script>

<template>
 <Test title="五子棋" placeholder="小游戏">
  <div class="wuziqi">
    <button class="btn" @click="data = createArray(15)">重新开始</button>
    <div class="content">
      <div class="row" v-for="(n, index1) in data" :key="index1">
        <div class="col" v-for="(m, index2) in n" :key="index2" @click="addqi(index1, index2)">
            {{ data2[m] }}
        </div>
    </div>
    </div>
    
  </div>
 
 </Test>
</template>
<style scoped>
.wuziqi{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btn{
  margin-bottom: 30px;
  margin-right: 40px;
  height: 30px;
  width: 90px;
}
.col{
  width: 30px;
  height: 30px;
  border-top: 1px solid #000;
  border-left:1px solid #000;
  cursor: default;
  text-align: center;
  line-height: 30px;

}
.row{
  display: flex;
}
.col:last-child{
  border-right: 1px solid #000;
}
.row:last-child .col{
  border-bottom: 1px solid #000;
}
</style>