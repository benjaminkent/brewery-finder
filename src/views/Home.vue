<template lang="pug">
  .home-container
    h1 this is the home page
    form(@submit.prevent="citySearch")
      label(for="search") City Name
      input(
        id="search"
        type="text"
        v-model="city"
        placeholder="Enter City Name"
      )
      button(type="submit") Search
    BreweryList(
      :breweries="breweries"
    )
</template>

<script>
import axios from 'axios'
import BreweryList from '../components/BreweryList'

export default {
  name: 'home',
  components: {
    BreweryList
  },
  data () {
    return {
      breweries: [],
      city: ''
    }
  },
  mounted () {
    axios
      .get('https://api.openbrewerydb.org/breweries')
      .then(resp => this.breweries = resp.data)
  },
  methods: {
    citySearch () {
      axios
        .get(`https://api.openbrewerydb.org/breweries?by_city=${this.city}`)
        .then(resp => this.breweries = resp.data)
      this.city = ''
    }
  }
}
</script>
