<script setup>
import { ref ,onMounted} from 'vue'
import { test} from '../data/test';
import { useRouter } from 'vue-router'
const router = useRouter()
const active = ref('')
onMounted(()=>{
  active.value = router.currentRoute.value.params.id
})
</script>

<template>
  <div class="header-b">
    <div class="header">
    <div class="header-item" v-for="(n,index) in test" :style="active === n.name ? 'color:#409eff' : ''" @click="router.push({ name:'test' ,params:{id:n.name}}),active = n.name">
      {{ n.label }}
    </div>
    <div style="flex-grow: 1;"></div>
  </div>
</div>
  
</template>
<style scoped>
 .header-b{
  height: 50px;
  max-height: 50px;
  width: 100%;
  position: relative;
 }
 .header:hover{
   height: auto;
 }
.header {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 50px;
  min-height: 50px;
  background: #fff;
  border-bottom: 1px solid #eaeaea;
  flex-wrap: wrap;
  overflow: hidden;
}
.header-item {
  line-height: 50px;
  height: 50px;
  cursor: pointer;
  padding: 0 20px;
  white-space: nowrap;
  overflow: hidden;
}
.header-item:hover {
  color: #409eff;
}
</style>