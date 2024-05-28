
 
<script >
import { defineComponent,onMounted } from 'vue';
import Prism from 'prismjs';
export default defineComponent({
  name: 'Code',
  props:{
    code:{
      type:String,
      default:''
    }
  },
  setup(props) {
   
    onMounted(() => {
      Prism.highlightAll(); // 切换更新内容则重新调用这个方法
    });
    return {props}
  }
});
</script>
<template>
  <pre><code class="language-js line-numbers">{{ props.code }}</code></pre>
</template>