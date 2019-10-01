<template>
  <div class="game">
    <b-container>
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
      <div>
        <div v-if="!win && guessesLeft>0">
          <b-spinner v-if="loading" label="Spinning"></b-spinner>
          <span v-else :key="index" v-for="(letter, index) of wordGuessed">{{ letter }} </span>
        </div>
        <div v-else-if="win">
          <h1 class="points">Congratulations!</h1>
          <h3>
            The word was
            <span class="word">{{ word }}</span>
          </h3>
          <h4>You won the challenge!</h4>
          <b-button v-on:click="$emit('endChallenge')">Back</b-button>
        </div>
        <div v-else-if="guessesLeft === 0">
          <h1 class="guess">Game Over!</h1>
          <h3>
            The word was
            <span class="word">{{ word }}</span>
          </h3>
        </div>
        <b-button v-if="guessesLeft === 0 || error" v-on:click="$emit('endChallenge')">Back</b-button>
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
            <h4>
              <u>Hint</u>
            </h4>
            <p v-if="hint.length>0">{{hint}}</p>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Game",
  props: ["word", "hint"],
  beforeMount() {
    for (let i = 0; i < this.word.length; i++) {
      if (this.word[i] === "-") {
        this.wordGuessed.push("-");
      } else {
        this.wordGuessed.push("_");
      }
    }
  },
  data() {
    return {
      wordGuessed: [],
      lettersGuessed: [],
      win: false,
      lost: false,
      loading: false,
      error: false,
      guessesLeft: 6,
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
    async setStatus(status) {
      const token = localStorage["token"];
      const config = {
        method: "post",
        url: "https://hangman-webapp.herokuapp.com/api/set/challenge/status",
        headers: {
          auth: token,
          user: localStorage['user']
        },
        data: {
          opponent: localStorage["user"],
          status: status,
          word: this.word
        }
      };
      return await axios(config);
    },
    isDisabled(index) {
      return this.alphabet[index].disable;
    },
    async letterCheck(letter) {
      this.lettersGuessed.push(letter);
      let isCorrect = false;
      let word = this.word;
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
        this.setStatus("won").then(res => {});
      }
      if (!isCorrect) {
        this.guessesLeft--;
        if (this.guessesLeft === 0) {
          this.lost = true;
          this.setStatus("lost").then(res => {});
        }
      }
    }
  }
};
</script>

<style scoped>
.letter:hover {
  border: 1px solid black;
}

.word {
  font-style: italic;
  color: green;
}

.points {
  color: darkgoldenrod;
}

.guess {
  font-size: 40px;
  color: crimson;
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