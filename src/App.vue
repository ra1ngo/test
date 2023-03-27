<template>
  <div id="app">
    <portal-target name="app-overlay" />
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  h3 {
    margin: 0;
  }
}
</style>
