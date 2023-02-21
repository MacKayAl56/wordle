<script setup lang="ts">
import HelloWordle from './components/HelloWordle.vue'
import Keyboard from "./components/keyboard.vue";
</script>

<template>
  <HelloWordle />
  <br>
  <hr>
  <div class="center">
    <h2 id="report">Brief Report:</h2>
  </div>
  <div class="center">
    <p>In order to build the grid of letters in Vue3 we created a
    div containing 30 divs inside it. The 30 divs are created
    by using <code>v-for</code>. Then, in our <code>displayWord()</code> function, we
    displayed each letter first by using <code>.split()</code> to turn the guessed word
    into an array of letters. Then, we looped through each letter of the
    secret word and used <code>if</code> statements to check if each letter
    of the guessed word matched. At the same time, we
    displayed each letter in the divs, and added class names based on the
    accuracy of each letter.
  </p>
  </div>
  <div class="center">
  <p>
    We also used <code>onBeforeMount</code> and <code>await</code> to import text files
    containing the official list of words and the list of valid words, which we used to validate input and
    get a random solution word. The grid updates as you type - as long as you don't type too fast! The virtual keyboard
    is its own child component that is passed a dictionary of letters and their corresponding colors, which is used to
    change the style of the keys to match the letters on the grid.
  </p>
  </div>

  <br>
</template>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 150px;
  margin-right: 150px;
}

</style>
