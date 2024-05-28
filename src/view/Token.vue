<script setup>
import Test from '../components/Test.vue';
const a = {
  vue:1,
  act:2,
}
for( let n in a){
  console.log(n)
}
console.log('adsdf'.length)
const b = '1'
const c = 1
console.log(b === c,b + c ,b-c)
</script>

<template>
 <Test title="Token" placeholder="无感刷新token"></Test>

</template>
<style scoped>

</style>