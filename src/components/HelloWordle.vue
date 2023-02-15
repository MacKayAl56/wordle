<script setup lang="ts">
import { ref, Ref } from 'vue'
const gameName = ref("Wordle Clone")
const userWords: Ref<string[]> = ref([])


function addOneWord() {
  userWords.value.push("Hi")
}

function clearAll() {
  userWords.value.splice(0)
}

function newGame(){
  //Select secret random 5-letter word
  //If previous session of game is already running, clear the grid
}

function check(){
  //Check & display guess
  //Clear current word in input field
  //If the guess is correct or has reached six guesses, disable button
  //Display "Congratulations" if guess it correct
  //Display "Game over" if run out of guesses
}
</script>

<template>
  <p>By: Kyle Smigelski and Alexandra MacKay</p>
  
  <div id="display" class="grid">
    <div class="box" v-for="index in 30"></div>
  </div>

  <ul>
    
    <label for="guess">Next word: </label>
    <input type="text" id="guess">
    <br>
    <button @click="newGame" class="button">New Game</button>
    <button @click="check" class="button">Check</button>
    <li v-for="(w, pos) in userWords" v-bind:key="pos">{{ w }}</li>
  </ul>

</template>

<style scoped>
  .grid{
    display: inline-grid;
    grid-template-columns: repeat(5, 60px);
    grid-template-rows: repeat(6,60px);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
  }

  .box{
    outline-style: solid;
    outline-color: lightgray;
  }

  .button{
    outline-style: solid;
    outline-color: black;
    margin-top: 10px;
    margin-right: 20px;
    font-size: medium;
  }

  .perfect{
    background-color: green;
  }

  .misplaced{
    background-color: yellow;
  }

</style>
