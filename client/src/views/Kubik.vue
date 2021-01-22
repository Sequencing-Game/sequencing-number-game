<template>
<div class="container">
  <img src="../assets/usher.svg" alt="" style="height:30vh;">
  <div class="row">
    <h1 class="display-3 text-white">It's getting harder {{ getName }}, now Cube Numbers!</h1>
  </div><br>
  <div class="row">
      <p class="lead text-white">Hint: A cube number is the result when a number has been multiplied by itself twice. <br>
          For example, <span class="text-warning">8</span> = 2 x 2 x 2 (2 multiplied by itself twice); <span class="text-warning">27</span> = 3 x 3 x 3, and so on.
      </p>
    <form @submit.prevent="sendServer" >
      <h1>Input your next cube number</h1>
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
  name: 'Kubik',
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
      if (this.n >= 1000) {
        this.$router.push('/persegiPanjang')
      } else {
        this.temp++
        this.n = Math.pow(this.temp, 3)
        if (+this.number === this.n) {
          this.$socket.emit('number', { name: this.getName, number: +this.number, n: +this.n, temp: +this.temp })
          this.input.push({ name: this.getName, number: +this.number })
          this.number = null
          this.$store.commit('addScore')
        } else {
          this.n = 1
          this.number = 1
          this.temp = 1
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
      if (payload.n >= 1000) {
        this.$router.push('/persegiPanjang')
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
