<template>
  <div class="multiplayer">
    <b-container>
      <h1>Multiplayer</h1>
      <b-row>
        <b-col sm>
          <h2>{{playerOne}}</h2>
        </b-col>
        <b-col sm></b-col>
        <b-col sm>
          <div v-if="playerTwo === ''">
            <b-spinner label="Loading..."></b-spinner>
          </div>
          <h2 v-else>{{playerTwo}}</h2>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm></b-col>
        <b-col sm>
            <h5 v-if='!lobbyFull'>Waiting for opponent..</h5>
            <h5 v-else>Opponent found!</h5>
          <b-button @click="clearServerData">Clear Server data</b-button>
        </b-col>
        <b-col sm></b-col>
      </b-row>
    </b-container>
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
    this.socket.emit("check", localStorage["user"]);
    this.socket.on("checkResponse", data => {
      if (data.users.playerOne) {
        this.playerOne = data.users.playerOne;
      }
      if (data.users.playerTwo) {
        this.playerTwo = data.users.playerTwo;
      }
      if (data.players === 2) {
        this.lobbyFull = true;
      }
      console.log(data.playerOne);
    });
  },
  methods: {
    clearServerData() {
      this.socket.emit("clear");
      console.log("data cleared");
    }
  }
};
</script>