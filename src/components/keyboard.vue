<template>
  <div id="keyboard-cont">
  <div class="first-row">
    <button class="keyboard-button">q</button>
    <button class="keyboard-button">w</button>
    <button class="keyboard-button">e</button>
    <button class="keyboard-button">r</button>
    <button class="keyboard-button">t</button>
    <button class="keyboard-button">y</button>
    <button class="keyboard-button">u</button>
    <button class="keyboard-button">i</button>
    <button class="keyboard-button">o</button>
    <button class="keyboard-button">p</button>
  </div>
  <div class="second-row">
    <button class="keyboard-button">a</button>
    <button class="keyboard-button">s</button>
    <button class="keyboard-button">d</button>
    <button class="keyboard-button">f</button>
    <button class="keyboard-button">g</button>
    <button class="keyboard-button">h</button>
    <button class="keyboard-button">j</button>
    <button class="keyboard-button">k</button>
    <button class="keyboard-button">l</button>
  </div>
  <div class="third-row">
    <button style="width: 5rem" class="keyboard-button">Del</button>
    <button class="keyboard-button">z</button>
    <button class="keyboard-button">x</button>
    <button class="keyboard-button">c</button>
    <button class="keyboard-button">v</button>
    <button class="keyboard-button">b</button>
    <button class="keyboard-button">n</button>
    <button class="keyboard-button">m</button>
    <button style="width: 5rem" class="keyboard-button">Enter</button>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Keyboard',
  props: {
    letterColors: {
      type: Object,
      required: true
    }
  },
  // Every time the letterColors prop changes shade the keyboard buttons accordingly
  watch: {
      letterColors: {
        handler: function (newVal, oldVal) {
          for (const letter in newVal) {
            shadeKeyBoard(letter, newVal[letter])
          }
        },
        deep: true
      }
    }
}

function shadeKeyBoard(letter, color) {
  for (const elem of document.getElementsByClassName("keyboard-button")) {
    if (elem.textContent === letter) {
      elem.style.backgroundColor = color
    }
  }
}

</script>

<style>
#keyboard-cont {
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#keyboard-cont div {
  display: flex;
}

.second-row {
  margin: 0.5rem 0;
}

.keyboard-button {
  font-weight: bold;
  border: 0;
  padding: 0;
  margin: 0 6px 0 0;
  height: 58px;
  width: 43px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
}

</style>