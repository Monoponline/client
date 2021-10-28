<template>
  <main>
    <board />
  </main>
  <nav class="top-0">
    <p>{{ getPlayers() }} joueurs</p>
    <p>{{ getSpectators() }} spectateurs</p>
    <p v-if="isStarted()">
      {{
        isPlayerTurn() ? "C'est votre tour!" : `C'est le tour de ${getTurn()}`
      }}
    </p>
    <p v-if="!isStarted()">En attente de joueurs...</p>
  </nav>
  <nav class="bottom-0" v-if="!isStarted()">
    <button @click="leave()">Quitter la partie</button>
    <button @click="invite()">Inviter quelqu'un</button>
    <button @click="start()" v-if="getPlayers() >= 2">
      Commencer la partie
    </button>
  </nav>
  <nav class="bottom-0" v-if="isStarted()">
    <button>Acheter des maisons</button>
    <button>Faire un échange</button>
    <button>Lancer les dés</button>
  </nav>
</template>

<script>
import Board from '@/components/Board.vue';
import { getContext } from '@/contexts/SocketContext';
import { STATUS } from '@/store';

export default {
  name: 'Game',
  components: {
    Board
  },
  beforeMount() {
    if (!this.$store.getters.isInGame) {
      this.$toast.error('You are not in game!');
      this.$router.push('/');
      return;
    }

    const ws = getContext();
    ws.on('win', () => {
      this.$toast.success('Vous avez gagné!', { position: 'top-right' });
      this.$store.commit('setStatus', STATUS.LOGGED_IN);
    });
    ws.on('game-state', (payload) => {
      const gameState = JSON.parse(payload);
      this.$store.commit('setGameState', gameState);
    });
    ws.on('sold-house', (cell) => {
      this.$toast.success(`Vous avez vendu une maison sur ${cell}!`);
    });
    ws.on('cant-sell', () => {
      this.$toast.success('Vous ne pouvez pas vendre de maisons!');
    });
    ws.on('left-game', (player) => {
      this.$toast.info(`${player} a quitté la partie`);
    });
    ws.on('user-join', (player) => {
      if (player === this.$store.getters.getUsername) return;
      this.$toast.info(`${player} à rejoint la partie`);
    });
    ws.on('start', () => {
      this.$toast.success(`La partie commence!`);
    });
  },
  methods: {
    start() {
      getContext().emit('player-start');
    },
    leave() {
      getContext().emit('leave-game');
      this.$store.commit('setStatus', STATUS.LOGGED_IN);
      this.$router.push('/');
    },
    invite() {
      const link =
        'http://localhost:8080/share?gameId=' + this.$store.getters.getGameId;
      const el = document.createElement('textarea');
      el.value = link;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      this.$toast.success('Lien copié dans le presse papier!');
      navigator.share &&
        navigator.share({
          text: 'Rejoindre la partie de ' + this.$store.getters.getUsername,
          title: 'Monopoly en ligne',
          url: link
        });
    },
    getPlayers() {
      return this.$store.getters.getPlayers.length;
    },
    getTurn() {
      return this.$store.getters.getTurn;
    },
    getSpectators() {
      return this.$store.getters.getSpectators;
    },
    isStarted() {
      return this.$store.getters.isStarted;
    },
    isPlayerTurn() {
      return this.$store.getters.getUsername === this.getTurn();
    }
  }
};
</script>

<style scoped>
button {
  @apply w-full
        block
        py-3
        px-3
        text-center
        hover:bg-green-200 hover:text-green-800
        transition
        duration-300
        rounded-xl;
}
p {
  @apply w-full
        block
        py-3
        px-3
        text-center
        rounded-xl;
}
nav {
  @apply rounded-xl
      fixed
      inset-x-0
      bg-blue-100
      flex
      justify-between
      text-sm text-green-700
      font-mono;
}
</style>
