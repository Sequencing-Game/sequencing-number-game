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
  name: 'PersegiPanjang',
  data () {
    return {
      number: null,
      input: [],
      n: 2,
      temp: 1
    }
  },
  methods: {
    sendServer () {
      this.temp++
      this.n = (this.temp) * (this.temp + 1)
      if (+this.number === this.n) {
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
