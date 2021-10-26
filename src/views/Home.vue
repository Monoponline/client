<template>
  <div class="text-center text-lg mt-3">
    <router-link active-class="text-green-500" to="/">Home</router-link> |
    <router-link active-class="text-green-500" to="/about">About</router-link>
  </div>
  <div class="text-center">
    <h1 class="mt-36 text-6xl">Welcome to Monoponline!</h1>
    <LoginForm v-if="!loggedIn" v-on:clicked="handleLogin" />
    <JoinGameForm
      v-if="loggedIn"
      v-on:join-game="handleJoinGame"
      v-on:create-game="handleCreateGame"
    />
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm';
import JoinGameForm from '@/components/JoinGameForm';
import { STATUS } from '@/store';
import io from 'socket.io-client';
import { setWSInstance, getWSInstance } from '@/contexts/SocketContext';
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'Home',
  data() {
    return {
      loggedIn: false
    };
  },
  methods: {
    handleLogin(username) {
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
          setWSInstance(ws);
          getWSInstance().on('joined-game', (gameId, asSpectator) => {
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
      getWSInstance().emit('request-join-game', gameId);
    },
    handleCreateGame() {
      const gameId = uuidv4().split('-')[0];
      getWSInstance().emit('request-join-game', gameId);
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
