<template>
  <div>
    This is the About page
    <navbar></navbar>
    This is the About page
    
  </div>
</template>

<script>
module.exports = {
  components: {
    navbar: httpVueLoader(`../components/navbar.vue`)
  },
  mounted() {
  }
};
</script>
