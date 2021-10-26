<template>
  <input
    placeholder="Username"
    v-model="username"
    class="
      text-green-100
      placeholder-green-100
      mt-12
      transition-all
      ease-in
      py-2
      px-4
      bg-green-500
      font-semibold
      rounded-lg
      shadow-md
      hover:bg-green-700
      focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75
    "
  /><br />
  <button
    @click="clicked()"
    class="
      mt-3
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
    Login
  </button>
</template>

<script>
export default {
  name: 'LoginForm',
  emits: ['clicked'],
  data() {
    return {
      username: ''
    };
  },
  methods: {
    clicked() {
      this.$emit('clicked', this.username);
    }
  },
  beforeMount() {
    this.username = this.$store.getters.getUsername ?? '';
  }
};
</script>
