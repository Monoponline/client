import { createStore } from 'vuex';
import axios from 'axios';

export const STATUS = {
  LOGGED_IN: 'LOGGED_IN',
  LOBBY: 'LOBBY',
  IN_GAME: 'IN_GAME'
};

export default createStore({
  state: {
    status: 'LOBBY',
    username: '',
    gameState: {
      players: [],
      houses: [],
      spectating: 0,
      turn: '',
      started: false,
      id: ''
    }
  },
  mutations: {
    setStatus(state, status) {
      state.status = status;
    },
    setUsername(state, username) {
      state.username = username;
    },
    setGameState(state, gameState) {
      state.gameState = gameState;
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
    },
    getPlayers(state) {
      return state.gameState.players;
    },
    getSpectators(state) {
      return state.gameState.spectating;
    },
    getTurn(state) {
      return state.gameState.turn;
    },
    isStarted(state) {
      return state.gameState.started;
    },
    getGameId(state) {
      return state.gameState.id;
    }
  }
});
