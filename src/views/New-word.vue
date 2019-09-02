<template>
  <div class="new">
    <b-container>
      <b-row>
        <b-col>
          <h4 style='margin-top:15px'><u>How does this work?</u></h4>
          <p>
            On this page you can add new words to the current repository of words. These added words will be used in games that other players play. When you click submit, the word is sent in to be confirmed/verified. Once verified, you will recieve points according to the word length. 
          </p>
        </b-col>
        <b-col cols="6">
          <h1>Add new word here..</h1>
          <b-input-group style="margin-bottom:10px; width:200px" class="mt-3 mx-auto">
            <b-form-input v-model="word" placeholder="eg. hangman"></b-form-input>
            <b-input-group-append>
              <b-button @click="submitWord" variant="outline-dark">Submit</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      word: ""
    };
  },
  methods: {
    submitWord() {
      let check = '';
      axios
      .get('https://hangman-webapp.herokuapp.com/api/check/word/' + this.word)
      .then((res)=>{
        let response = res.data;
        check = response.check;
      })
      .then(()=>{
        axios
        .get('https://hangman-webapp.herokuapp.com/api/store/new/word', {word: this.word, user: localStorage['user']})
        .then((res)=>{
          let response = res.data;
          console.log(response.status);
        });
      });
    }
  }
};
</script>
