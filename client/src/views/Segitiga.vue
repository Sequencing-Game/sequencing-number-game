<template>
<div class="container">
  <img src="../assets/usher.svg" alt="" style="height:30vh;">
  <div class="row">
    <h1 class="display-3 text-white"> LAST STAGE! {{ getName }}, and the last boss is Tringular Numbers!</h1>
  </div><br>
      <p class="lead text-white">Hint: A number that can make a triangular dot pattern.  <br>
          For example, 1, 3, and 6 are triangular numbers.
      </p>
  <div class="row">
    <form @submit.prevent="sendServer" >
      <h1>Input your next tringular number</h1>
      <input id="number" v-model="number" type="number" class="form-control" placeholder="guess the next tringular number!">
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
  name: 'Segitiga',
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
      if (this.n >= 55) {
        this.$router.push('/score')
      } else {
        this.temp++
        this.n = (0.5) * (this.temp) * (this.temp + 1)
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
    },
    check () {
      if (this.n >= 55) {
        this.$router.push('/score')
      }
    }
  },
  sockets: {
    inputBaru (payload) {
      this.input.push(payload)
      if (payload.n >= 55) {
        this.$router.push('/score')
      } else {
        this.n = payload.n
        this.temp = payload.temp
      }
    }
  },
  created () {
    this.check()
  },
  computed: {
    getName () {
      return this.$store.state.name
    },
    getScore () {
      return this.$store.state.score
    },
    getFinalScore () {
      return this.$store.state.finalScore
    }
  }
}
</script>

<style scoped>

</style>
