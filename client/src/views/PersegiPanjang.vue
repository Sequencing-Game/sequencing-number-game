<template>
<div class="container">
  <img src="../assets/usher.svg" alt="" style="height:30vh;">
  <div class="row">
    <h1 class="display-3 text-white"> {{ getName }}, are you okay? Try with rectangular numbers!</h1>
  </div><br>
      <p class="lead text-white">Hint: The numbers that can be arranged to form a rectangle, <span class="text-warning">n(n+1)</span>  <br>
          For example, <span class="text-warning">2</span> = 1(1+1), <span class="text-warning">6</span> = 2(2+1)
      </p>
  <div class="row">
    <form @submit.prevent="sendServer" >
      <h1>Input your next rectangular number</h1>
      <input id="number" v-model="number" type="number" class="form-control" placeholder="guess the next rectangular number!">
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
  name: 'PersegiPanjang',
  data () {
    return {
      number: null,
      input: [],
      n: 0,
      temp: 0
    }
  },
  methods: {
    sendServer () {
      if (this.n >= 90) {
        this.$router.push('/segitiga')
      } else {
        this.temp++
        this.n = (this.temp) * (this.temp + 1)
        if (+this.number === this.n) {
          this.$socket.emit('number', { name: this.getName, number: +this.number, n: +this.n, temp: +this.temp })
          this.input.push({ name: this.getName, number: +this.number })
          this.number = null
          this.$store.commit('addScore')
        } else {
          this.n = 0
          this.number = 0
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
      if (payload.n >= 90) {
        this.$router.push('/segitiga')
      } else {
        this.n = payload.n
        this.temp = payload.temp
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
