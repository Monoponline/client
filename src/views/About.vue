<template>
  <main>
    <div class="text-center text-lg mt-3">
      <router-link active-class="text-green-500" to="/">Home</router-link> |
      <router-link active-class="text-green-500" to="/about">About</router-link>
    </div>
    <img class="img-center mt-10 w-70" alt="Vue logo" src="@/assets/logo.png" />
    <div class="text-center mt-10">
      <h1 class="text-xl">
        Monoponline is an
        <a class="link" href="https://github.com/Monoponline">open source</a>
        online Monopoly game created by
        <a class="link" href="https://www.skydonald.com">SkyDonald</a> and
        <a
          class="link"
          href="https://github.com/Monoponline/server/graphs/contributors"
        >
          its contributors</a
        >
      </h1>
    </div>
  </main>
</template>

<style scoped>
.img-center {
  @apply text-center mx-auto flex;
}
.link {
  @apply text-green-700 hover:text-green-500 transition-all ease-in;
}
</style>
