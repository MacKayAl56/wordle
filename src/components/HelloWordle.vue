<script setup lang="ts">
import {onBeforeMount, ref, Ref} from 'vue'

const userWords: Ref<string[]> = ref([])
const solutionWord: Ref<string[]> = ref([])
const validWords: Ref<string[]> = ref([])
const lettersGuessed: Ref<number> = ref(0)

// Load the list of solutions from the txt file and choose a random one
onBeforeMount( async () => {
  const response = await fetch('wordles.txt');
  const text = await response.text();
  const wordsArray = text.split('\n').filter(word => word.trim() !== '');
  const randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
  solutionWord.value.push(randomWord)
  console.log(solutionWord.value)
})

// Load the list of valid words from the txt file
onBeforeMount( async () => {
  const response = await fetch('guesses.txt');
  const text = await response.text();
  validWords.value = text.split('\n').filter(word => word.trim() !== '')
})

function addOneWord(word: string) {
  // Add a word to the list of user words if it is valid, has 5 letters, and hasn't been guessed before
  if (validWords.value.includes(word) && word.length === 5 && !userWords.value.includes(word)) {
    userWords.value.push(word)
  }
  // Display the word in the grid
  displayWord(word)
  // Add 5 to lettersGuessed
  lettersGuessed.value += 5
}

function newGame() {
  window.location.reload();
}
function displayWord(word: string) {
  // Display the word in the grid
  const letters = word.split('')
  for (let i = 0; i < letters.length; i++) {
    // if letter is in the solution word at the same position, add class "perfect"
    if (solutionWord.value[0].charAt(i) === letters[i]) {
      document.getElementsByClassName('box')[lettersGuessed.value + i].classList.add('perfect')
    }
    // if letter is in the solution word at a different position, add class "misplaced"
    else if (solutionWord.value[0].includes(letters[i])) {
      document.getElementsByClassName('box')[lettersGuessed.value + i].classList.add('misplaced')
    }
    // if letter is not in the solution word, add class "wrong"
    else {
      document.getElementsByClassName('box')[lettersGuessed.value + i].classList.add('wrong')
    }
  }
  CheckForWin(word)
}

function CheckForWin(word: string) {
  // Check if the latest word is the same as the solution word
  if (solutionWord.value.includes(word)) {
    alert('You win!')
  }
}

</script>

<template>
  <p>By: Kyle Smigelski and Alexandra MacKay</p>
  <div id="display" class="grid">
    <div class="box" v-for="index in 30"></div>
  </div>

  <ul>
    <label for="guess">Next word: </label>
    <input type="text" id="guess" v-model="wordInput">
    <button @click="addOneWord(wordInput)" class="button">Submit</button>
    <br>
    <button @click="newGame" class="button">New Game</button>
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
    font-size: large;
    text-align: center;
    color: black;
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

  .wrong{
    background-color: transparent;
  }


</style>
