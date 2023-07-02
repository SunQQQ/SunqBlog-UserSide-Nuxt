<template>
  <main-about/>
</template>

<script>
import mainAbout from '../components/Main/About.vue';

export default {
  name: 'IndexPage',
  layout: 'blog',
  components:{
    'brother-topbar': mainAbout
  }
}
</script>
