<template>
  <main>
    <board />
    <modal v-show="showModal" @close="showModal = false">
      <template v-slot:header>{{ modalTitle }}</template>
      <template v-slot:body>
        <section id="modalDescription" class="modal-body">
          {{ modalBody }}
        </section>
      </template>
    </modal>
    <modal v-show="showButtonModal">
      <template v-slot:header>{{ modalTitle }}</template>
      <template v-slot:footer>
        <button
          v-for="button in modalButtons"
          :key="button.message"
          class="btn-green px-2"
          @click="button.action"
        >
          {{ button.message }}
        </button>
      </template>
    </modal>
    <modal v-show="showDropdownModal">
      <template v-slot:header>{{ modalTitle }}</template>
      <template v-slot:body>
        <dropdown
          :options="[{ name: 'test', id: 'test' }]"
          @selected="selected"
        />
      </template>
      <template v-slot:footer>
        <button
          v-for="button in modalButtons"
          :key="button.message"
          class="btn-green px-2"
          @click="button.action"
        >
          {{ button.message }}
        </button>
      </template>
    </modal>
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
  <nav v-if="!isStarted()" class="bottom-0">
    <button class="btn" @click="leave()">Quitter la partie</button>
    <button class="btn" @click="invite()">Inviter quelqu'un</button>
    <button v-if="getPlayers() >= 2" class="btn" @click="start()">
      Commencer la partie
    </button>
  </nav>
  <nav v-if="isStarted() && !isSpectator()" class="bottom-0">
    <button class="btn" @click="buyHouses()">Acheter des maisons</button>
    <button class="btn" @click="trade()">Faire un échange</button>
    <button v-if="isPlayerTurn()" class="btn" @click="throwDices()">
      Lancer les dés
    </button>
  </nav>
</template>

<script>
import Board from '@/components/Board.vue';
import Modal from '@/components/Modal.vue';
import Dropdown from '@/components/Dropdown.vue';
import { getContext } from '@/contexts/SocketContext';
import { STATUS } from '@/store';

