<template lang="pug">
  .list-container
    ul(v-for="brewery in breweries")
      li
        h2 {{ brewery.name }}
        p {{ brewery.brewery_type }}
        .address
          p {{ brewery.street }}
          p {{ brewery.city }}
          p {{ brewery.state }}
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

</style>

