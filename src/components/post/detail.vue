<template>
  <div>
    <div class="posts columns is-multiline content"
        v-for="p in posts"
        v-bind:key="p.id">
        <div class="is-12 column">
          <h2 v-html="p.title.rendered"></h2>
          <div class="subtitle">{{p.date}}</div>
        </div>

        <div class="is-4-desktop is-12-tablet column tile">
          <textarea class="is-12 column" :value="input" @input="update"></textarea>
        </div>
        <div class="column" v-html="compiledMarkdown"></div>
    </div>
  </div>
</template>

<script>
  import marked from 'marked'
  import _ from 'lodash'

  export default {
    name: 'detail',
    props: ['posts', 'input'],
    created: function () {
      // this.input = this.
    },
    computed: {
      compiledMarkdown: function () {
          return marked(this.input, { sanitize: false })
        }
    },
    methods: {
      update: _.debounce(function (e) {
        this.input = e.target.value
      }, 300)
    }
  }
</script>

<style lang="sass">
@import "../../assets/sass/utilities/variables.sass";
@import "../../assets/sass/utilities/mixins.sass";

textarea
  display: inline-block;
  vertical-align: top;
  box-sizing: border-box;
  border: none;
  border-right: 1px solid #ccc;
  outline: none;
  background-color: #eee;
  padding: 5px !important;
  font-size: 0.95rem;
  font-weight: 400;
  font-family: 'Roboto Mono', monospace;
  color: #363636;
  height: 80vh

  @include touch
    height: 30vh
code
  color: #f66;

</style>