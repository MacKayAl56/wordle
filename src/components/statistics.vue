<template>
  <div class="modal" @click="closeModal" v-show="showModalStatistic">
    <div class="container" >
      <a> date: </a>
      <a> time: </a>
      <a> score: </a>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";

export default defineComponent({
  props: {
    showModalStatistic: {
      type: Boolean as PropType<boolean>,
      required: true
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
  }
});
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  background-color: rgba(0, 0, 0, 0.9);
  padding: 65px;
  border-radius: 5px;
  margin-bottom: 400px;
}
</style>