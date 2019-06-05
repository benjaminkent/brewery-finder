<template lang="pug">
  .home-container
    header
      h1 Brinder
      h3 Brewery Finder
    .input-container
      label.search(for="search") 
        | Find a Brewery
        i.far.fa-beer
      input(
        id="search"
        type="text"
        v-model="searchValue"
        placeholder="Brewery Name, City, or State"
      )
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
      searchValue: ''
    }
  },
  watch: {
    searchValue: function() {
      axios
        .get(`https://api.openbrewerydb.org/breweries/search?query=${this.searchValue}&per_page=50`)
        .then(resp => this.breweries = resp.data)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../design/variables.scss';

.home-container {
  background-color: $black;
  min-height: 100vh;
}
header {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $yellow;

  h1 {
    margin: 15px 0 0 0;
    font-size: 44px;
    font-weight: 400;
    letter-spacing: 1px;
    line-height: 30px;
  }

  h3 {
    margin: 0 0 30px 0;
    font-size: 24px;
  }
}

.far {
  color: $yellow;
  margin-left: 5px;
}

.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .search {
    margin: 0;
    color: $white;
  }

  input {
    width: 90%;
    max-width: 500px;
    height: 25px;
    border-radius: 5px;
    border: 1px solid $yellow;
    text-indent: 10px;
    font-size: 12px;
  }
}
</style>


