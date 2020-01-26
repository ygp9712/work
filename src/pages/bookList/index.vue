<template>
  <div class="container">
    <list-scroll></list-scroll>
    <list-content></list-content>
  </div>
</template>

<script>
import ListScroll from './components/scroll.vue';
import ListContent from './components/content.vue';
export default {
  components: {
    ListScroll,
    ListContent
  },
  data () {
    return {
      booksItem: {}
    }
  },
  mounted () { 
  }
}
</script>

<style lang="stylus" scoped>
  .container
    background: #f2f2f2;
    height: 100%;
    width: 100%;
</style>