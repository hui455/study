<script setup>
import Test from '../components/Test.vue';
import {ref} from 'vue'

const data =[
  { 
     name:(n)=> n ? '俥':'車',
    fun:(oldIndex,newIndex)=>{
      if(oldIndex[0] !==newIndex[0] & oldIndex[1] !==newIndex[1]) return
      if(oldIndex[0] === newIndex[0]){
         if(oldIndex[1]-newIndex[1] >0){
           for(let i = parseInt(newIndex[1])+1;i<oldIndex[1];i++){
               if(pos.value.has(`${oldIndex[0]}${i}1`) || pos.value.has(`${oldIndex[0]}${i}0`)) return 1
           }
         }else{
           for(let i = newIndex[1]-1;i>oldIndex[1];i--){ 
               if(pos.value.has(`${oldIndex[0]}${i}1`) || pos.value.has(`${oldIndex[0]}${i}0`)) return 2
           }
         }
      }else{
        if(oldIndex[0]-newIndex[0] >0){
           for(let i = parseInt(newIndex[0])+1;i<oldIndex[0];i++){
               if(pos.value.has(`${i}${oldIndex[1]}1`) || pos.value.has(`${i}${oldIndex[1]}0`)) return 3
           }
         }else{
           for(let i = newIndex[0]-1;i>oldIndex[0];i--){
               if(pos.value.has(`${i}${oldIndex[1]}1`) || pos.value.has(`${i}${oldIndex[1]}0`)) return 4
           }
          }
      }
      Move(oldIndex,newIndex)
      
    }
 },{
    name:(n)=> n ? '傌':'馬',
    fun:(oldIndex,newIndex)=>{
     const x =  newIndex[0] -oldIndex[0] 
     const y =  newIndex[1] -oldIndex[1] 
     if(Math.abs(x*y) !== 2 ) return
     if(Math.abs(x)===2 && (pos.value.has(`${parseInt(oldIndex[0]) + x/2}${oldIndex[1]}1`) || pos.value.has(`${parseInt(oldIndex[0]) + x/2}${oldIndex[1]}0`))) return
     if(pos.value.has(`${oldIndex[0]}${parseInt(oldIndex[1])+y/2}1`) || pos.value.has(`${oldIndex[0]}${parseInt(oldIndex[1])+y/2}0`)) return
     Move(oldIndex,newIndex)
}   
  },
  {
    name:(n)=> n ? '相':'象',
    fun:(oldIndex,newIndex)=>{
      const x =  newIndex[0] -oldIndex[0] 
     const y =  newIndex[1] -oldIndex[1] 
     if(!JieQie && ((pos.value.get(oldIndex) > 0 && newIndex[1] > 4) || (pos.value.get(oldIndex) < 0 && newIndex[1] < 5) ) ) return
     if(Math.abs(x) !== 2 || Math.abs(y) !== 2 || pos.value.has(`${parseInt(oldIndex[0]) + x/2}${parseInt(oldIndex[1])+y/2}1`) || pos.value.has(`${parseInt(oldIndex[0]) + x/2}${parseInt(oldIndex[1])+y/2}0`) )return 
     Move(oldIndex,newIndex)
}
  },{
    name:(n)=> n ? '仕':'士',
    fun:(oldIndex,newIndex)=>{
      const x =  newIndex[0] -oldIndex[0] 
     const y =  newIndex[1] -oldIndex[1]
     if(Math.abs(x*y) !==1 ) return
     if(!JieQie && ( (newIndex[0] <3 || newIndex[0]>5)|| (newIndex[1] >2 && newIndex[1] <7))) return
     Move(oldIndex,newIndex)
    }
  },
  {
    name:(n)=> n ? '帅':'将',
    fun:(oldIndex,newIndex)=>{
      const x =  newIndex[0] -oldIndex[0] 
     const y =  newIndex[1] -oldIndex[1]
     if(Math.abs(x + y) !== 1) return
     if( !JieQie && ((newIndex[0] <3 || newIndex[0]>5)|| (newIndex[1] >2 && newIndex[1] <7))) return
     Move(oldIndex,newIndex)
    }
  },{
    name:(n)=> n ? '炮':'砲',
    fun:(oldIndex,newIndex)=>{
      let count = 0
     if(oldIndex[0] !== newIndex[0] & newIndex[1] !== oldIndex[1]) return
     if(oldIndex[0] === newIndex[0]){
         if(oldIndex[1]-newIndex[1] >0){
           for(let i = parseInt(newIndex[1])+1;i<oldIndex[1];i++){
               if(pos.value.has(`${oldIndex[0]}${i}1`) || pos.value.has(`${oldIndex[0]}${i}0`)) count++
           }
         }else{
           for(let i = newIndex[1]-1;i>oldIndex[1];i--){
               if(pos.value.has(`${oldIndex[0]}${i}1`) || pos.value.has(`${oldIndex[0]}${i}0`)) count++
           }

         }
      }else{
        if(oldIndex[0]-newIndex[0] >0){
           for(let i = parseInt(newIndex[0])+1;i<oldIndex[0];i++){
               if(pos.value.has(`${i}${oldIndex[1]}1`) || pos.value.has(`${i}${oldIndex[1]}0`)) count++
           }
         }else{
           for(let i = newIndex[0]-1;i>oldIndex[0];i--){
               if(pos.value.has(`${i}${oldIndex[1]}1`) || pos.value.has(`${i}${oldIndex[1]}0`)) count++
           }
          }
    }
    if(count > 1 || (count ===1 && !pos.value.has(`${newIndex[0]}${newIndex[1]}1`) && !pos.value.has(`${newIndex[0]}${newIndex[1]}0`) )) return
    Move(oldIndex,newIndex)
}
  },{
    name:(n)=> n ? '兵':'卒',
    fun:(oldIndex,newIndex)=>{
    const olddata = pos.value.get(oldIndex)
    const a = newIndex[1] -oldIndex[1]
    const b = oldIndex[0] * olddata
    console.log(b)
    if(a * olddata !== 7 & a * olddata !== 0) return 1
    if(a * olddata === 0 &(b < -34 || (b  < 34 & b >1) || Math.abs(oldIndex[0]-newIndex[0])!== 1 )) return 2
    Move(oldIndex,newIndex)
  
  }
  }
]
let JieQie =false
let status = ''
let gamer = ref(true)
const pos = ref(new Map(createArray()))
const xiaoqi = (e)=>{
  const x = Math.round((e.offsetX -20)/50)
  const y = Math.round((e.offsetY -20)/50)
  const q= `${x}${y}0`
  const p = `${x}${y}1`
  if(!status && pos.value.has(q) && (pos.value.get(q) >0) ===  gamer.value){
    let value = pos.value.get(q)
    pos.value.delete(q)
    pos.value.set(p,value)
    gamer.value = !gamer.value
    return
  }
  if(!status && (!pos.value.has(p) || (pos.value.get(p) >0) !==  gamer.value)) return
  if(!status || Isself(status,p)){ 
    if(status){
      const old = document.querySelector(`[name="${status}"]`)
      old.classList.remove('flash')
    }
    const d = document.querySelector(`[name="${p}"]`)
    status = p 
    d.classList.add('flash')
    return}
    const d = document.querySelector(`[name="${status}"]`)
    d.classList.remove('flash')
    data[Math.abs(pos.value.get(status))-1].fun(status,p)
    status = ''
    
  }
 function Move(oldIndex,newIndex){
     pos.value.set(newIndex,pos.value.get(oldIndex))
     pos.value.delete(oldIndex)
     gamer.value = !gamer.value
}
function handledata(n){
  const  m = Math.abs(n)
 return  data[m-1].name(n> 0)
}
function Isself(oldIndex,newIndex){
  return pos.value.get(oldIndex) * pos.value.get(newIndex) > 0
}
function posCompute(n){
  const x = n.slice(0,1)
  const y = n.slice(1,2)
  return `left:${x*50 }px;top:${y*50 }px;`
}
function createArray(){
  let arr = []
  for(let i = 0 ;i<9;i++){
    let qi = i > 3 ? 9 - i : i+1
    arr.push([`${i}01`,qi],[`${i}91`,-qi])
  }
  arr.push(['121',6],['721',6],['171',-6],['771',-6])
  for(let i = 0 ;i<9;i +=2){
    arr.push([`${i}31`,7],[`${i}61`,-7])
  }
  return arr
}
function createArray2(){
  let arr = [], arr1 = [1,1,2,2,3,3,4,4,5,6,6,7,7,7,7,7],arr2 = arr1.map( n=> -n)
  arr1 = shuffleArray(arr1) ,arr2 = shuffleArray(arr2)
  for(let i = 0 ;i<9;i++){
    arr.push([`${i}00`,arr1.pop()],[`${i}90`,arr2.pop()])
  }
  arr.push(['120',arr1.pop()],['720',arr1.pop()],['170',arr2.pop()],['770',arr2.pop()])
  for(let i = 0 ;i<9;i +=2){
    arr.push([`${i}30`,arr1.pop()],[`${i}60`,arr2.pop()])
  }
  return arr
}
function shuffleArray(array) {  
    var currentIndex = array.length, temporaryValue, randomIndex;  
  
    // 当仍剩元素需要混洗时  
    while (0 !== currentIndex) {  
  
        // 选取一个剩余元素...  
        randomIndex = Math.floor(Math.random() * currentIndex);  
        currentIndex -= 1;  
  
        // 并与当前元素交换。  
        temporaryValue = array[currentIndex];  
        array[currentIndex] = array[randomIndex];  
        array[randomIndex] = temporaryValue;  
    }  
  
    return array;  
}  
</script>

