<template >
  <div>
    <transition name="component-fade" mode="out-in">
      <list v-if="slug == ''" :pages="pages"></list>
    </transition>

    <transition name="component-fade" mode="out-in">
      <detail id="editor" v-if="slug !== ''" :pages="pages" :input="content"></detail>
    </transition>

  </div>
</template>

<script>
import request from 'superagent'
import detail from './page/detail.vue'
import config from '../config.json'

export default {
  name: 'page',
  props: {
    slug: {
      type: String,
      default: ''
    }
  },
  components:{
    detail
  },
  data (){
    return {
      pages: []
    }
  },
  watch: {
    'slug' (to, from) {
      // react to route changes...
      this.getPages(res => {this.pages = res})
    }
  },
  created: function () {
    this.getPages(res => {this.pages = res})
  },
  methods: {
    getPages: function(cb){
      let query = {}
      if(this.slug !== ''){
        // Only run if slug
        query = {slug: this.slug}
        request
          .get(config.domain + '/wp-json/wp/v2/pages')
          .query(query) // query string
          .end((err, res) =>  cb( JSON.parse(res.text) || err ))
      }
    }
  },
  afterMount: function(){
    console.log('slug:', this.slug)
    console.log('srtby:', this.sortby)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
