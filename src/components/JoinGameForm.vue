<template>
  <div class="flex justify-center mt-16">
    <input
      placeholder="Game ID"
      v-model="gameId"
      class="
        text-green-100
        placeholder-green-100
        transition-all
        ease-in
        py-2
        px-4
        bg-green-500
        font-semibold
        rounded-lg
        shadow-md
        hover:bg-green-700
        focus:outline-none
        focus:ring-2
        focus:ring-green-400
        focus:ring-opacity-75
      "
    /><br />
    <button
      @click="joinGameClick()"
      class="
        ml-3
        transition-all
        ease-in
        py-2
        px-4
        bg-green-500
        text-green-100
        font-semibold
        rounded-lg
        shadow-md
        hover:bg-green-700
        focus:outline-none
        focus:ring-2
        focus:ring-green-400
        focus:ring-opacity-75
      "
    >
      Join Game
    </button>
  </div>
  <button
    @click="createGameClick()"
    class="
      ml-2
      mt-8
      transition-all
      ease-in
      py-2
      px-4
      bg-green-500
      text-green-100
      font-semibold
      rounded-lg
      shadow-md
      hover:bg-green-700
      focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75
    "
  >
    Create Game
  </button>
</template>

<script>
export default {
  name: 'JoinGameForm',
  emits: ['join-game', 'create-game'],
  data() {
    return {
      gameId: ''
    };
  },
  methods: {
    joinGameClick() {
      this.$emit('join-game', this.gameId);
    },
    createGameClick() {
      this.$emit('create-game');
    }
  }
};
</script>
