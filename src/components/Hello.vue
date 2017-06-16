<template>
  <div class="hello">
    <search></search>
    <liste></liste>
  </div>
</template>

<script>
  import Liste from '@/components/Liste'
  import Search from '@/components/Search'

  export default {
    name: 'hello',
    components: {
      liste: Liste,
      search: Search,
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
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