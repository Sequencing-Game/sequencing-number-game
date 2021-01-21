<template>
<div class="container">
  <div id="welcome" class="box bg-white p-10 text-center rounded shadow">
    <h1 class="text-2xl mb-3">Hello to this fun game with numbers</h1>
    <p>You can play this, if you want. Ok?</p>
    <p>Just enter your name below:</p>
    <form @submit.prevent="play" id="form" class="mt-4">
      <input v-model="name" id="name" class="border px-4 py-2" type="text" placeholder="Name..."/>
      <button class="border border-blue-600 bg-blue-600 text-white px-4 py-2">Submit</button>
    </form>
    <!-- <Game :name="getName"/> -->
  </div>
</div>

</template>

<script>
// @ is an alias to /src
// import Game from './Game'

export default {
  name: 'Home',
  data () {
    return {
      name: ''
    }
  },
  methods: {
    play () {
      this.$store.commit('insertName', this.name)
      this.$router.push('/game')
    }
  },
  sockets: {
    init (payload) {
      console.log(payload)
    }
  }
}
</script>

<style scoped>
.container {
  /* background-color: blue; */
  height: 100px;
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 300px;
}

</style>
