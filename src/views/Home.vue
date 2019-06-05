<template lang="pug">
  .home-container
    .hero-grid
      .hero-background
      .header
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
    .pagination(v-if="breweries.length !== 0")
      p(@click="previous") Previous
      p(@click="next") Next
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
      searchValue: '',
      pageNumber: 1
    }
  },
  methods: {
    next () {
      console.log('next')
    },
    previous () {
      console.log('previous')
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

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;

  .header {
    grid-area: 1 / 1 / 2 / 4;
    color: $yellow;
    height: 100px;

    header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;

      h1 {
        margin: 0;
        font-size: 44px;
        font-weight: 400;
        letter-spacing: 1px;
        line-height: 30px;
        text-align: center;
      }
      
      h3 {
        font-size: 24px;
        text-align: center;
        margin: 0;
      }
    }
  }

  .input-container {
    grid-area: 3 / 1 / 4 / 4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .search {
      margin: 0;
      color: $white;
      font-size: 20px;
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

  .hero-background {
    grid-area: 2 / 1 / 5 / 4;
    background-image: url('../assets/cycle1.jpg');
    background-size: cover;
    background-position: center;
  }
}

.far {
  color: $yellow;
  margin-left: 5px;
}

.pagination {
  color: $yellow;
  text-decoration: underline;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  width: 80%;
  margin: 0 auto;
  padding: 20px 0 50px 0;

  p {
    margin: 0;
  }

  p:first-child {
    margin-right: 20px;
  }
}

@media(min-width: 1000px) {
  .hero-grid {
    grid-template-rows: 1fr 2fr 2fr 2fr;
  }
}
</style>


