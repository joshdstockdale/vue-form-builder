<template>
  <div id="app">
    <topbar></topbar>
    <div class="columns">
      <div class="column is-2-desktop is-3-tablet">
        <sidebar></sidebar>
      </div>
      <div id="content" class="column">
          <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import topbar from './components/common/topbar.vue'
import sidebar from './components/common/sidebar.vue'

export default {
  name: 'app',
  components: {
    topbar,
    sidebar
  }
}
</script>

<style lang="sass">
@import "./assets/sass/utilities/initial-variables.sass";
$blue: #72d0eb;
$pink: #ffb3b3;
$pink-invert: #fff;
$family-serif: 'Montaga', Times, serif;
$family-sans-serif: 'Open Sans', Helvetica, sans;
$orange: #ff3600;
$orange-invert: #fff;
$primary: $orange
$primary-invert: $orange-invert;
$danger: $red;
$family-primary: $family-sans-serif;

@import "./assets/bulma.sass";

#content
  padding-right: 24px

</style>
