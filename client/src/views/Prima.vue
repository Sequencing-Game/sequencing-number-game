<template>
<div class="container">
  <img src="../assets/usher.svg" alt="" style="height:30vh;">
  <div class="row">
    <h1 class="display-3 text-white"> {{ getName }}, Try with Prime Numbers!</h1>
  </div><br>
      <p class="lead text-white">Hint: numbers that have only 2 factors: (1 and themselves).  <br>
          For example, the first 5 prime numbers are <span class="text-warning"> 2, 3, and 5.</span>
      </p>
  <div class="row">
    <form @submit.prevent="sendServer" >
      <h1>Input your next prime number</h1>
      <input id="number" v-model="number" type="number" class="form-control" placeholder="guess the next prime number!">
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
  name: 'Prima',
  data () {
    return {
      number: null,
      input: [],
      n: 0,
      temp: -1,
      primes: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]
    }
  },
  methods: {
    sendServer () {
      if (this.primes[this.temp] >= 31) {
        this.$router.push('/persegi')
      } else {
        this.temp++
        if (+this.number === this.primes[this.temp]) {
          this.$socket.emit('number', { name: this.getName, number: +this.number, n: +this.n, temp: +this.temp })
          this.input.push({ name: this.getName, number: +this.number })
          this.number = null
          this.$store.commit('addScore')
        } else {
          this.n = 0
          this.number = 2
          this.temp = 0
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
      this.temp = payload.temp
      if (this.primes[this.temp] >= 31) {
        this.$router.push('/persegi')
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
