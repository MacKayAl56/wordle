<script setup lang="ts">
import {onMounted, ref, Ref} from "vue";
import { emitter } from "./components/emitter";
import Statistics from "./components/statistics.vue";

let userDisplay = ref('')
let userID = ref('')
let showModalStatistics: Ref<boolean> = ref(false)

function newGame() {
 window.location.reload();
}

// listen for updateUsername emitted from login.vue
onMounted(() => {
  emitter.on('username', (data: unknown) => {
    userDisplay.value = data as string
  })
  emitter.on('userid', (data: unknown) => {
    userID.value = data as string
  })
})

function showStatisticsModal() {
  showModalStatistics.value = true
}

</script>

<template>
  <nav class="navbar">
    <div class="navbar-left">
      <button @click="newGame">New Game</button>

      <div v-show="showModalStatistics" @close="showModalStatistics = false;" >
        <statistics :user-id="userID" :show-modal-statistic="showModalStatistics" @close="showModalStatistics = false"></statistics>
      </div>
    </div>


    <div class="navbar-center">
      <h1>Wordle Clone</h1>
    </div>
    <div class="navbar-right">
      <button v-if="!userDisplay" @click="$router.push('/login')">Login</button>
      <button v-if="userDisplay" @click="showStatisticsModal">{{ userDisplay }}'s Stats</button>
      <button v-if="!userDisplay" @click="$router.push('/register')" >Register</button>
    </div>
  </nav>
  <router-view />
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  border-bottom: #3a3a3c 1px solid;
  margin-bottom: 50px;
}
.navbar-center{
  margin-left: 70px;
  font-family: Anton,serif;
  font-size: 0.8rem;
  justify-content: center;
  align-items: center;
  display: flex;
}
button:hover {
  text-decoration: none;
  background-color: #538d4e;
}
.navbar-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
h5 {
  margin-right: 25px;
}
button {
  margin-right: 15px;
}

</style>