<template>
 <Test title-style="padding-right:130px" title="象棋" placeholder="">
  <div class="content">
  <div class="g-grid">
    <div class ='row' v-for="n in 9" >
      <div class="col" v-for="n in 8">
      </div>
    </div>
    <div @click="xiaoqi" class="checkerboard"></div>
    <div :class="n[1] > 0 ? 'qizi red' : 'qizi black'" :name="n[0]" :style="posCompute(n[0])" v-for=" n in pos" >{{ n[0][2] == 1 ? handledata(n[1]) : ' ' }}</div>
  </div>
  <div class="left">
   <div class="gamer">
    <span style="color: red;" :class="gamer ? 'gamer flash': 'gamer'">红方</span>
    </div>
    <div class="youxi">
      <button style="margin-bottom: 40px;" @click="pos = new Map(createArray2());JieQie=true">揭棋</button>
      <button style="" @click="pos = new Map(createArray());JieQie=false">重新游戏</button>
    </div>
    <div :class="gamer ? 'gamer': 'gamer flash'">
      <span>黑方</span>
    </div>
  </div>
</div>
 </Test>
  
</template>
<style scoped>
  .content{
    display: flex;
    justify-content: center;
  }
  .gamer{
    font-size: 30px;
  }
  .left{
    padding: 40px ;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .g-grid {
    position: relative;
    width: fit-content;
    outline: 1px solid #000;
    outline-offset: -6px;
    padding: 20px;
  } 

.checkerboard{
  position: absolute;
  width: 100%;
  height: 100%;
  top:0;
  left:0;
  z-index: 99;
}
.flash{
  animation: flash ease 1s infinite;
}

@keyframes flash {
    0%, 100% { opacity: 1}
    80% { opacity: 0; }
  }
.qizi{
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  background: #fff;
  z-index: 98;
}
.red{
  color:red;
  border: 1px solid red;
}
.black{
  color:black;
  border: 1px solid black;
}
.col{
  width: 50px;
  height: 50px;
  border-left: 1px solid #000;
}
.row{
  width: fit-content;
  display: flex;
  border-top: 1px solid #000;
}
.row:nth-child(9){
  border-bottom: 1px solid #000;
}
.col:last-child{
  border-right: 1px solid #000;
}
.row:nth-child(5) .col:not(:first-child){
  border-left:1px solid transparent
}
.row:nth-child(1) .col:nth-child(4),
.row:nth-child(2) .col:nth-child(5),
.row:nth-child(8) .col:nth-child(4),
.row:nth-child(9) .col:nth-child(5)
{
  background: 
        repeating-linear-gradient(-45deg, transparent 0, transparent 5px, #fff 5px, #fff 10px),
        linear-gradient(45deg,
        transparent 0, transparent calc(50% - 0.5px),
        #000 calc(50% - 0.5px), #000 calc(50% + 0.5px),
        transparent calc(50% + 0.5px), transparent 0)


}

.row:nth-child(1) .col:nth-child(5),
.row:nth-child(2) .col:nth-child(4),
.row:nth-child(8) .col:nth-child(5),
.row:nth-child(9) .col:nth-child(4)
{
  background: 
        repeating-linear-gradient(45deg, transparent 0, transparent 5px, #fff 5px, #fff 10px),
        linear-gradient(-45deg,
        transparent 0, transparent calc(50% - 0.5px),
        #000 calc(50% - 0.5px), #000 calc(50% + 0.5px),
        transparent calc(50% + 0.5px), transparent 0)
}

</style>