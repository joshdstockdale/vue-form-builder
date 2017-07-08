<template >
  <div>
    <transition name="component-fade" mode="out-in">
      <list v-if="slug == ''" :posts="posts"></list>
    </transition>

    <transition name="component-fade" mode="out-in">
      <detail id="editor" v-if="slug !== ''" :posts="posts" :input="content"></detail>
    </transition>
  </div>
</template>

<script>
import request from 'superagent'
import detail from './post/detail.vue'
import list from './post/list.vue'
import config from '../config.json'
export default {
  name: 'post',
  props: {
    slug: {
      type: String,
      default: ''
    },
    sortby: {
      type: String,
      default: ''
    }
  },
  components:{
    detail,
    list
  },
  data (){
    return {
      posts: [],
      content: ""
    }
  },
  watch: {
    'slug' (to, from) {
      // react to route changes...
      this.posts = []
      this.content = ""
      this.getPosts(res => {this.posts = res; this.content = res[0].content.rendered;})
    }
  },
  created: function () {
    this.getPosts(res => {this.posts = res; this.content = res[0].content.rendered;})
  },
  methods: {
    getPosts: function(cb){
      let query = {}
      if(this.slug !== ''){
        query = {slug: this.slug}
      }else if(this.sortby !== ''){
        query = {sortby: this.sortby}
      }

      request
        .get(config.domain + '/wp-json/wp/v2/posts')
        .query(query) // query string
        .end((err, res) =>  cb( JSON.parse(res.text) || err ))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for <2.1.8 */ {
  opacity: 0;
}

</style>
