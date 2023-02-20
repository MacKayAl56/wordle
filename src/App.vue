<script setup lang="ts">
import HelloWordle from './components/HelloWordle.vue'
</script>

<template>
  <h1>Wordle Clone</h1>
  <HelloWordle />
  <h2 id="report">Brief Report:</h2>
  <p style="width: 700px">In order to build the grid of letters in Vue3 we created a
    div containing 30 divs inside it. The 30 divs are created
    by using <code>v-for</code>. Then, in our <code>displayWord()</code> function, we
    displayed each letter first by using <code>.split()</code> to turn the guessed word
    into an array of letters. Then, we looped through each letter of the
    secret word and used <code>if</code> statements to check if each letter
    of the guessed word matched. At the same time, we
    displayed each letter in the divs, and added class names based on the
    accuracy of each letter. We also used <code>onBeforeMount</code> and <code>await</code> to import text files
    containing the official list of words and the list of valid words, which we used to validate input and
    get a random solution word (potential extra credit?).
  </p>
</template>

<style scoped>

</style>
