import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: ''
  },
  mutations: {
    insertName (state, payload) {
      state.name = payload
    }

  },
  actions: {
  },
  modules: {
  }
})
