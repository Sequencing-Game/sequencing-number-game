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
  name: 'Prima',
  data () {
    return {
      number: null,
      input: [],
      n: 2,
      temp: 0,
      primes: [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97]
    }
  },
  methods: {
    sendServer () {
      this.temp++
      if (+this.number === this.primes[this.temp]) {
        this.$socket.emit('number', { name: this.getName, number: this.number })
        this.input.push({ name: this.getName, number: this.number })
        this.number = null
        this.$store.commit('addScore')
      } else {
        this.n = 2
        this.number = 2
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
