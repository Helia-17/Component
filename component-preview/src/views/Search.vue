<template>
  <div id="app">
    <iframe :src="source"></iframe>
  </div>
</template>

<script>
export default {
  name: "Search",
  data: () => ({
    source: "/TimerInput/index.html",
  }),
};
</script>

<style>
iframe {
  width: 100vw;
  height: 80vh;
}
</style>
