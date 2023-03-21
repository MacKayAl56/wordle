<script setup lang="ts">
import {computed, ref, Ref} from "vue";
import Statistics from "./components/statistics.vue";
import store  from './components/store'

// get username from Vuex store
const username = computed(() => {
  return store.getters.getUsername
})
const displayUsername = computed(() => {
  return store.getters.getDisplayUsername
})
const userID = computed(() => {
  return store.getters.getUserID
})

let showModalStatistics: Ref<boolean> = ref(false)

function newGame() {
 window.location.reload();
}

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
      <button v-if="!username" @click="$router.push('/login')">Login</button>
      <button v-if="username" @click="showStatisticsModal">{{ displayUsername }}'s Stats</button>
      <button v-if="!username" @click="$router.push('/register')" >Register</button>
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
