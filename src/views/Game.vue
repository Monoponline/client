<template>
  <Board>test</Board>
</template>

<script>
import Board from '@/components/Board.vue';

export default {
  name: 'Game',
  beforeMount() {
    if (!this.$store.getters.isInGame) {
      this.$toast.error('You are not in game!');
      this.$router.push('/');
    }
  },
  components: {
    Board
  }
};
</script>

<style></style>
