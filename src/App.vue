<template lang="pug">
  .app-container
    router-view
    AppFooter
</template>

<script>
import AppFooter from './components/AppFooter'

export default {
  name: 'app',
  components: {
    AppFooter
  }
}
</script>

<style lang="scss">
.app-container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

body, html {
  margin: 0;
  height: 100%;
}
</style>
