<template>
  <div class="multiplayer">
    <b-container>
      <h1>Multiplayer</h1>
      <b-row>
        <b-col sm>
          <h2>{{playerOne}}</h2>
        </b-col>
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
          <h5 v-if="!lobbyFull">Waiting for opponent..</h5>
        </b-col>
        <b-col sm></b-col>
      </b-row>
      <b-row v-if="lobbyFull">
        <b-col class="playGround" sm>
          <b-row>
            <b-col sm></b-col>
            <b-col sm>
              <div style="margin-top:5px; margin-left:50px">
                <div v-if="playerTwoGuesses<=6" class="rope"></div>
                <div v-if="playerTwoGuesses<=5" class="head"></div>
                <div v-if="playerTwoGuesses<=4" class="body"></div>
                <div v-if="playerTwoGuesses<=3" class="arm1"></div>
                <div v-if="playerTwoGuesses<=2" class="arm2"></div>
                <div v-if="playerTwoGuesses<=1" class="leg1"></div>
                <div v-if="playerTwoGuesses<=0" class="leg2"></div>
                <div v-if="playerTwoGuesses<=6" class="crossBeam"></div>
                <div v-if="playerTwoGuesses<=6" class="pole"></div>
                <div class="base"></div>
              </div>
              <div v-if ='localStorage["user"] === playerTwo'>
                <b-button
                  @click="letterCheck(letter.letter)"
                  class="letter"
                  variant="light"
                  :key="index"
                  v-for="(letter, index) of alphabet"
                  :disabled="isDisabled(index)"
                >{{ letter.letter }}</b-button>
              </div>
            </b-col>
            <b-col sm></b-col>
          </b-row>
        </b-col>
        <b-col class="playGround" sm>
          <b-row>
            <b-col sm></b-col>
            <b-col sm>
              <div style="margin-top:5px; margin-left:50px">
                <div v-if="playerTwoGuesses<=6" class="rope"></div>
                <div v-if="playerTwoGuesses<=5" class="head"></div>
                <div v-if="playerTwoGuesses<=4" class="body"></div>
                <div v-if="playerTwoGuesses<=3" class="arm1"></div>
                <div v-if="playerTwoGuesses<=2" class="arm2"></div>
                <div v-if="playerTwoGuesses<=1" class="leg1"></div>
                <div v-if="playerTwoGuesses<=0" class="leg2"></div>
                <div v-if="playerTwoGuesses<=6" class="crossBeam"></div>
                <div v-if="playerTwoGuesses<=6" class="pole"></div>
                <div class="base"></div>
              </div>
              <div v-if='localStorage["user"] === playerTwo'>
                <b-button
                  @click="letterCheck(letter.letter)"
                  class="letter"
                  variant="light"
                  :key="index"
                  v-for="(letter, index) of alphabet"
                  :disabled="isDisabled(index)"
                >{{ letter.letter }}</b-button>
              </div>
            </b-col>
            <b-col sm></b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row>
        <b-button class="mx-auto" @click="clearServerData">Clear Server data</b-button>
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
      lobbyFull: false,
      alphabet: [
        { letter: "Q", disable: false },
        { letter: "W", disable: false },
        { letter: "E", disable: false },
        { letter: "R", disable: false },
        { letter: "T", disable: false },
        { letter: "Y", disable: false },
        { letter: "U", disable: false },
        { letter: "I", disable: false },
        { letter: "O", disable: false },
        { letter: "P", disable: false },
        { letter: "A", disable: false },
        { letter: "S", disable: false },
        { letter: "D", disable: false },
        { letter: "F", disable: false },
        { letter: "G", disable: false },
        { letter: "H", disable: false },
        { letter: "J", disable: false },
        { letter: "K", disable: false },
        { letter: "L", disable: false },
        { letter: "Z", disable: false },
        { letter: "X", disable: false },
        { letter: "C", disable: false },
        { letter: "V", disable: false },
        { letter: "B", disable: false },
        { letter: "N", disable: false },
        { letter: "M", disable: false }
      ]
    };
  },
  created() {
    this.socket = io("https://hangman-webapp.herokuapp.com");
  },
  mounted() {
    this.socket.emit("check", localStorage["user"]);
    this.socket.on("checkResponse", data => {
      console.log(data, "checkResponse");
      if (data !== "already connected") {
        if (data.users.playerOne) {
          this.playerOne = data.users.playerOne;
        }
        if (data.users.playerTwo) {
          this.playerTwo = data.users.playerTwo;
        }
      }
    });
    this.socket.on("lobbyFull", data => {
      console.log(data, "lobbyFull");
      if (data.users.playerOne) {
        this.playerOne = data.users.playerOne;
      }
      if (data.users.playerTwo) {
        this.playerTwo = data.users.playerTwo;
      }
      this.lobbyFull = true;
      this.$forceUpdate();
    });
  },
  methods: {
    isDisabled(index) {
      return this.alphabet[index].disable;
    },
    clearServerData() {
      this.playerOne = "";
      this.playerTwo = "";
      this.lobbyFull = false;
      this.socket.emit("clear");
      console.log("data cleared");
    }
  }
};
</script>

<style scoped>
.playGround {
  border: 1px solid black;
  height: 500px;
  margin: 8px;
  border-radius: 5px;
}
.base {
  height: 20px;
  width: 100px;
  background: black;
  border-radius: 5px;
}

.pole {
  height: 300px;
  width: 10px;
  background: black;
  margin-left: 45px;
}

.crossBeam {
  height: 5px;
  width: 250px;
  background: black;
}

.rope {
  height: 50px;
  width: 2px;
  background: black;
  margin-left: 200px;
  position: absolute;
}

.head {
  height: 40px;
  width: 40px;
  background: black;
  margin-left: 181px;
  margin-top: 50px;
  position: absolute;
  border-radius: 50%;
}

.body {
  height: 120px;
  width: 6px;
  background: black;
  margin-left: 196px;
  margin-top: 80px;
  position: absolute;
}
.arm1 {
  height: 70px;
  width: 5px;
  background: black;
  margin-left: 172px;
  margin-top: 75px;
  position: absolute;
  transform: rotate(45deg);
}
.arm2 {
  height: 70px;
  width: 5px;
  background: black;
  margin-left: 222px;
  margin-top: 75px;
  position: absolute;
  transform: rotate(-45deg);
}

.leg1 {
  height: 70px;
  width: 5px;
  background: black;
  margin-left: 172px;
  margin-top: 187px;
  position: absolute;
  transform: rotate(45deg);
}
.leg2 {
  height: 70px;
  width: 5px;
  background: black;
  margin-left: 222px;
  margin-top: 187px;
  position: absolute;
  transform: rotate(-45deg);
}
</style>