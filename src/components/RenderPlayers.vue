<template>
  <template v-for="player in players" :key="player.avatar">
    <div v-if="!special" class="fixed self-center items-center ml-5">
      <img :src="getAvatar(player.avatar)" :alt="player.name" class="w-7" />
    </div>
    <img
      v-if="special"
      :class="'w-7 -mt-16 ml-10 ' + cclass"
      :src="getAvatar(player.avatar)"
      :alt="player.name"
    />
  </template>
</template>

<script>
import battleship from '@/assets/token/battleship.png';
import car from '@/assets/token/car.png';
import dog from '@/assets/token/dog.png';
import hat from '@/assets/token/hat.png';
import iron from '@/assets/token/iron.png';
import shoe from '@/assets/token/shoe.png';
import thimble from '@/assets/token/thimble.png';
import wheelbarrow from '@/assets/token/wheelbarrow.png';

export default {
  name: 'render-players',
  props: {
    cell: Number,
    special: Boolean,
    cclass: String
  },
  data() {
    return {
      players: []
    };
  },
  methods: {
    getAvatar(avatar) {
      switch (avatar) {
        case 'battleship':
          return battleship;
        case 'car':
          return car;
        case 'dog':
          return dog;
        case 'hat':
          return hat;
        case 'iron':
          return iron;
        case 'shoe':
          return shoe;
        case 'thimble':
          return thimble;
        case 'wheelbarrow':
          return wheelbarrow;
      }
    }
  },
  beforeMount() {
    this.players = [...this.$store.getters.getPlayers].filter(
      (p) => p.position === this.cell
    );
  }
};
</script>

<style scoped>
img.br {
  animation: spin-45 1ms;
  animation-play-state: paused;
}
img.bl {
  animation: spin45 1ms;
  animation-play-state: paused;
}
img.tr {
  animation: spin-135 1ms;
  animation-play-state: paused;
}
img.tl {
  animation: spin135 1ms;
  animation-play-state: paused;
}
@keyframes spin45 {
  0% {
    transform: rotate(45deg);
  }
}
@keyframes spin-45 {
  0% {
    transform: rotate(-45deg);
  }
}
@keyframes spin135 {
  0% {
    transform: rotate(135deg);
  }
}
@keyframes spin-135 {
  0% {
    transform: rotate(-135deg);
  }
}
</style>
