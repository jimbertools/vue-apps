<template>
  <div>
    <h1>APPVUE PAGE</h1>

    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
module.exports = {
  components: {
    navbar: httpVueLoader(`../components/navbar.vue`)
  },
  mounted() {}
};
</script>

<style scoped>
div {

}
</style>