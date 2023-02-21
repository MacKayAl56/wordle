<script setup lang="ts">
import {onBeforeMount, ref, Ref} from 'vue'

const userWords: Ref<string[]> = ref([])
const solutionWord: Ref<string[]> = ref([])
const validWords: Ref<string[]> = ref([])
const lettersGuessed: Ref<number> = ref(0)
const typedLetters: Ref<number> = ref(0)

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
    CheckForWin(word);
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
  lettersGuessed.value -= 5
  typedLetters.value = 0
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
}

function displayLetter(letter: string) {
  // only display the letter if it is in the alphabet, and we have not typed more than 5 letters
  if (letter.match(/[a-z]/i) && typedLetters.value < 5) {
    document.getElementsByClassName('box')[lettersGuessed.value].innerHTML = letter.toUpperCase();
    typedLetters.value += 1
    lettersGuessed.value += 1
  }
}

function removeLastLetter() {
  // Remove the last letter from the grid and decrement the counters
  document.getElementsByClassName('box')[lettersGuessed.value].innerHTML = "";
  if (typedLetters.value > 0) {
    typedLetters.value -= 1
    lettersGuessed.value -= 1
  }
}

function disableSubmit(){
    const submitButton = <HTMLButtonElement> document.getElementById("submit");
    submitButton.setAttribute("disabled","true");
}

function CheckForWin(word: string) {
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
  <div>
  <p>By: Kyle Smigelski and Alexandra MacKay</p>
  <div id="display" class="grid">
    <div class="box" v-for="index in 30"></div>
  </div>

  <div>
    <br>
    <input @keypress.enter="addOneWord(wordInput)"
           @keydown.delete="removeLastLetter()"
           @keydown.backspace="removeLastLetter()"
           @keyup="displayLetter($event.target.value.slice(-1))"
           type="text" id="guess" placeholder="Type your guess slowly and hit enter" v-model="wordInput">
<!--    <input @keypress.enter="addOneWord(wordInput)" type="text" id="guess" placeholder="Click enter to submit word" v-model="wordInput">-->
    <button @click="addOneWord(wordInput)" class="button button1" id="submit">Submit</button>
  </div>

  <div>
    <button @click="newGame" class="button">New Game</button>
    <button @click="displaySecretWord" class="button" >Tell me the answer!</button>
    <h2 id="answer"></h2>
  </div>

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
    width: 250px;
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
