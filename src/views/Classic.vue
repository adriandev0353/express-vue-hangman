<template>
  <div class="classic">
    <b-container>
      <div>
        <h1>Hangman</h1>
        <div v-if="!play">
          <p>Enter a word length:</p>
          <b-button-group>
            <input
              type="number"
              class="lengthInput"
              v-model="length"
              placeholder="Enter a word-length"
              :disabled="play"
            />
            <b-button v-if="!play" @click="activatePlay" variant="outline-primary">Submit</b-button>
            <b-button v-if="play" @click="activatePlay" variant="outline-primary" disabled>Submit</b-button>
          </b-button-group>
        </div>
        <b-row>
          <b-col></b-col>
          <b-col>
            <div style="margin-top:5px; margin-left:50px">
              <div v-if="guessesLeft<=6" class="rope"></div>
              <div v-if="guessesLeft<=5" class="head"></div>
              <div v-if="guessesLeft<=4" class="body"></div>
              <div v-if="guessesLeft<=3" class="arm1"></div>
              <div v-if="guessesLeft<=2" class="arm2"></div>
              <div v-if="guessesLeft<=1" class="leg1"></div>
              <div v-if="guessesLeft<=0" class="leg2"></div>
              <div v-if="guessesLeft<=6" class="crossBeam"></div>
              <div v-if="guessesLeft<=6" class="pole"></div>
              <div class="base"></div>
            </div>
          </b-col>
          <b-col></b-col>
        </b-row>
      </div>
      <div v-if="play">
        <div v-if="!win && guessesLeft>0">
          <b-spinner v-if="loading" label="Spinning"></b-spinner>
          <span v-else :key="index" v-for="(letter, index) of wordGuessed">{{ letter }} </span>
        </div>
        <div v-else-if="win">
          <h1>Congratulations!</h1>
          <h3>
            The word was
            <span class="word">{{ word.word }}</span>
          </h3>
          <h4>
            You won
            <span class="points">{{length}}</span> points!
          </h4>
          <b-button @click="resetGame">New Game</b-button>
        </div>
        <div v-else-if="guessesLeft === 0">
          <h1 class="guess">Game Over!</h1>
          <h3>
            The word was
            <span class="word">{{ word.word }}</span>
          </h3>
          <h4>
            You lost
            <span class="points">{{lost}}</span> points!
          </h4>
        </div>
        <b-alert
          style="margin-top:20px"
          v-if="error"
          show
          variant="danger"
        >We have no words with a length of {{length}} letters</b-alert>
        <b-button v-if="guessesLeft === 0 || error" @click="resetGame">New Game</b-button>
        <b-row v-if="!win && guessesLeft > 0">
          <hr />
          <b-col sm></b-col>
          <b-col sm>
            <div v-if="!loading && !error">
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
          <b-col sm>
            <b-button
              v-if="!hintGiven && play && !loading"
              variant="outline-dark"
              @click="giveHint"
            >Hint</b-button>
            <p v-if="!hintGiven && play && !loading">Gives you one letter at the cost of a guess.</p>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import { EventBus } from "../event-bus";

