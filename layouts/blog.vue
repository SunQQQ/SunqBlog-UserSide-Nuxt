<template>
    <div>
        <!-- 这里是公共区域内容 -->
        <brother-topbar/>

        <!-- 子页面内容区域 -->
        <nuxt />

        <!-- 这里是公共区域内容 -->
        <brother-footer/>

        <canvas-bac/>
    </div>
</template>

<script>
import BrotherTopbar from '../components/Brother/TopBar.vue';
import BrotherFooter from '../components/Brother/Footer.vue';
import CanvasBac from '../components/Brother/CanvasBac.vue';

export default {
  name: 'blog',
  components:{
    'brother-topbar': BrotherTopbar,
    'brother-footer': BrotherFooter,
    'canvas-bac': CanvasBac
  }
}
</script>