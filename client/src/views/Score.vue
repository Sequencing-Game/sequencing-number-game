<template>
<div style="background-color:#0a043c; height:100%; ">
  <div class="row">
    <div class="col-md-2">
      <!-- <img src="../assets/undraw_game_day_ucx9.svg"> -->
    </div>
    <div class="col-md-10">
      <div style="margin-top:20%">
        <h1 class="display-2 " style="color:white">Well Done!!! {{ name }}</h1>
        <h1 class="display-2 " style="color:white">Score: </h1>
        <h1 class="display-2 text-white ">{{ getScore }}</h1>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Score',
  data () {
    return {
      name: '',
      score: null
    }
  },
  computed: {
    getScore () {
      return this.$store.state.score
    },
    getName () {
      return this.$store.state.name
    }
  }
}
</script>

<style>

</style>
