import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    formId: 0
  },
  mutations: {
    increment (state) {
      state.formId++
    }
  }
})

export default store