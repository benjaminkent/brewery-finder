<template lang="pug">
  .home-container
    .hero-grid
      .hero-background
      .header
        header
          h1
            b B
            | rew
            b L
            | o
          h3 Brewery Locator
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
    p.photo-credit Photo Credit: Cycle Brewing, St. Petersburg, FL
    BreweryList(
      :breweries="breweries"
    )
    .pagination(v-if="breweries.length !== 0")
      p.previous(
        @click="previous"
        v-if="pageNumber > 1"
        v-scroll-to="'#list-top'"
      ) Previous
      p.previous.disabled(v-if="pageNumber === 1" v-scroll-to="'#list-top'") Previous
      p(
        @click="next"
        v-if="breweries.length === 20"
        v-scroll-to="'#list-top'"
      ) Next
      p.disabled(v-if="breweries.length < 20" v-scroll-to="'#list-top'") Next
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
      this.pageNumber++
      axios
        .get(`https://api.openbrewerydb.org/breweries/search?query=${this.searchValue}&page=${this.pageNumber}&per_page=20`)
        .then(resp => this.breweries = resp.data)
    },
    previous () {
      this.pageNumber--
      axios
        .get(`https://api.openbrewerydb.org/breweries/search?query=${this.searchValue}&page=${this.pageNumber}&per_page=20`)
        .then(resp => this.breweries = resp.data)
    }
  },
  watch: {
    searchValue: function() {
      this.pageNumber = 1
      axios
        .get(`https://api.openbrewerydb.org/breweries/search?query=${this.searchValue}&page=1&per_page=20`)
        .then(resp => this.breweries = resp.data)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../design/variables.scss';

.home-container {
  background-color: $black;
  min-height: 92vh;
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
    background: repeating-linear-gradient(
      135deg,
      #333,
      #333 5px,
      $black 5px,
      $black 15px
    );
    border-bottom: 1px solid #333;

    header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;

      h1 {
        margin: 0;
        font-size: 44px;
        font-weight: 100;
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

.photo-credit {
  color: #aaa;
  margin: 0;
  font-weight: 100;
  font-style: italic;
  margin-left: 2%;
  font-size: 12px;
}

.far {
  color: $yellow;
  margin-left: 5px;
}

.pagination {
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  width: 80%;
  margin: 0 auto;
  padding: 20px 0 50px 0;

  p {
    text-decoration: underline;
    color: $yellow;
    margin: 0;
  }

  .previous {
    margin-right: 20px;
  }

  .disabled {
    color: #a07a20;
    cursor: not-allowed;
  }
}

@media(min-width: 1000px) {
  .hero-grid {
    grid-template-rows: 1fr 2fr 2fr 2fr;
  }
}
</style>


