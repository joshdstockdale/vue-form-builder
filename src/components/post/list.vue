<template>
  <div class="columns is-multiline is-mobile">
      <div class="column is-half-mobile is-half-tablet is-one-third-desktop tile" v-for="(p, index) in posts"
        v-bind:key="p.id">
        <router-link :to="{ name: 'Post', params: { slug: p.slug }}" class="tile">
        <article class="box">
          <h3 class="title" v-html="p.title.rendered"></h3>
          <div class="subtitle">{{p.date}}</div>
          <div class="excerpt">
            <p v-html="p.excerpt.rendered"></p>
          </div>
        </article>
        </router-link>
      </div>
  </div>
</template>

<script>
export default {
  name: 'list',
  props: ['posts']
}
</script>

<style lang="sass">
$orange: #ff3600;

.excerpt p
  font-family: 'Montaga', Times, serif;

h3
  font-size: 1.2rem;
  line-height: 1.4rem;
  padding-bottom: 5px;

.subtitle
  font-size: 0.9rem;
  font-style: italic;
  color: $orange;

a.tile:hover
  transition: opacity .3s ease;
  opacity: 1;

a.tile
  color: #000;
  opacity: 0.8;

</style>