<template>
  <div class="play">
    <b-container>
      <h1 style=margin:20px>Choose a gamemode:</h1>
      <b-row>
        <b-card-group deck>
          <b-card bg-variant="primary" text-variant="white" title='Classic'>
            <b-card-text>Play the classic game of hangman where you choose how big of a word you want and guess the letters until you either win or run out of guesses!</b-card-text>
            <router-link to="/classic">
              <b-button variant="dark">Play now</b-button>
            </router-link>
          </b-card>

          <b-card class='card' bg-variant="success" text-variant="white" title="Ladder">
            <b-card-text>Play an increasingly harder game for increasingly more points! The more you win, the harder the words become, the more points you get!</b-card-text>
            <div class='card-badge'>Coming soon!</div>                      
          </b-card>

          <b-card bg-variant="danger" text-variant="white" title="Multiplayer">
            <b-badge variant="warning">Beta!</b-badge>
            <b-card-text>Play a head to head game with 1 victor. You will recieve a random word of random length and face off against your opponent. Win if you finish first..</b-card-text>
            <router-link to="/multiplayer">
              <b-button variant="dark">Play now</b-button>
            </router-link>
          </b-card>
        </b-card-group>
      </b-row>
    </b-container>
  </div>
</template> 

<script>
export default {
  name: "play"
};
</script>

<style scoped>
body {
  padding:50px; /* this is just to get some space, unneccessary for the badge implementation itself */
}

.card {
  position:relative;
}
  
.card .card-badge {
  position:absolute;
  top:0px;
  left:-15px;
  padding:5px;
  background:yellow;
  color:black;
  transform:rotate(-20deg);
}
</style>