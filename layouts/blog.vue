<template>
    <div>
        <!-- 这里是公共区域内容 -->
        <brother-topbar/>

        <!-- 子页面内容区域 -->
        <nuxt />

        <!-- 这里是公共区域内容 -->
        <brother-footer/>
        <tips/>
        <loading/>
        <canvas-bac/>
    </div>
</template>

<script>
import BrotherTopbar from '../components/Brother/TopBar.vue';
import BrotherFooter from '../components/Brother/Footer.vue';
import Tips from '../components/Brother/Tips.vue';
import CanvasBac from '../components/Brother/CanvasBac.vue';
import Loading from '../components/Brother/Loading.vue';

export default {
  name: 'blog',
  components:{
    'brother-topbar': BrotherTopbar,
    'brother-footer': BrotherFooter,
    'tips': Tips,
    'canvas-bac': CanvasBac,
    'loading': Loading
  }
}
</script>