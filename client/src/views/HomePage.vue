<template>
<div style="background-color:#0a043c; height:100%; ">
  <div class="row">
    <div class="col-md-6">
      <img src="../assets/undraw_game_day_ucx9.svg">
    </div>
    <div class="col-md-6">
      <div style="margin-top:20%">
        <h1 class="display-2 " style="color:white">Sequencing</h1>
        <h1 class="display-2 " style="color:white">Number</h1>
        <h1 class="display-2" style="color:white">Together</h1>
        <form @submit.prevent="play" id="form" class="mt-4">
          <input v-model="name" id="name" class="border px-4 py-2" type="text" placeholder="Your name..."/>
          <button class="border border-blue-600 bg-blue-600 text-black px-4 py-2">Submit</button>
        </form><br>
        <ModalRule/>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import ModalRule from '../components/ModalRule.vue'
import Swal from 'sweetalert2'

export default {
  name: 'Home',
  data () {
    return {
      name: ''
    }
  },
  components: {
    ModalRule
  },
  methods: {
    play () {
      this.$store.commit('insertName', this.name)
      let timerInterval
      Swal.fire({
        title: 'Preparing the game....',
        html: 'Please Wait! It will start in <b></b> milliseconds.',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          timerInterval = setInterval(() => {
            const content = Swal.getContent()
            if (content) {
              const b = content.querySelector('b')
              if (b) {
                b.textContent = Swal.getTimerLeft()
              }
            }
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('I was closed by the timer')
        }
      })
      this.$router.push('/game')
    }
  }
}
</script>

<style scoped>

</style>
