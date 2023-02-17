<script setup lang="ts">
import {onBeforeMount, ref, Ref} from 'vue'

const userWords: Ref<string[]> = ref([])
const solutionWord: Ref<string[]> = ref([])
const validWords: Ref<string[]> = ref([])

// Load the list of solutions from the txt file and choose a random one
onBeforeMount( async () => {
  const response = await fetch('wordles.txt');
  const text = await response.text();
  const wordsArray = text.split('\n').filter(word => word.trim() !== '');
  const randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
  solutionWord.value.push(randomWord)
})

// Load the list of valid words from the txt file
onBeforeMount( async () => {
  const response = await fetch('guesses.txt');
  const text = await response.text();
  validWords.value = text.split('\n').filter(word => word.trim() !== '')
  console.log(validWords.value)
})

function addOneWord(word: string) {
  // Add a word to the list of user words if it is valid and has 5 letters
  if (validWords.value.includes(word) && word.length === 5) {
      userWords.value.push(word)
    }
}

function newGame() {
  window.location.reload();
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
  <p>{{ solutionWord }}</p>
  
  <div id="display" class="grid">
    <div class="box" v-for="index in 30"></div>
  </div>

  <ul>
    
    <label for="guess">Next word: </label>
    <input type="text" id="guess" v-model="wordInput">
    <button @click="addOneWord(wordInput)" class="button">Add Word</button>
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
