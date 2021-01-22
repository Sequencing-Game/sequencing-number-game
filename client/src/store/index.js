import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '',
    score: 0,
    finalScore: []
  },
  mutations: {
    insertName (state, payload) {
      state.name = payload
    },
    addScore (state) {
      state.score++
    },
    insertFinalScore (state, payload) {
      state.finalScore.push(payload)
    }

  },
  actions: {
    sendScore (context, payload) {
      this.$socket.emit('score', this.state.score)
    },
    sendFinalScore (context, payload) {
      context.commit('insertFinalScore', payload)
    }
  },
  modules: {
  }
})
