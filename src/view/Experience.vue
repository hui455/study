<script setup>
import Test from '../components/Test.vue';
import {experience,experience2} from '../data/experience';
import {ref,onMounted,nextTick} from 'vue'

const mian = ref([])
const keys ={
  'v-show': [],'proxy': [] ,'vue': [],
  '自我介绍':[], 'webpack':[], 'dom':[],
  'css':[],'js':[],'ts':[],'react':[],
  'promise':[],'项目':[],'es6':[],'http':[],
  '生命周期':[],
  '项目':[],'闭包':[],'diff':[]
}
const content = ref(null)
experience2.forEach(item => {
  if(item.article && item.article.title.length < 15 && item.article.content){
    let a = item.article.content
      keysNum(a,mian.value.length)
      mian.value.push({
     title:item.article.title,
     content:a,
     link:item.link,
     time:item.time,
      })
  }
})
function keysNum(a,length){
   for(let n in keys){
     let regex = new RegExp(n,'i')
     if(regex.test(a)) keys[n].push(length)
   }
}
const entries = Object.entries(keys);  
  
// 根据值进行排序（这里假设值都是数字）  
const sortedEntries = entries.sort((a, b) => b[1].length - a[1].length);  
  
// 
let time = null
window.onresize = ()=>{
   if(Date.now() - time < 500) return
   time = Date.now()
    let col = changeWidth()
    setPoisions(col)
} 
const backtop = ref(false)
window.addEventListener('scroll', () => {
        if (window.scrollY > 300 ) backtop.value = true
        else backtop.value = false
      })
const Top = ()=>{
  document.documentElement.scrollTop = 0
}
function changeWidth(){
  let width = window.innerWidth
   let col = 1
   if(width > 1100) col = 3
    else if(width >600) col = 2
    return col
}

async function setPoisions(column =3,spaceX = 20, spaceY =20){
  await nextTick()
  let nextTops = new Array(column);
  nextTops.fill(0);
  let width = (content.value.offsetWidth - spaceX*2) / column
  mian.value.forEach((n,index)=>{
    const a = content.value.children[index]
    const height = a.offsetHeight + spaceY 
    const b = findMinIndex(nextTops)
    a.style.width = width + 'px'
    a.style.left = b * (width + spaceX) + 'px'
    a.style.top = nextTops[b] + 'px'
    nextTops[b] += height
  })
  content.value.style.height = Math.max(...nextTops) + 'px'
  console.log('完成了')
}

const findMinIndex = (arr) => {
  if (arr.length === 0) return -1; // 处理空数组的情况

  return arr.reduce((minIndex, currentValue, currentIndex, array) => {
    return currentValue < array[minIndex] ? currentIndex : minIndex;
  }, 0);
};
const timepaixu = async ()=>{
  mian.value.sort(function(a,b){
    const time =  a.time.split(' ')[0].replace('-','')
    const time2 = b.time.split(' ')[0].replace('-','')
    return  time2 - time
  })
  await nextTick()
  setPoisions(changeWidth())
}
 let lookkey =[]
 let key = ''
 let index = 0
 const isLook = ref(false)
const LookKeys =  (arr,k) => {
    lookkey = arr
    key = k
    isLook.value = true
    let regex = new RegExp(key,'ig')
    for(let i = 0;i < lookkey.length;i++){
      for( let j = 0;j < mian.value[lookkey[i]].content.length;j++){
         mian.value[lookkey[i]].content[j] = mian.value[lookkey[i]].content[j].replace(regex,`<span style="color:red;font-size:25px"><strong>${key}</strong></span>`)
      }
    }
    nextTick(()=>{
      content.value.children[lookkey[index]].querySelector('span').scrollIntoView();
    })
 }
 const notLook = ()=>{
   isLook.value = false
   const regex = new RegExp(`<span style="color:red;font-size:25px"><strong>${key}</strong></span>`,'ig')
   for(let i = 0;i < lookkey.length;i++){
      for( let j = 0;j < mian.value[i].content.length;j++){
         mian.value[i].content[j] = mian.value[i].content[j].replace(regex,key)
      }
   }
   lookkey = []
 }
const Look = (num) =>{
   index += num
   console.log(index)
   if(index < 0) index = lookkey.length - 1
   if(index > lookkey.length - 1) index = 0
   content.value.children[lookkey[index]].querySelector('span').scrollIntoView();

}

