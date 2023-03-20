<template>
  <div class="modal">
    <form >
      <h2>Log in </h2>
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit" @click="loginEmailPassword">Submit</button>
      <button type="submit" @click="goHome">Cancel</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { emitter } from './emitter';

// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import {getFirestore, Firestore} from "@firebase/firestore";
import { getAnalytics } from "@firebase/analytics";
import { getAuth, connectAuthEmulator, signInWithEmailAndPassword, UserCredential } from '@firebase/auth';
import { connect } from 'http2';
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
//connectAuthEmulator(auth,"http:localhost:5173");

export default defineComponent({
  name: 'LoginModal',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    goHome() {
      this.$router.push({ name: 'Home' });
    },

    // login with email and password using firebase
    async loginEmailPassword(event: Event) {
      event.preventDefault();
      try {
        const userCredential: UserCredential = await signInWithEmailAndPassword(auth, this.username, this.password);
        // emit event to update username
        emitter.emit('username', userCredential.user?.email);
        emitter.emit('updateUserID', userCredential.user?.uid);
        console.log(userCredential.user?.email);
        // go to home page
        this.goHome();
      } catch (error) {
        console.error(error);
        // Handle login error
      }
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
  background-color: rgba(0, 0, 0, 0.6);
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

button[type="submit"],
button[type="button"] {
  display: block;
  margin-top: 10px;
  padding: 5px;
  border-radius: 3px;
}

button[type="submit"] {
  background-color: #4CAF50;
  color: white;
}

button[type="submit"]:hover {
  background-color: #3e8e41;
}

button[type="button"] {
  background-color: #f44336;
  color: white;
}

button[type="button"]:hover {
  background-color: #da190b;
}
</style>