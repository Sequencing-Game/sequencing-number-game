<template>
<div>
 <div v-if="showModal">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Game Rule </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true" @click="showModal = false">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                  <p class="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti possimus error architecto ipsam deserunt fugiat excepturi suscipit tempore impedit in ullam optio inventore, reprehenderit officia soluta. Exercitationem quia adipisci architecto.</p>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
  <button type="button" class="btn btn-lg btn-success" @click="showModal = true">RULE</button>
</div>
</template>

<script>
export default {
  name: 'ModalRule',
  data () {
    return {
      showModal: false,
      inputBacklog: ''
    }
  },
  methods: {

  }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>
