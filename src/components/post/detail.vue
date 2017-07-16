<template>
  <div>
    <div class="posts columns is-multiline content"
        v-for="p in posts"
        v-bind:key="p.id">
        <div class="is-12 column">
          <h2 v-html="p.title.rendered"></h2>
          <div class="subtitle">{{p.date}}</div>
        </div>

        <div class="column tile">
          <quill-editor ref="myTextEditor"
                v-model="input"
                :options="editorOption">
          </quill-editor>

        </div>
    </div>
  </div>
</template>

<script>
  import marked from 'marked'
  import _ from 'lodash'
  import { quillEditor } from 'vue-quill-editor'

  export default {
    name: 'detail',
    data () {
      return {
        name: 'app',
        content: '<h2>Example</h2>',
        editorOption: {
          modules: {
            // toolbar: [
            //   [{ header: [1, 2, false] }],
            //   ['bold', 'italic', 'underline'],
            //   ['image', 'code-block']
            // ]
          },
          placeholder: 'Compose an epic...',
          theme: 'snow'  // or 'bubble'
        }
      }
    },
    props: ['posts', 'input'],
    components: {
      quillEditor
    },
    // computed: {
    //   compiledMarkdown: function () {
    //       return marked(this.input, { sanitize: false })
    //     }
    // },
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

.ql-editor
  height: 100vh;

html
  overflow-y: hidden;
</style>