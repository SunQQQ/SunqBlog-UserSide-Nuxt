import Vue from 'vue'
import Vuex from 'vuex'
import VueParticles from 'vue-particles'; // 离子动画背景

import * as index from '@/store/index.js'

Vue.use(Vuex);
Vue.use(VueParticles);

export default () => {
  return index
}
