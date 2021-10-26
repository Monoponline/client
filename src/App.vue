<template>
  <main>
    <router-view />
  </main>
</template>

<style scoped>
* {
  box-sizing: border-box;
  outline: 0px;
}

main {
  display: block;
  position: absolute;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  top: 20px;
  left: 20px;
  bottom: 40px;
  right: 40px;
  font-family: 'Hammersmith One';
  color: #2e464d;
  border-radius: 20px;
  background: #c0e3e2;
  perspective: 1000px;
}
main:before {
  /* content: 'Click me!'; */
  display: block;
  position: absolute;
  width: 100%;
  bottom: 60px;
  left: 0px;
  text-align: center;
  text-transform: uppercase;
  color: rgba(46, 70, 77, 0.2);
}
</style>
