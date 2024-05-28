<template>
  <component :is="component[id]" />
</template>

<script setup>
import { ref,watch } from 'vue'
import { useRoute } from 'vue-router'
import Token from './Token.vue';
import Experience from './Experience.vue';
import JavaScript from './JavaScript.vue';
import Wuziqi from './Wuziqi.vue';
import BigFile from './BigFile.vue';
import Xiangqi from './Xiangqi.vue';
import Proxy from './Proxy.vue';
import VueProxy from './VueProxy.vue'
const component ={
  Token,
  Experience,
  JavaScript,
  Wuziqi,
  BigFile,
  Xiangqi,
  Proxy,
  VueProxy
}
const route = useRoute();
let id = ref(route.params.id);


watch(route,()=>{
  id = ref(route.params.id);
},{immediate:true})

// 动态组件懒加载



</script>