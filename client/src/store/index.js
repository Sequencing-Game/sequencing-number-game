import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '',
    score: 0
  },
  mutations: {
    insertName (state, payload) {
      state.name = payload
    },
    addScore (state) {
      state.score++
    }
  },
  actions: {
    sendScore (context, payload) {
      this.$socket.emit('score', state.score)
    }
  },
  modules: {
  }
})