let bookmark =  ref(0)
if(localStorage.getItem('bookmark')) bookmark.value = localStorage.getItem('bookmark')
function setBookmark(num){
  bookmark.value = num
  localStorage.setItem('bookmark',bookmark.value)
}
function ToBookmark(){
  content.value.children[bookmark.value].scrollIntoView()
}
onMounted(()=>{
    setPoisions(changeWidth())
})  

</script>

<template>
 <Test title="面经" placeholder="一些前端面经"></Test>
 <div style="height: 50px;padding: 0 25px;display: flex;align-items: center;">
  <!-- <button style="margin-right: 30px;height: 30px;" @click="timepaixu">时间排序</button>  -->
  <span><strong>面经数：</strong>{{ mian.length }}</span></div>
 <div>
  <span style="padding-left:25px"><strong>关键词：</strong></span>
  <div style="margin-top: 10px;padding-left: 25px">
    <span style="margin-right:25px;cursor: pointer;white-space: nowrap;line-height: 22px;" v-for="n in sortedEntries" @click="LookKeys(n[1],n[0])">{{n[0] + ':  ' + n[1].length}}</span>
  </div>
  <div style="padding-left:25px;margin-top:10px;"><strong>书签：</strong><span @click="ToBookmark()" style="color: #aaa;cursor: pointer;">点我</span></div>
</div>
 <div class="content" ref="content">
  <div class="item" v-for="(item,index) in mian"  :key="index" >
    <h3><a :href="item.link" target="_blank">{{item.title}}</a></h3>
     <div class="time" style="position: relative;">{{item.time}} <span class="bookmark" @click="setBookmark(index)" :style="bookmark == index ? 'color:red;cursor:pointer': 'cursor:pointer'">书签</span>
       <div @click="setBookmark(index)" class="tishi">设置为书签</div>
    </div>
     <p v-for="(i,index) in item.content" :key="index" v-html="i"></p>
  </div>

  <div class="lookkey" :style=" isLook ? '' : 'display:none'"><button @click="Look(-1)">&lt;</button><button @click="notLook">关闭</button><button @click="Look(1)">></button></div>
 </div>
 <button class="backtop" style="font-size: 30px;padding-top: 10px;height: 50px;" :style="backtop ? '' : 'display:none'" @click="Top">^</button>
</template>
<style scoped>
 .content{
  margin: 0 20px;
  position: relative;
  width: calc(100% - 40px);
 }
 .bookmark:hover + .tishi{
     display: block;
 }
 .tishi:hover{
     display: block;
 }
 .tishi{
  position: absolute;
  cursor: pointer;
  display: none;
  top: calc(100% + 10px);
  right: -25px;
  width: 70px;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  text-align: center;
  color:#000;
  background: #fff;
  border:1px solid #55555540;
 }
 .tishi::after{
   content: '';
   position: absolute;
   bottom: 100%;
   right: 30px;
   width: 0;
   height: 0;
   border:10px solid transparent;
   border-bottom-color: #55555540;
   z-index: 1;
 }
 .tishi::before{
  content: '';
  position: absolute;
  bottom: 100%;
  right: 32px;
  width: 0;
  height: 0;
  border:8px solid transparent;
   border-bottom-color: #fff;
   z-index: 2;
 }
 
 .tishi > div:last-child{
    width: 100px;
    height: 40px;
    background: #fff;
    box-shadow: 0px -3px 15px #aaa;
    z-index: 99;
 }
 .backtop{
  position: fixed;
  bottom: 60px;
  right: 30px;
 }

 .lookkey{
  position: fixed;
  bottom: 0px;
  left: 0;
  display: flex;
  height: 100vh;
  width: 100vw;
  background: #33333310;
  justify-content: center;
  align-items: end;
 }
 .lookkey > button{
  height: 30px;
  margin: 0 30px 30px;
 }
 .item{
  position: absolute;
 }
 @media screen and (min-width:1100px) {
   .item{
    width: 30%;
   }
 }
 @media screen and (max-width:1100px) and (min-width: 600px) {
   .item{
    width: 45%;
   }
 }
 @media screen and  (max-width: 600px) {
   .item{
    width: 90%;
   }
 }
 .item:focus{
   outline: 1px solid red;
   color: red;
   
 }
 .item p:focus{
   outline: 1px solid red;
   color: red;
   
 }
 .time{
  font-size: 14px;
  color: #aaa;
  margin-top:-10px;
  width: fit-content;
 }
 
</style>