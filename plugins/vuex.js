import Vue from 'vue'
import Vuex from 'vuex'

import * as index from '@/store/index.js'

Vue.use(Vuex)

export default () => {
  return index
}
