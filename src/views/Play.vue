<template>
  <div class="play">
    <b-container>
      <div>
        <img src="../assets/logo.png" alt />
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
      <div v-if="play">
        <div v-if="!win && guessesLeft>0">
          <h1>
            <span class="guess">{{ guessesLeft }}</span> Guesses left
          </h1>
          <span :key="index" v-for="(letter, index) of wordGuessed">{{ letter }} </span>
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
          <b-button @click="resetGame">New Game</b-button>
        </div>
        <b-row v-if="!win && guessesLeft > 0">
          <hr />
          <b-col sm></b-col>
          <b-col sm>
            <div>
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
      </div>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "play",
  data() {
    return {
      user: "",
      length: 0,
      play: false,
      guessesLeft: 4,
      wordGuessed: [],
      win: false,
      word: {},
      lettersGuessed: [],
      alphabet: [
        { letter: "A", disable: false },
        { letter: "B", disable: false },
        { letter: "C", disable: false },
        { letter: "D", disable: false },
        { letter: "E", disable: false },
        { letter: "F", disable: false },
        { letter: "G", disable: false },
        { letter: "H", disable: false },
        { letter: "I", disable: false },
        { letter: "J", disable: false },
        { letter: "K", disable: false },
        { letter: "L", disable: false },
        { letter: "M", disable: false },
        { letter: "N", disable: false },
        { letter: "O", disable: false },
        { letter: "P", disable: false },
        { letter: "Q", disable: false },
        { letter: "R", disable: false },
        { letter: "S", disable: false },
        { letter: "T", disable: false },
        { letter: "U", disable: false },
        { letter: "V", disable: false },
        { letter: "W", disable: false },
        { letter: "X", disable: false },
        { letter: "Y", disable: false },
        { letter: "Z", disable: false }
      ]
    };
  },
  beforeMount() {
    let token = localStorage["token"];
    axios
      .post("https://hangman-webapp.herokuapp.com/api/token/check", token)
      .then(results => {
        let response = results.data;
        let message = response.message;
        let success = response.success;
        this.user = response.user;
        console.log(response);

        if (!success) {
          this.$router.push({ name: "login" });
        }
      });
  },
  methods: {
    activatePlay() {
      this.wordGuessed = [];
      axios
        .get(
          "https://hangman-webapp.herokuapp.com/api/list/size/" + this.length
        )
        .then(results => {
          let response = results.data;
          let wordList = response.words;
          let listLength = wordList.length;
          let index = Math.floor(Math.random() * listLength) + 1;
          this.word = wordList[index];
          this.$forceUpdate();
        })
        .then(() => {
          let word = this.word.word;
          console.log(word);
          for (let i = 0; i < word.length; i++) {
            if (word[i] === "-") {
              this.wordGuessed.push("-");
            } else {
              this.wordGuessed.push("_");
            }
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
        // axios
        //   .post("/api/add/to/user", {
        //     username: this.user,
        //     word: this.word
        //   })
        //   .then(res => {});
      }
      if (!isCorrect) {
        this.guessesLeft--;
      }
    },
    isDisabled(index) {
      return this.alphabet[index].disable;
    },
    resetGame() {
      this.play = false;
      for (let item of this.alphabet) {
        item.disable = false;
      }
      this.guessesLeft = 4;
      this.length = 0;
      this.wordGuessed = [];
      this.win = false;
      this.word = {};
      this.lettersGuessed = [];
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
</style>
