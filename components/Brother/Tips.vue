<template>
  <!-- 提示弹层 -->
  <transition name="Fade" mode="out-in">
    <div class="tips" v-show="Tips.Show">
      <div class="tipContent">{{ Tips.Title }}</div>
    </div>
  </transition>
</template>

<script>
export default {
  layout: "blog",
  name: "Tips",
  computed: {
    Tips() {
      return this.$store.state.Tips;
    },
  },
  watch: {
    Tips: function () {
      if (this.$store.state.Tips.Show) {
        setTimeout(() => {
          // 显示两秒后自动关闭
          this.Tips.Show = false;
        }, 2000);
      }
    },
  },
};
</script>

<style scoped lang="less">
@import "../../static/css/base";
.tips {
  position: fixed;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  text-align: center;
  color: @FontColorWhite;
  height: 3rem;
  line-height: 3rem;
  display: inline-block;
  text-align: center;
}
.tipContent {
  display: inline-block;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 0 1rem;
}
</style>
