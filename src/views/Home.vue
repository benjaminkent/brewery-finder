<template lang="pug">
  .home-container
    .hero-grid
      .hero-background
      .header
        header(@click="goHome")
          h1.neon-sign Brew Lo
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
  mounted () {
    let queryString = this.$route.query.parameter
    let page = this.$route.query.page
    if (!queryString) { return }
    this.searchValue = queryString
    this.pageNumber = page
    axios
      .get(`https://api.openbrewerydb.org/breweries/search?query=${queryString}&page=${page}&per_page=20`)
      .then(resp => this.breweries = resp.data)
  },
  methods: {
    next () {
      this.pageNumber++
      this.$router.push({ query: { parameter: this.searchValue, page: this.pageNumber }})
      axios
        .get(`https://api.openbrewerydb.org/breweries/search?query=${this.searchValue}&page=${this.pageNumber}&per_page=20`)
        .then(resp => this.breweries = resp.data)
    },
    previous () {
      this.pageNumber--
      this.$router.push({ query: { parameter: this.searchValue, page: this.pageNumber }})
      axios
        .get(`https://api.openbrewerydb.org/breweries/search?query=${this.searchValue}&page=${this.pageNumber}&per_page=20`)
        .then(resp => this.breweries = resp.data)
    },
    goHome () {
      this.$router.push({ name: 'home' })
      this.breweries = []
      this.searchValue = ''
    }
  },
  watch: {
    searchValue: function() {
      this.$router.push({ query: { parameter: this.searchValue, page: this.pageNumber }})
      axios
        .get(`https://api.openbrewerydb.org/breweries/search?query=${this.searchValue}&page=${this.pageNumber}&per_page=20`)
        .then(resp => this.breweries = resp.data)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../design/variables.scss';
@import url('https://fonts.googleapis.com/css?family=Megrim&display=swap');

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
    border-bottom: 1px solid #333;
    background: repeating-linear-gradient(
      135deg,
      #333,
      #333 5px,
      $black 5px,
      $black 15px
    );

    header {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      height: 100%;
      cursor: pointer;

      .neon-sign {
        // font-family: 'Lily Script One', cursive;
        font-family: 'Megrim', cursive;
        margin: 0;
        color: $neon;
        font-size: 44px;
        font-weight: 100;
        letter-spacing: 1px;
        line-height: 30px;
        text-align: center;
        text-shadow: 0 0 15px #fff, 0 0 25px #fff, 0 0 35px #fff, 0 0 40px $yellow, 0 0 50px $yellow, 0 0 60px $yellow, 0 0 75px $yellow, 0 0 90px $yellow;
      }
      
      h3 {
        font-size: 24px;
        text-align: center;
        margin: 5px 0 5px 0;
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
  font-weight: 100;
  font-style: italic;
  margin: 0 0 0 2%;
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


