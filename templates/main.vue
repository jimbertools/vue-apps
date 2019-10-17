<template>
  <div>
    <navbar></navbar>All content will appear below the horizontal line.
    <hr />
    <router-view></router-view>
  </div>
</template>
<script>
module.exports = {
  mounted() {
      alert('fdsfdsa')
  }
};
</script>