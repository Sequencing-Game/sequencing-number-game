<template>
<div class="game">
  <form @submit.prevent="sendServer">
    <input v-model="number" type="number">
    <h1>{{ getName }}</h1>
  </form>
  <p v-for="(item, idx) in input" :key="idx">{{ item.name }}: {{ item.number }}</p>
</div>
</template>

<script>
export default {
  name: 'Genap',
  data () {
    return {
      number: null,
      input: [],
      n: 0
    }
  },
  methods: {
    sendServer () {
      this.n = this.n + 2
      if (+this.number === this.n) {
        this.$socket.emit('number', { name: this.getName, number: this.number })
        this.input.push({ name: this.getName, number: this.number })
        this.number = null
        this.$store.commit('addScore')
      } else {
        this.n = 0
        this.number = 0
        this.$socket.emit('number', { name: this.getName, number: this.number })
        this.input.push({ name: this.getName, number: this.number })
        this.number = null
      }
    }
  },
  sockets: {
    inputBaru (payload) {
      console.log(payload)
      this.input.push(payload)
    }
  },
  computed: {
    getName () {
      return this.$store.state.name
    }
  }
}
</script>

<style scoped>
.container {
  background-color: blue;
  height: 100px;
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 300px;
}

.container .box {
  background-color: silver
}

</style>
