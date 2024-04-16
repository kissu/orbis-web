<template>
  <div class="main-container">
    <iframe :src="webPageSource" width="1000px" height="1000px" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      webPageSource: 'https://essama-official.github.io/Settings/Orbis.EULA.html',
    };
  },
};
</script>

<style>
</style>
