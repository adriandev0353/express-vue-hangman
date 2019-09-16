<template>
  <div class="multiplayer">
    <h1>Multiplayer</h1>
    <b-button @click="clearServerData">Clear Server data</b-button>
  </div>
</template>

<script>
import axios from "axios";
import io from "socket.io-client";

export default {
  name: "multiplayer",
  data() {
    return {
      playerOne: "",
      playerOneGuesses: 6,
      playerTwo: "",
      playerTwoGuesses: 6,
      lobbyFull: false
    };
  },
  created() {
    this.socket = io("https://hangman-webapp.herokuapp.com");
  },
  mounted() {
    this.socket.emit("check", localStorage["user"]);
    this.socket.on("checkResponse", data => {
      console.log(data);
    });
  },
  methods: {
    clearServerData() {
      socket.emit("clear");
      console.log('data cleared');
    }
  }
};
</script>