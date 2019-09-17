<template>
  <div class="multiplayer">
    <b-container>
      <h1>Multiplayer</h1>
      <b-row v-if="!lobbyFull">
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
      <b-row v-if="!lobbyFull">
        <b-col sm></b-col>
        <b-col sm>
          <h5 v-if="!lobbyFull">Waiting for opponent..</h5>
        </b-col>
        <b-col sm></b-col>
      </b-row>
      <b-row v-if="lobbyFull">
        <b-col sm>
          <b-button @click="ready('one')">Ready</b-button>
        </b-col>
        <b-col sm>
          <b-button @click="ready('two')">Ready</b-button>
        </b-col>
      </b-row>
      <b-row v-if="playerOneReady && playerTwoReady">
        <b-col class="playGround" sm>
          <b-row>
            <b-col sm></b-col>
            <b-col sm>
              <h2>{{playerOne}}</h2>
              <div style="margin-top:5px; margin-left:50px">
                <div v-if="playerOneGuesses<=6" class="rope"></div>
                <div v-if="playerOneGuesses<=5" class="head"></div>
                <div v-if="playerOneGuesses<=4" class="body"></div>
                <div v-if="playerOneGuesses<=3" class="arm1"></div>
                <div v-if="playerOneGuesses<=2" class="arm2"></div>
                <div v-if="playerOneGuesses<=1" class="leg1"></div>
                <div v-if="playerOneGuesses<=0" class="leg2"></div>
                <div v-if="playerOneGuesses<=6" class="crossBeam"></div>
                <div v-if="playerOneGuesses<=6" class="pole"></div>
                <div class="base"></div>
              </div>
              <div>
                <span :key="index" v-for="(letter, index) of wordGuessedOne">{{ letter }} </span>
              </div>
              <div v-if="userCheck(playerOne)">
                <b-button
                  @click="letterCheck(letter.letter, 'one')"
                  class="letter"
                  variant="light"
                  :key="index"
                  v-for="(letter, index) of alphabet"
                  :disabled="isDisabled(index, 'one')"
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
              <h2>{{playerTwo}}</h2>
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
              <div>
                <span :key="index" v-for="(letter, index) of wordGuessedTwo">{{ letter }} </span>
              </div>
              <div v-if="userCheck(playerTwo)">
                <b-button
                  @click="letterCheck(letter.letter, 'two')"
                  class="letter"
                  variant="light"
                  :key="index"
                  v-for="(letter, index) of alphabet"
                  :disabled="isDisabled(index, 'two')"
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
      playerOneReady: false,
      playerTwoReady: false,
      wordGuessedOne: [],
      wordGuessedTwo: [],
      wordLength: 0,
      playerOne: "",
      playerOneWord: "",
      playerOneGuesses: 6,
      playerTwo: "",
      playerTwoWord: "",
      playerTwoGuesses: 6,
      lobbyFull: false,
      alphabet: [
        { letter: "Q", one: false, two: false },
        { letter: "W", one: false, two: false },
        { letter: "E", one: false, two: false },
        { letter: "R", one: false, two: false },
        { letter: "T", one: false, two: false },
        { letter: "Y", one: false, two: false },
        { letter: "U", one: false, two: false },
        { letter: "I", one: false, two: false },
        { letter: "O", one: false, two: false },
        { letter: "P", one: false, two: false },
        { letter: "A", one: false, two: false },
        { letter: "S", one: false, two: false },
        { letter: "D", one: false, two: false },
        { letter: "F", one: false, two: false },
        { letter: "G", one: false, two: false },
        { letter: "H", one: false, two: false },
        { letter: "J", one: false, two: false },
        { letter: "K", one: false, two: false },
        { letter: "L", one: false, two: false },
        { letter: "Z", one: false, two: false },
        { letter: "X", one: false, two: false },
        { letter: "C", one: false, two: false },
        { letter: "V", one: false, two: false },
        { letter: "B", one: false, two: false },
        { letter: "N", one: false, two: false },
        { letter: "M", one: false, two: false }
      ]
    };
  },
  created() {
    this.socket = io("https://hangman-webapp.herokuapp.com");
  },
  mounted() {
    this.socket.emit("check", localStorage["user"]);
      this.socket.on("checkResponse", data => {
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
    ready(user) {
      if (user === "one") {
        this.playerOneReady = true;
        if (this.playerTwoReady === true) {
          this.bothReady();
        }
      } else {
        this.playerTwoReady = true;
        if (this.playerOneReady === true) {
          this.bothReady();
        }
      }
    },
    bothReady() {
      this.socket.emit("lengthReq");
      this.socket.on("lengthRes", data => {
        this.wordLength = data;
        for (let i = 0; i < this.wordLength; i++) {
          if (this.playerOneWord[i] === "-") {
            this.wordGuessedOne.push("-");
          } else {
            this.wordGuessedOne.push("_");
          }
        }
        for (let i = 0; i < this.wordLength; i++) {
          if (this.playerTwoWord[i] === "-") {
            this.wordGuessedTwo.push("-");
          } else {
            this.wordGuessedTwo.push("_");
          }
        }
        axios
          .get(
            "https://hangman-webapp.herokuapp.com/api/list/size/" +
              this.wordLength
          )
          .then(res => {
            const response = res.data;
            const words = response.words;
            const indexOne = Math.ceil(Math.random() * this.wordLength) - 1;
            this.playerOneWord = words[indexOne].word;
            const indexTwo = Math.ceil(Math.random() * this.wordLength) - 1;
            this.playerTwoWord = words[indexTwo].word;

            this.socket.emit("playersWords", {
              one: this.playerOneWord,
              two: this.playerTwoWord
            });
          });
      });
      this.$forceUpdate();
    },
    userCheck(player) {
      let bool = false;
      if (localStorage["user"] === player) {
        bool = true;
      } else {
        bool = false;
      }
      return bool;
    },
    isDisabled(index, user) {
      return this.alphabet[index][user];
    },
    letterCheck(letter, user) {
      console.log({
        letter,
        user,
        guessOne: this.wordGuessedOne,
        guessTwo: this.wordGuessedTwo
      });
      this.socket.emit("letterCheck", {
        letter,
        user,
        guessOne: this.wordGuessedOne,
        guessTwo: this.wordGuessedTwo
      });
      this.socket.on("guesses", data => {
        console.log(data);
        console.log(this.wordGuessedOne, this.wordGuessedTwo);
        this.wordGuessedOne = data.one;
        this.wordGuessedTwo = data.two;
        console.log(this.wordGuessedOne, this.wordGuessedTwo);
        if (!data.isCorrect) {
          if (user === "one") {
            this.playerOneGuesses--;
          } else if (user === "two") {
            this.playerTwoGuesses--;
          }
        }
        console.log(this.playerOneGuesses, this.playerTwoGuesses);
        for (const item of this.alphabet) {
          if (item.letter === letter) {
            console.log(item);
            if (user === "one") {
              item.one = true;
            } else if (user === "two") {
              item.two = true;
            }
          }
        }
        this.$forceUpdate();
      });
    },
    clearServerData() {
      this.playerOneReady = false;
      this.playerTwoReady = false;
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