<template>
  <main>
    <div class="text-center text-lg mt-3">
      <router-link active-class="text-green-500" to="/">Home</router-link> |
      <router-link active-class="text-green-500" to="/about">About</router-link>
    </div>
    <div class="text-center">
      <h1 class="mt-36 text-6xl">Welcome to Monoponline!</h1>
      <login-form v-if="!loggedIn" v-on:clicked="handleLogin" />
    </div>
  </main>
</template>

<script>
import LoginForm from '@/components/LoginForm';
import { STATUS } from '@/store';
import io from 'socket.io-client';
import { getContext, setContext } from '@/contexts/SocketContext';

export default {
  name: 'Home',
  data() {
    return {
      loggedIn: false
    };
  },
  methods: {
    handleLogin(username) {
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
          getContext().emit('request-join-game', this.$route.query.gameId);
        } else {
          alert('Username already taken!');
        }
      });
    }
  },
  components: {
    LoginForm
  },
  beforeMount() {
    this.loggedIn = this.$store.getters.getStatus === STATUS.LOGGED_IN;
  }
};
</script>
