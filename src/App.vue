<template>
  <main>
    <div class="text-center mt-3">
      <router-link active-class="text-green-500" to="/">Home</router-link> |
      <router-link active-class="text-green-500" to="/about">About</router-link>
      |
      <router-link active-class="text-green-500" to="/board">Board</router-link>
    </div>
    <router-view />
  </main>
</template>
