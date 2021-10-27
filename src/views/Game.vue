<template>
  <main>
    <board />
  </main>
  <nav
    class="
      rounded-xl
      fixed
      bottom-0
      inset-x-0
      bg-blue-100
      flex
      justify-between
      text-sm text-green-700
      uppercase
      font-mono
    "
  >
    <button
      class="
        w-full
        block
        py-3
        px-3
        text-center
        hover:bg-green-200 hover:text-green-800
        transition
        duration-300
        rounded-xl
      "
    >
      Acheter des maisons</button
    ><button
      class="
        w-full
        block
        py-3
        px-3
        text-center
        hover:bg-green-200 hover:text-green-800
        transition
        duration-300
        rounded-xl
      "
    >
      Faire un échange</button
    ><button
      class="
        w-full
        block
        py-3
        px-3
        text-center
        hover:bg-green-200 hover:text-green-800
        transition
        duration-300
        rounded-xl
      "
    >
      Lancer les dés
    </button>
  </nav>
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
