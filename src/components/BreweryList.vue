<template lang="pug">
  .list-container
    ul#list-top
      li(v-for="brewery in breweries") 
        router-link(:to="`/brewery/${brewery.id}`")
          .details
            h2 {{ brewery.name }}
            p {{ brewery.city }}, {{ brewery.state }}
</template>

<script>
export default {
  name: 'breweryList',
  props: {
    breweries: Array
  }
}
</script>

<style lang="scss" scoped>
ul {
  margin: 5px 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

li {
  min-width: 340px;
  max-width: 90%;
  background-color: #282523;
  margin: 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 2px #e6af2e50;
}

li:hover {
  box-shadow: 0px 0px 5px 2px #e6af2e;
}

a {
  text-decoration: none;
  color: $white;

  .details {
    padding: 10px;

    h2 {
      margin: 0;
      }
  
    p {
      margin: 0;
    }
  }
}
</style>

