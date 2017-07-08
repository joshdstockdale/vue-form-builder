<template>
  <div>
    <div class="pages"
        v-for="(p, index) in pages"
        v-bind:key="p.id">
        <h2 v-html="p.title.rendered">
        </h2>
        <div v-if="typeof p.content.rendered !== 'undefined'" v-html="p.content.rendered">
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'detail',
    props: ['pages']
  }
</script>