<template lang="pug">
  .home-container
    .hero-grid
      .hero-background
      .header
        header(@click="goHome")
          .sign
            h1.neon-sign.neon Br
            h1.neon-sign(:class="{ neon: flickerOff }") e
            h1.neon-sign.neon w Lo
          h3.locator Brewery Locator
      .input-container-box
        .input
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
      p.previous-margin.disabled(v-if="pageNumber === 1") Previous
      p.next(
        @click="next"
        v-if="breweries.length === 20"
        v-scroll-to="'#list-top'"
      ) Next
      p.disabled(v-if="breweries.length < 20") Next
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
      pageNumber: 1,
      flickerOff: true,
      randomNumber: null
    }
  },
  mounted () {
    this.generateRandomNumber()
    let queryString = this.$route.query.parameter
    let page = Number(this.$route.query.page)
    if (!queryString) { return }
    this.searchValue = queryString
    this.pageNumber = page
    axios
      .get(`https://api.openbrewerydb.org/breweries/search?query=${queryString}&page=${page}&per_page=20`)
      .then(resp => this.breweries = resp.data)
  },
  updated () {
    if (this.pageNumber > 1 && !this.breweries.length) {
      this.pageNumber = 1
      this.fetchBreweries(this.searchValue, 1)
    }
  },
  methods: {
    fetchBreweries (value, number) {
      axios
        .get(`https://api.openbrewerydb.org/breweries/search?query=${value}&page=${number}&per_page=20`)
        .then(resp => this.breweries = resp.data)
    },
    next () {
      this.pageNumber++
      this.$router.push({ query: { parameter: this.searchValue, page: this.pageNumber }})
      this.fetchBreweries(this.searchValue, this.pageNumber)
    },
    previous () {
      this.pageNumber--
      this.$router.push({ query: { parameter: this.searchValue, page: this.pageNumber }})
      this.fetchBreweries(this.searchValue, this.pageNumber)
    },
    goHome () {
      this.$router.push({ name: 'home' })
      this.breweries = []
      this.searchValue = ''
    },
    generateRandomNumber () {
      setInterval(() => {
        this.randomNumber = Math.floor(Math.random() * 4)
      }, 125)
    }
  },
  watch: {
    searchValue: function() {
      // fix api call on home button bug
      if (!this.searchValue) { return }
      // handle going back and not going to first page
      // and set new inquires to start at page 1
      // bug will still exist for a user only searching with on character
      if (this.searchValue.length === 1) {
        this.pageNumber = 1
      }

      this.$router.push({ query: { parameter: this.searchValue, page: this.pageNumber }})
      this.fetchBreweries(this.searchValue, this.pageNumber)
    },
    randomNumber: function() {
      if (this.randomNumber === 1) {
        this.flickerOff = false
      } else {
        this.flickerOff = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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

    header {
      color: $yellow;
      border-bottom: 1px solid #333;
      background: repeating-linear-gradient(
        135deg,
        #333,
        #333 5px,
        $black 5px,
        $black 15px
      );
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      cursor: pointer;
      padding: 5px 0 5px 0;

      .sign {
        display: flex;
        flex-direction: row;
        justify-content: center;
        color: #777;

        .neon-sign {
          font-family: 'Megrim', cursive;
          margin: 0;
          font-size: 44px;
          font-weight: 100;
          letter-spacing: 1px;
        }

        .neon {
          color: $blue;
          text-shadow: 0 0 15px #fff, 0 0 25px #fff, 0 0 35px #fff, 0 0 40px $blue, 0 0 50px $blue, 0 0 60px $blue, 0 0 75px $blue, 0 0 90px $blue;
          text-shadow: 0 0 5px #fff, 0 0 15px #fff, 0 0 25px #fff, 0 0 50px $blue, 0 0 30px $blue, 0 0 40px $blue, 0 0 50px $blue, 0 0 40px $blue;
        }
      }
      
      .locator {
        font-size: 24px;
        text-align: center;
        margin: 0;
        color: $yellow;
      }
    }
  }

  .input-container-box {
    grid-area: 3 / 1 / 4 / 4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    .input {
      width: 90%;
      max-width: 500px;

      .search {
        margin: 0;
        color: $white;
        font-size: 20px;
      }

      input {
        width: 100%;
        height: 25px;
        border-radius: 5px;
        border: 1px solid $yellow;
        text-indent: 10px;
        font-size: 12px;
      }
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

  .previous, .next {
    cursor: pointer;
  }

  .previous-margin {
    margin-right: 20px;
  }

  .previous:hover, .next:hover {
    color: $blue;
  }

  .disabled {
    color: #a07a2050;
    cursor: not-allowed;
  }
}

@media(max-width: 999px) {
  .hero-grid {
    .header {
      header {
        padding: 0;
      }
    }
  }
}

@media(min-width: 1000px) {
  .hero-grid {
    grid-template-rows: 1fr 2fr 2fr 2fr;
  }
}
</style>


