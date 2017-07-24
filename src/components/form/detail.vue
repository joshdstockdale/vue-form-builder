<template>
  <div>
    <builder></builder>
  </div>
</template>

<script>
  import builder from './form-builder/builder.vue'

  export default {
    name: 'detail',
    // data () {
    //   return {
    //   }
    // },
    props: ['forms', 'input'],
    components: {
      builder
    },
    computed: {

      // compiledMarkdown: function () {
      //     return marked(this.input, { sanitize: false })
      //   }
    },
    methods: {
      // update: _.debounce(function (e) {
      //   this.input = e.target.value
      // }, 300)
    }
  }
</script>

<style lang="sass">
@import "../../assets/sass/utilities/variables.sass";
@import "../../assets/sass/utilities/mixins.sass";

.ql-editor
  height: 100vh;

.flip-list-move
  transition: transform 0.5s;

.no-move
  transition: transform 0s;

.ghost
  opacity: .5;
  background: #C8EBFB;

.list-group
  min-height: 20px;

.list-group-item
  cursor: move;

.list-group-item i
  cursor: pointer;

</style>