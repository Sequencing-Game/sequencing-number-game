<template>
<div class="container">
  <img src="../assets/usher.svg" alt="" style="height:30vh;">
  <div class="row">
    <h1 class="display-3 text-white">Hey there, {{ getName }} !</h1>
  </div><br>
  <div class="row">
    <form @submit.prevent="sendServer" >
      <h1>Set your number here</h1>
      <input id="number" v-model="number" type="number" class="form-control" placeholder="guess the next number faster!">
    </form>
  </div><br>
  <div class="bg-white rounded shadow container m-10" style="display:flex; flex-wrap:wrap; width:100%; overflow-y: scroll; height:500px;">
    <div class="alert alert-warning" role="alert" v-for="(item, idx) in input" :key="idx" style="width:20%;">
      <img :src="image_src" alt="" style="width:40%">
      <h1>{{ item.name }}: {{ item.number }}</h1>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Game',
  data () {
    return {
      number: null,
      input: [],
      n: 1,
      image_src: ''
    }
  },
  methods: {
    sendServer () {
      this.n++
      if (+this.number === this.n) {
        this.$socket.emit('number', { name: this.getName, number: this.number })
        this.input.push({ name: this.getName, number: this.number })
        this.number = null
        this.$store.commit('addScore')
      } else {
        this.n = 1
        this.number = 1
        this.$socket.emit('number', { name: this.getName, number: this.number })
        this.input.push({ name: this.getName, number: this.number })
        this.number = null
      }
    },
    generateAvatar () {
      this.image_src = `https://avatars.dicebear.com/api/avataaars/${this.getName}.svg`
    }
  },
  sockets: {
    inputBaru (payload) {
      console.log(payload)
      this.input.push(payload)
    }
  },
  created () {
    this.generateAvatar()
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
