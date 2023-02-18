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

function displaySecretWord(){
  const par = document.getElementById("answer");
  par.innerText = "The answer is: " + solutionWord.value;
}


function addOneWord(word: string) {
  // Add a word to the list of user words if it is valid, has 5 letters, and hasn't been guessed before
  if (validWords.value.includes(word) && word.length == 5 && userWords.value.includes(word) == false) {
    userWords.value.push(word)
  }
  //Clear input field
  const empty = "";
  var input = document.getElementById("guess");
  input.value = empty;
  // Display the word in the grid
  displayWord(word);
  
}

function newGame() {
  window.location.reload();
}

function displayWord(word: string) {
  // Display the word in the grid
  const letters = word.split('')
  for (let i = 0; i < letters.length; i++) {
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
  // Add 5 to lettersGuessed
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
  if(lettersGuessed.value == 30){
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

  <ul>
    <label for="guess">Next word: </label>
    <input type="text" id="guess" v-model="wordInput">
    <br>
    <button @click="addOneWord(wordInput)" class="button" id="submit">Submit</button>
    <button @click="newGame" class="button">New Game</button>
    <br>
    <button @click="displaySecretWord" class="button" >Tell me the answer!</button>
    <h2 id="answer"></h2>
    <h2 id="report">Brief Report:</h2>
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
    font-size: xx-large;
    padding-top: 10%;
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
    color: black;
  }

  .misplaced{
    background-color: yellow;
    color: black;
  }

  .wrong{
    background-color:gray;
    color: black;
  }


</style>
