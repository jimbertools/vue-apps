<template>
  <div>
    <h1>NAVBAR PAGE</h1>
    <div>
      <ul>
        <li v-for="(route, index) in $router.options.routes" :key="index">
          <a :href="`#${route.path}`">
            {{route.name}} - {{`#${route.path}`}}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
module.exports = {
  mounted() {}
};
</script>

<style scoped>
div {

}
</style>