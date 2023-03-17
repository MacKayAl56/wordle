<template>
  <div class="modal" @click="closeModal" v-show="showModal">
<!--    Use a separate Vue component to show the past game statistics (retrieved from Firestore). Add a few basic functionalities to this page:

    Sort by date/time (most recent first)
    Sort by game duration
    Sort by the number of attempts to guess the secret word
    Show a histogram of the number of attempts. Look for third party libraries to show 2D charts.-->


  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  methods: {
    closeModal() {
      this.$emit('close');
    },
  }
});
</script>

<style scoped>

</style>