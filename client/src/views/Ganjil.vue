<template>
<div class="container">
  <img src="../assets/usher.svg" alt="" style="height:30vh;">
  <div class="row">
    <h1 class="display-3 text-white">{{ getName }}, It's level 3! Odd Number!</h1>
  </div><br>
  <div class="row">
    <form @submit.prevent="sendServer" >
      <h1>Set your odd number here</h1>
      <input id="number" v-model="number" type="number" class="form-control" placeholder="guess the next odd number!">
    </form>
  </div><br>
  <div class="bg-white rounded shadow container m-10" style="display:flex; flex-wrap:wrap; width:100%; overflow-y: scroll; height:500px;">
    <div class="alert alert-warning" role="alert" v-for="(item, idx) in input" :key="idx" style="width:20%;">
      <img :src="`https://avatars.dicebear.com/api/avataaars/${item.name}.svg`" alt="" style="width:40%">
      <h1>{{ item.name }}: {{ item.number }}</h1>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Ganjil',
  data () {
    return {
      number: null,
      input: [],
      n: 1
    }
  },
  methods: {
    sendServer () {
      if (this.n >= 19) {
        this.$router.push('/prima')
      } else {
        this.n = this.n + 2
        if (+this.number === this.n) {
          this.$socket.emit('number', { name: this.getName, number: +this.number, n: +this.n, temp: +this.temp })
          this.input.push({ name: this.getName, number: +this.number })
          this.number = null
          this.$store.commit('addScore')
        } else {
          this.n = 1
          this.number = 1
          this.$socket.emit('number', { name: this.getName, number: +this.number, n: +this.n, temp: +this.temp })
          this.input.push({ name: this.getName, number: +this.number })
          this.number = null
        }
      }
    }
  },
  sockets: {
    inputBaru (payload) {
      console.log(payload)
      this.input.push(payload)
      if (payload.n >= 19) {
        this.$router.push('/prima')
      } else {
        this.n = payload.n
      }
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
</style>
