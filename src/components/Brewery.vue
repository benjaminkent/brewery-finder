<template lang="pug">
  .brewery-container
    router-link(to="/") Home
    h1 {{ brewery.name }}
    p Brewery Type: {{ brewery.brewery_type }}
    .map-container(v-if="brewery.latitude")
      GmapMap(
        :center="breweryLocation"
        :zoom="15"
        style="width: 90%; height: 300px"
      )
        GmapMarker(
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center=m.position"
        )
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
      brewery: {},
      breweryLocation: {},
      markers: [],
    }
  },
  mounted () {
    this.fetchBrewery()
  },
  methods: {
    fetchBrewery () {
      axios
        .get(`https://api.openbrewerydb.org/breweries/${this.$route.params.breweryId}`)
        .then(resp => {
          let lat = parseFloat(resp.data.latitude)
          let lng = parseFloat(resp.data.longitude)
          this.brewery = resp.data,
          this.breweryLocation = { lat: lat, lng: lng }
          this.markers.push({ position: {lat: lat, lng: lng} })
        })
    }
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

h1 {
  margin: 0;
}

p {
  margin: 0;
}
</style>

