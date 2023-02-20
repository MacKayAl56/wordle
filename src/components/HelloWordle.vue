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

  // Choose a random word from the list and add it to solutionWord
  const randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
  solutionWord.value.push(randomWord)
  console.log(solutionWord.value)
})

// Load the list of valid words from the txt file
onBeforeMount( async () => {
  const response = await fetch('guesses.txt');
  const text = await response.text();
  const wordsArray = text.split('\n');
  validWords.value = wordsArray
})

// Display the secret word when the user clicks the button
function displaySecretWord(){
  const par = document.getElementById("answer");
  par.innerText = "The answer is: " + solutionWord.value;
}


function addOneWord(word: string) {
  // Add a word to the list of user words if it is valid, has 5 letters, and hasn't been guessed before
  if (word.length == 5 && !userWords.value.includes(word) && validWords.value.includes(word)) {
    userWords.value.push(word)
    displayWord(word);
  }
  else {
    console.log(validWords.value)
    alert('Invalid word. Please try again.')
  }
  //Clear input field
  const empty = "";
  var input = document.getElementById("guess");
  input.value = empty;
}

function newGame() {
  window.location.reload();
}

function displayWord(word: string) {
  const letters = word.split('')
  for (let i = 0; i < letters.length; i++) {

    // Display the word in the grid
    document.getElementsByClassName('box')[lettersGuessed.value + i].innerHTML = letters[i].toUpperCase();

    // if letter is in the solution word at the same position, add class "perfect"
    if (solutionWord.value[0].charAt(i) === letters[i]) {
      document.getElementsByClassName('box')[lettersGuessed.value + i].classList.add('perfect')
    }
    // if letter is in the solution word at a different position, add class "misplaced"
    else if (solutionWord.value[0].includes(letters[i])) {
      document.getElementsByClassName('box')[lettersGuessed.value + i].classList.add('misplaced')
    }
    // if letter is not in the solution word, add class "wrong" and make letter appear
    else {
      document.getElementsByClassName('box')[lettersGuessed.value + i].classList.add('wrong')
    }
  }
  // Add 5 to lettersGuessed to move to the next row
  lettersGuessed.value += 5
  CheckForWin(word)
}

function disableSubmit(){
    const submitButton = <HTMLButtonElement> document.getElementById("submit");
    submitButton.setAttribute("disabled","true");
}

function CheckForWin(word: string) {
  const stringSolution=solutionWord.value.join("");
  // Check if the latest word is the same as the solution word
  if (solutionWord.value.join() === (word)) {
    alert('Congratulations, you win!');
    disableSubmit();
  }
  // If the user has guessed 6 words, they lose
  else if(lettersGuessed.value == 30){
    alert('You lose. The answer was: '+ solutionWord.value);
    disableSubmit();
    newGame();
  }
}

</script>

<template>
  <p>By: Kyle Smigelski and Alexandra MacKay</p>
  <div id="display" class="grid">
    <div class="box" v-for="index in 30"></div>
  </div>

  <div>
    <br>
    <input @keypress.enter="addOneWord(wordInput)" type="text" id="guess" placeholder="Click enter to submit word" v-model="wordInput">
    <button @click="addOneWord(wordInput)" class="button button1" id="submit">Submit</button>
  </div>

  <div>
    <button @click="newGame" class="button">New Game</button>
    <br>
    <button @click="displaySecretWord" class="button" >Tell me the answer!</button>
    <h2 id="answer"></h2>
  </div>

</template>

<style scoped>
  .grid{
    display: inline-grid;
    grid-template-columns: repeat(5, 60px);
    grid-template-rows: repeat(6,60px);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
  }

  input[type=text] {
    padding:10px;
    border:0;
    background-color: gray;
    border-radius:10px;
    margin-right: 10px;
    box-shadow:0 0 5px 2px rgba(255, 255, 255, 0.2);
  }
  ::placeholder {
    color: white;
  }

  .box{
    outline: #3A3A3C solid 2px;
    font-size: 32px;
    padding-top: 10%;
    font-weight: bold;
    font-family: Arial, sans-serif;
  }

  .button{
    outline-style: solid;
    outline-color: black;
    margin-top: 10px;
    margin-right: 20px;
    font-size: medium;
  }

  .perfect{
    background-color: #538d4e;
    color: white;
    outline-color: #538d4e;
  }

  .misplaced{
    background-color: #b59f3b;
    color: white;
    outline-color: #b59f3b;
  }

  .wrong{
    background-color:#3A3A3C;
    color: white;
    outline-color: #3A3A3C;
  }


</style>