export default {
  name: 'Game',
  components: {
    Dropdown,
    Board,
    Modal
  },
  data() {
    return {
      showDropdownModal: true,
      showButtonModal: false,
      selectedValue: {},
      modalButtons: [],
      showModal: false,
      modalTitle: '',
      modalBody: ''
    };
  },
  methods: {
    selected(e) {
      this.selectedValue = e;
    },
    buyHouses() {},
    trade() {},
    throwDices() {
      getContext().emit('roll-dice');
    },
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
        'http://localhost:8080/invite?gameId=' + this.$store.getters.getGameId;
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
    },
    isSpectator() {
      return !this.$store.getters.getPlayers
        .map((p) => p.name)
        .includes(this.$store.getters.getUsername);
    }
  },
  beforeCreate() {
    if (!this.$store.getters.isInGame) {
      this.$toast.error('You are not in game!');
      this.$router.push('/');
      return;
    }

    /**
     * @type {import('socket.io-client').Socket}
     */
    const ws = getContext();
    ws.on('win', () => {
      if (this.isSpectator()) {
        const winner = this.$store.getters.getPlayers.map((p) => p.name)[0];
        this.$toast.success(`${winner} a gagné!`, { position: 'top-right' });
      } else {
        this.$toast.success('Vous avez gagné!', { position: 'top-right' });
      }
      this.$store.commit('setStatus', STATUS.LOGGED_IN);
      this.$router.push('/');
    })
      .on('game-state', (data) => {
        const gameState = JSON.parse(data);
        this.$store.commit('setGameState', gameState);
      })
      .on('sold-house', (cell) => {
        this.$toast.success(`Vous avez vendu une maison sur ${cell}!`);
      })
      .on('cant-sell', () => {
        this.$toast.success('Vous ne pouvez pas vendre de maisons!');
      })
      .on('left-game', (player) => {
        this.$toast.info(`${player} a quitté la partie`);
      })
      .on('user-join', (player) => {
        if (player === this.$store.getters.getUsername) return;
        this.$toast.info(`${player} à rejoint la partie`);
      })
      .on('start', () => {
        this.$toast.success(`La partie commence!`);
      })
      .on('bought-house', (player, property) => {
        this.$toast.info(
          `${
            player === this.$store.getters.getUsername
              ? 'Vous avez'
              : player + ' a'
          } acheter un maison sur ${property}`
        );
      })
      .on('player-broke', (player) => {
        if (player === this.$store.getters.getUsername) {
          this.$toast.error('Vous avez perdu!', { position: 'top-right' });
          return this.$store.commit('setStatus', STATUS.LOGGED_IN);
        }
        this.$toast.error(`${player} à perdu!`, { position: 'top-right' });
      })
      .on('dice-roll', (player, dices) => {
        this.$toast.info(
          `${
            player === this.$store.getters.getUsername
              ? 'Vous avez'
              : `${player} a`
          } fait ${dices[0]} et ${dices[1]}`
        );
      })
      .on('buy-house', (player, cell) => {
        this.$toast.success(
          `${
            player === this.$store.getters.getUsername
              ? 'Vous venez'
              : `${player} vient`
          } d'acheter ${cell}!`
        );
      })
      .on('cant-afford', (player, cell) => {
        this.$toast.error(
          `${
            player === this.$store.getters.getUsername
              ? 'Vous ne pouvez pas'
              : `${player} ne peut pas`
          } acheter ${cell}`
        );
      })
      .on('paid-rent', (player, renter, rent) => {
        if (renter === this.$store.getters.getUsername) {
          this.$toast.info(`${player} vous à payer ${rent}€`);
        } else {
          this.$toast.info(
            `${
              player === this.$store.getters.getUsername
                ? 'Vous avez'
                : `${player} a`
            } payer ${rent}€ à ${renter}`
          );
        }
      })
      .on('cant-upgrade', () => {
        this.$toast.error('Vous ne pouvez pas acheter de maisons!');
      })
      .on('player-in-jail', (player) => {
        if (player === this.$store.getters.getUsername) {
          this.modalTitle = 'Vous avez été envoyer en prison!';
          this.modalBody =
            "Vous n'en sortirez que dans 3 tours. A moins que vous ne payez 50€ ou que vous avez une carte Sortir de Prison";
        } else {
          this.$toast.info(`${player} est en Prison!`);
        }
      })
      .on('paid-luxury-taxe', (player) => {
        this.$toast.info(
          `${
            player === this.$store.getters.getUsername
              ? 'Vous avez'
              : `${player} a`
          } payer 100€ pour la taxe de luxe.`
        );
      })
      .on('paid-taxes', (player) => {
        this.$toast.info(`
          ${
            player === this.$store.getters.getUsername
              ? 'Vous avez'
              : `${player} a`
          } payer 200€ d'impôts.
      `);
      })
      .on('chance-card', (card) => {
        this.modalTitle = 'Vous avez une carte chance!';
        this.modalBody = card;
        this.showModal = true;
      })
      .on('cc-card', (card) => {
        this.modalTitle = 'Vous avez une carte caisse de communauté!';
        this.modalBody = card;
        this.showModal = true;
      })
      .on('player-move', (player, cell) => {
        this.$toast.info(
          `${
            player === this.$store.getters.getUsername
              ? 'Vous devez vous'
              : `${player} dois se`
          } rendre à ${cell}`
        );
      })
      .on('fine', (player, price) => {
        this.$toast.info(
          `${
            player === this.$store.getters.getUsername
              ? 'Vous devez'
              : `${player} dois`
          } payer une amende de ${price}€`
        );
      })
      .on('earn', (player, price) => {
        this.$toast.success(
          `${
            player === this.$store.getters.getUsername
              ? 'Vous avez'
              : `${player} a`
          } gagner ${typeof price === 'number' ? `${price}€` : price}!`
        );
      })
      .on('exit-jail', (player) => {
        this.$toast.success(
          `${
            player === this.$store.getters.getUsername
              ? 'Vous sortez'
              : `${player} sort`
          } de prison!`
        );
      })
      .on('is-in-jail', (player) => {
        this.$toast.error(
          `${
            player === this.$store.getters.getUsername
              ? 'Vous êtes'
              : `${player} est`
          } en prison!`
        );
      })
      .on('used-exit-jail-card', (player) => {
        this.$toast.error(
          `${
            player === this.$store.getters.getUsername
              ? 'Vous avez'
              : `${player} a`
          } utilisé une carte sortie de prison!`
        );
      })
      .on('friend-gift', (player) => {
        this.$toast.error(
          player === this.$store.getters.getUsername
            ? 'Vous avez reçu 10€ de la part de chaque joueur!'
            : `Vous avez donné 10€ à ${player}`
        );
      })
      .on('trade-req-sent', () => {
        this.$toast.success("Demande d'échange envoyé!");
      })
      .on('canceled-trade', () => {
        this.$toast.error('Echange refusé!');
      })
      .on('trade-req', (player, json) => {
        const trade = JSON.parse(json);
        this.modalTitle = `${player} demande de faire un échange`;
        this.modalBody = `${player} vous demande ${
          trade.cardToReceive.length
            ? trade.cardToReceive.map((card) => card.label).join(', ')
            : 'Aucune propriété'
        } et ${trade.moneyToReceive}€ contre ${
          trade.cardToGive.length
            ? trade.cardToGive.map((card) => card.label).join(', ')
            : 'Aucune propriété'
        } et ${trade.moneyToGive}€`;
        this.modalButtons = [
          {
            message: 'Accepter',
            action: () => {
              ws.emit('response-trade', true);
              this.showButtonModal = false;
            }
          },
          {
            message: 'Refuser',
            action: () => {
              ws.emit('response-trade', false);
              this.showButtonModal = false;
            }
          }
        ];
        this.showButtonModal = true;
      })
      .on('info', (message) => {
        this.$toast.info(message);
      })
      .on('warn', (message) => {
        this.$toast.warning(message);
      })
      .on('success', (message) => {
        this.$toast.success(message);
      })
      .on('choice', (question, choices) => {
        this.modalTitle = question;
        this.modalBody = '';
        this.modalButtons = choices.map((choice, index) => {
          return {
            message: choice,
            action: () => {
              ws.emit('response-choice', index);
              this.showButtonModal = false;
            }
          };
        });
        this.showButtonModal = true;
      });
  }
};
</script>

<style scoped>
button.btn {
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
