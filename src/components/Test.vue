<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  title: {
    type: String,
    default: 'test'
  },
  placeholder: {
    type: String,
    default: 'this is  a test'
  },
  titleStyle: {
    type: String,
    default: ''
  }
  
})
</script>

<template>
  <div class="test">
  <div class="test-title"> 
    <span :style="titleStyle">{{ title }}</span>
    <span>{{ placeholder }}</span></div>
   <slot></slot>
  </div>
</template>

<style scoped>
  .test{
     padding: 0 20px;
   }
  .test-title{
   text-align: center;
    padding: 10px 0;
  }
   .test-title span:first-child{
     font-size: 30px;
     margin-right: 20px;
   }
   .test-title span:last-child{
     font-size: 16px;
     color: #999;
   }
</style>