<template lang="pug">
  .footer
    footer
      p.top-line
        | Made with
        i.far.fa-beer
        | in St. Petersburg, FL
      p.bottom-line
        | Benjamin Kent, 2019.
        a(href="https://www.benjaminkent.io/") benjaminkent.io
</template>

<script>
export default {
  name: 'appfooter'
}
</script>

<style lang="scss" scoped>
@import '../design/variables.scss';

.footer {
  background: repeating-linear-gradient(
    45deg,
    #333,
    #333 5px,
    $black 5px,
    $black 15px
  );
  border-top: 1px solid #333;
  margin: -25px;

  footer {
    margin: 0;
    padding: 25px 0;
  }
}

.fa-beer {
  color: $yellow;
  margin: 0 5px;
}

p {
  margin: 0;
  text-align: center;
  color: $white;
  font-size: 14px;
  font-weight: 100;
}

a {
  color: $yellow;
  margin-left: 5px;
}
</style>


