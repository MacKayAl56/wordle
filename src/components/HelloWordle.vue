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
  //Check guess
  //Clear current word in input field
  //If the guess is correct or has reached six guesses, disable button
  //Display "Congratulations" if guess it correct
  //Display "Game over" if run out of guesses
}
</script>

<template>
  <p>By: Kyle Smigelski and Alexandra MacKay</p>
  
  <div class="grid">
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
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

  .div1 { grid-area: 1 / 1 / 2 / 2; }
  .div2 { grid-area: 1 / 2 / 2 / 3; }
  .div3 { grid-area: 1 / 3 / 2 / 4; }
  .div4 { grid-area: 1 / 4 / 2 / 5; }
  .div5 { grid-area: 1 / 5 / 2 / 6; }
  .div6 { grid-area: 2 / 1 / 3 / 2; }
  .div7 { grid-area: 2 / 2 / 3 / 3; }
  .div8 { grid-area: 2 / 3 / 3 / 4; }
  .div9 { grid-area: 2 / 4 / 3 / 5; }
  .div10 { grid-area: 2 / 5 / 3 / 6; }
  .div11 { grid-area: 3 / 1 / 4 / 2; }
  .div12 { grid-area: 3 / 2 / 4 / 3; }
  .div13 { grid-area: 3 / 3 / 4 / 4; }
  .div14 { grid-area: 3 / 4 / 4 / 5; }
  .div15 { grid-area: 3 / 5 / 4 / 6; }
  .div16 { grid-area: 4 / 1 / 5 / 2; }
  .div17 { grid-area: 4 / 2 / 5 / 3; }
  .div18 { grid-area: 4 / 3 / 5 / 4; }
  .div19 { grid-area: 4 / 4 / 5 / 5; }
  .div20 { grid-area: 4 / 5 / 5 / 6; }
  .div21 { grid-area: 5 / 1 / 6 / 2; }
  .div22 { grid-area: 5 / 2 / 6 / 3; }
  .div23 { grid-area: 5 / 3 / 6 / 4; }
  .div24 { grid-area: 5 / 4 / 6 / 5; }
  .div25 { grid-area: 5 / 5 / 6 / 6; }
  .div26 { grid-area: 6 / 1 / 7 / 2; }
  .div27 { grid-area: 6 / 2 / 7 / 3; }
  .div28 { grid-area: 6 / 3 / 7 / 4; }
  .div29 { grid-area: 6 / 4 / 7 / 5; }
  .div30 { grid-area: 6 / 5 / 7 / 6; }
</style>
