<template>
  <div class="modal" @click="closeModal" v-show="showModalStatistic">
    <form @click.stop @submit.prevent>
    <h2>Game history for user: {{ userId }}</h2>
    <div class="form-" v-for="index in 2">
      <a><b> Game: {{ index }}</b></a>
      <br>
      <a> Date: </a>
      <br>
      <a> Total time: </a>
      <br>
      <a> Result: </a>
      
    </div>
  </form>
      
<!--    Use a separate Vue component to show the past game statistics (retrieved from Firestore). Add a few basic functionalities to this page:

    Sort by date/time (most recent first)
    Sort by game duration
    Sort by the number of attempts to guess the secret word
    Show a histogram of the number of attempts. Look for third party libraries to show 2D charts.-->


  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";

export default defineComponent({
  props: {
    showModalStatistic: {
      type: Boolean as PropType<boolean>,
      required: true
    },
    userId: {
      type: String as PropType<string>,
      required: true
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    getUserDocs(){
      const db = getFirestore()
      const gameStatistics:CollectionReference = collection(db,"gameStatistics")
      const qry = query(gameStatistics, where("userID","==", userId.value))
      getDocs(qry)
        .then((myQueryRes: QuerySnapshot)=>{
          myQueryRes.forEach((myDoc:QueryDocumentSnapshot)=>{
            const data = myDoc.data();
            numGames ++;
            games.push(data);
          })
          
        });
      
    },
    displayDoc(){

    }
  }
});
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

form {
  background-color: rgba(0, 0, 0, 0.9);
  padding: 65px;
  border-radius: 5px;
  margin-bottom: 400px;
}

h2 {
  margin-top: 0;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}


button[type="button"]:hover {
  background-color: #da190b;
}

.container {
  background-color: rgba(0, 0, 0, 0.9);
  padding: 65px;
  border-radius: 5px;
  margin-bottom: 400px;
}
</style>