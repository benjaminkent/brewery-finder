<template lang="pug">
  .brewery-container
    router-link(to="/") Home
    h1 {{ brewery.name }}
    p Brewery Type: {{ brewery.brewery_type }}
    p {{ brewery.street }}
    p {{ brewery.city }}, {{ brewery.state }}
    p(v-if="brewery.phone") Phone: {{ brewery.phone }}
    p(v-if="brewery.website_url") Email: {{ brewery.website_url }}
</template>

<script>
import axios from 'axios'

export default {
  name: 'brewery',
  data () {
    return {
      brewery: {}
    }
  },
  mounted () {
    axios
      .get(`https://api.openbrewerydb.org/breweries/${this.$route.params.breweryId}`)
      .then(resp => this.brewery = resp.data)
  }
}
</script>

<style lang="scss" scoped>
@import '../design/variables.scss';

.brewery-container {
  background-color: $black;
  min-height: 100vh;
  color: $white;
  padding: 20px;
}

a {
  color: $yellow;
}
</style>

