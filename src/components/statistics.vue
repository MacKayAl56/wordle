<template>
  <div class="modal" @click="closeModal">
    <div class = "container">
      <h2>Your Game History:<br></h2>
    <table>
      <tr>
        <th>Game</th>
        <th>Date</th>
        <th>Secret word</th>
        <th>Total Time</th>
        <th>Result</th>
      </tr>
      <tr v-for="(document, index) in gameStatistics" :key="index">
        <td>{{ index }}</td>
        <td>{{ document.date }}</td>
        <td>{{ document.secretWord }}</td>
        <td>{{ document.time }}</td>
        <td>{{document.gameResult}}</td>
      </tr>
    </table>
    </div>
  </div>
</template>

<script lang="ts">
import {ref, Ref, defineComponent, PropType,ComponentInternalInstance, onMounted, SetupContext} from "vue";
import{ DocumentReference, DocumentSnapshot, CollectionReference, QueryDocumentSnapshot, QuerySnapshot, collection, getDocs, query, where, doc, getDoc} from "firebase/firestore"
// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import {getFirestore, Firestore} from "@firebase/firestore";
import { getAnalytics } from "@firebase/analytics";
import { getAuth, connectAuthEmulator, signInWithEmailAndPassword, UserCredential } from '@firebase/auth';
import { connect } from 'http2';
import { emitter } from "./emitter";
import  userID  from "./HelloWordle.vue"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQm1cPSv2TByJ7qmwTuRWMPhNj6aKZl7Y",
  authDomain: "wordle-5db5b.firebaseapp.com",
  projectId: "wordle-5db5b",
  storageBucket: "wordle-5db5b.appspot.com",
  messagingSenderId: "835958338222",
  appId: "1:835958338222:web:16ad75f9dcf40ad0f9733f",
  measurementId: "G-84HV2KBLWL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db:Firestore = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const gameStatistics: any[] = [];
const querySnapshot = await getDocs(collection(db, "gameStatistics"));
const userId = ref('')

export default defineComponent({
  name: 'Statistics',
  props: {
    showModalStatistic: {
      type: Boolean as PropType<boolean>,
      required: true
    },
    userID: {
      type: String as PropType<string>,
      required: true
    }
  },
  data() {
    return {
      gameStatistics: gameStatistics,
    };
  },
  setup() {
  onMounted(() => {
      emitter.on('userid', (data: unknown) => {
        userID.value = data as string
        console.log(data)
      })

       querySnapshot.forEach((doc) => {
         // doc.data() is never undefined for query doc snapshots
         if (doc.data().userID === userID.value) {
          gameStatistics.push(doc.data());
         }
         
        })
  });
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    goHome() {
      this.$router.push("/");
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