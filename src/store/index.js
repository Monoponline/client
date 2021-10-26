import { createStore } from 'vuex';
import axios from 'axios';

let TMP_USERNAME = localStorage.getItem('username');

export const STATUS = {
  LOGGED_IN: 'LOGGED_IN',
  LOBBY: 'LOBBY',
  IN_GAME: 'IN_GAME'
};

export default createStore({
  state: {
    status: 'LOBBY',
    username: TMP_USERNAME ?? '',
    gameState: {},
    socket: undefined
  },
  mutations: {
    setStatus(state, status) {
      state.status = status;
    },
    setUsername(state, username) {
      state.username = username;
      localStorage.setItem('username', username);
    }
  },
  actions: {
    login({ commit }, username) {
      return new Promise((resolve) => {
        axios
          .get(`http://localhost:3000/is-username-taken?username=${username}`)
          .then((res) => {
            if (res.data === false) {
              commit('setStatus', STATUS.LOGGED_IN);
              localStorage.setItem('username', username);
              resolve(true);
            } else {
              commit('setStatus', STATUS.LOBBY);
              resolve(false);
            }
          })
          .catch(() => {
            resolve(false);
          });
      });
    }
  },
  getters: {
    getUsername(state) {
      return state.username;
    },
    getStatus(state) {
      return state.status;
    },
    isInGame(state) {
      return state.status === STATUS.IN_GAME;
    }
  }
});
