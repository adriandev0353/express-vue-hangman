<template>
  <div class="multiplayer">
    <h1>Multiplayer</h1>
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
    this.socket.on('checkResponse', data => {
        console.log(data);
    });
  }
};
</script>