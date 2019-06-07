<template lang="pug">
  .brewery-container
    .back-button
      router-link.home(to="/") Home
    header
      h1 {{ brewery.name }}
      p Brewery Type: {{ brewery.brewery_type }}
    .map-container(v-if="brewery.latitude")
      GmapMap(
        :center="breweryLocation"
        :zoom="13"
        style="max-width: 500px; height: 300px"
      )
        GmapMarker(
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center=m.position"
        )
    .details-container
      .address
        p {{ brewery.street }}
        p {{ brewery.city }}, {{ brewery.state }}
      p(v-if="brewery.phone") Phone: {{ brewery.phone }}
      p(v-if="brewery.website_url") 
        | Email: 
        a(:href="brewery.website_url" target="_blank") {{ brewery.website_url }}
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
}

header {
  margin: 0 0 10px 0;
  padding: 10px 20px;
  background: repeating-linear-gradient(
  135deg,
  #333,
  #333 5px,
  $black 5px,
  $black 15px
  );
}

.map-container {
  margin: 0 20px;
}

.back-button {
  padding: 10px 0;

  .home {
    margin-left: 20px;
  }
}

.details-container {
  margin: 20px;
}

.address {
  margin-bottom: 10px;
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

