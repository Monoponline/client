<template>
  <main>
    <div class="text-center text-lg mt-3">
      <router-link active-class="text-green-500" to="/">Home</router-link> |
      <router-link active-class="text-green-500" to="/about">About</router-link>
    </div>
    <div class="text-center">
      <h1 class="mt-36 text-6xl">Welcome to Monoponline!</h1>
      <login-form v-if="!loggedIn" v-on:clicked="handleLogin" />
      <join-game-form
        v-if="loggedIn"
        v-on:join-game="handleJoinGame"
        v-on:create-game="handleCreateGame"
      />
    </div>
  </main>
</template>

<script>
import LoginForm from '@/components/LoginForm';
import JoinGameForm from '@/components/JoinGameForm';
import { STATUS } from '@/store';
import io from 'socket.io-client';
import { getContext, setContext } from '@/contexts/SocketContext';
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'Home',
  data() {
    return {
      loggedIn: false,
      showModal: true,
      modalTitle: 'Vous avez été envoyer en prison!',
      modalBody:
        "Vous n'en sortirez que dans 3 tours. A moins que vous ne payez 50€ ou que vous avez une carte Sortie de Prison"
    };
  },
  methods: {
    onClose() {
      this.showModal = false;
    },
    handleLogin(username) {
      if (!username || username === '')
        return this.$toast.error('Invalid username!');
      this.$store.commit('setUsername', username);
      this.$store.dispatch('login', username).then((validUsername) => {
        if (validUsername) {
          this.loggedIn = true;
          const ws = io('ws://localhost:3000', {
            transports: ['websocket'],
            query: {
              username: this.$store.getters.getUsername
            }
          });
          ws.connect();
          setContext(ws);
          getContext().on('joined-game', (gameId, asSpectator) => {
            const el = document.createElement('textarea');
            el.value = gameId;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            this.$toast.success(
              `Joined game ${gameId}${
                asSpectator
                  ? ' as a spectator'
                  : ' (game id copied to clipboard)'
              }!`,
              {
                position: 'top-right'
              }
            );
            this.$store.commit('setStatus', STATUS.IN_GAME);
            this.$router.push('/game');
          });
        } else {
          alert('Username already taken!');
        }
      });
    },
    handleJoinGame(gameId) {
      getContext().emit('request-join-game', gameId);
    },
    handleCreateGame() {
      const gameId = uuidv4().split('-')[0];
      getContext().emit('request-join-game', gameId);
    }
  },
  components: {
    JoinGameForm,
    LoginForm
  },
  beforeMount() {
    this.loggedIn = this.$store.getters.getStatus === STATUS.LOGGED_IN;
  }
};
</script>