export default {
  name: "classic",
  data() {
    return {
      lost: 0,
      length: 0,
      play: false,
      guessesLeft: 6,
      wordGuessed: [],
      win: false,
      loading: false,
      error: false,
      word: {},
      hintGiven: false,
      lettersGuessed: [],
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
  methods: {
    async checkWordPlayed(user, word){
      const config = {
        method: "post",
        url: "https://hangman-webapp.herokuapp.com/api/check/word/played",
        headers: {auth: localStorage['token'], user: localStorage['user']},
        data: {user, word}
      };
      return await axios(config);
    },
    async addToUser(username, word, state) {
      const config = {
        method: "post",
        url: "https://hangman-webapp.herokuapp.com/api/add/to/user",
        headers: { auth: localStorage["token"], user: localStorage['user'] },
        data: {
          username,
          word,
          state
        }
      };
      return await axios(config);
    },
    async listSize(size) {
      const config = {
        method: "get",
        url: "https://hangman-webapp.herokuapp.com/api/list/size/" + size,
        headers: { auth: localStorage["token"], user: localStorage['user'] }
      };
      return await axios(config);
    },
    activatePlay() {
      this.loading = true;
      this.wordGuessed = [];
      this.listSize(this.length).then(results => {
        let response = results.data;
        let wordList = response.words;
        if (wordList.length > 0) {
          let listLength = wordList.length;
          let index = Math.ceil(Math.random() * listLength) - 1;
          this.word = wordList[index];
          this.$forceUpdate();
          let word = this.word.word;
          this.checkWordPlayed(localStorage['user'], word)
            .then(res => {
              const response = res.data;
              const result = response.result;
              if (result === "found") {
                this.error = true;
                this.play = false;
                for (let item of this.alphabet) {
                  item.disable = false;
                }
                this.guessesLeft = 6;
                this.length = 0;
                this.wordGuessed = [];
                this.win = false;
                this.word = {};
                this.lettersGuessed = [];
                this.hintGiven = false;
                return;
              }
            })
            .then(() => {
              this.loading = false;
              for (let i = 0; i < word.length; i++) {
                if (word[i] === "-") {
                  this.wordGuessed.push("-");
                } else {
                  this.wordGuessed.push("_");
                }
              }
            });
        } else {
          this.error = true;
          this.loading = false;
          this.$forceUpdate();
        }
      });

      this.play = true;
    },
    letterCheck(letter) {
      this.lettersGuessed.push(letter);
      let isCorrect = false;
      let word = this.word.word;
      word = word.toLowerCase();
      let guess = letter.toLowerCase();
      for (let item of this.alphabet) {
        if (item.letter === letter) {
          item.disable = true;
        }
      }
      for (let i = 0; i < word.length; i++) {
        if (guess === word[i]) {
          this.wordGuessed[i] = guess;
          this.$forceUpdate();
          isCorrect = true;
        }
      }
      let wordSoFar = "";
      for (let letter of this.wordGuessed) {
        wordSoFar += letter;
      }
      if (wordSoFar === word) {
        this.win = true;
        this.addToUser(localStorage["user"], this.word.word, "won").then(
          res => {
            EventBus.$emit("userData", localStorage["user"]);
          }
        );
      }
      if (!isCorrect) {
        this.guessesLeft--;
        if (this.guessesLeft === 0) {
          this.lost = Math.ceil(this.length / 2);
          this.addToUser(localStorage["user"], this.word.word, "lost").then(
            res => {
              EventBus.$emit("userData", localStorage["user"]);
            }
          );
        }
      }
    },
    isDisabled(index) {
      return this.alphabet[index].disable;
    },
    resetGame() {
      this.error = false;
      this.play = false;
      for (let item of this.alphabet) {
        item.disable = false;
      }
      this.guessesLeft = 6;
      this.length = 0;
      this.wordGuessed = [];
      this.win = false;
      this.word = {};
      this.lettersGuessed = [];
      this.hintGiven = false;
    },
    giveHint() {
      this.hintGiven = true;
      this.guessesLeft--;
      let count = 0;
      for (const letter of this.wordGuessed) {
        if (letter === "_") {
          const letterToAdd = this.word.word[count];
          for (let i = 0; i < this.word.word.length; i++) {
            if (letterToAdd === this.word.word[i]) {
              this.wordGuessed[i] = letterToAdd;
            }
          }
          for (let item of this.alphabet) {
            if (item.letter === letter) {
              item.disable = true;
            }
          }
          return;
        }
        count++;
      }
    }
  },
  beforeDestroy() {
    if (this.play) {
      this.addToUser(localStorage["user"], this.word.word, "lost").then(res => {
        EventBus.$emit("userData", localStorage["user"]);
      });
    }
  }
};
</script>

<style scoped>
img {
  margin: 10px;
}
.heading {
  margin: 10px;
}
.guess {
  font-size: 40px;
  color: crimson;
}
.letter:hover {
  border: 1px solid black;
}
.points {
  color: darkgoldenrod;
}
.word {
  font-style: italic;
  color: green;
}
.lengthInput {
  width: 50px;
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
