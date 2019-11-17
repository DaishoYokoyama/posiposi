<template>
  <div id="app">
    <router-view />
    <notifications group="default" position="top center" :style="{ margin: '10px' }" />
    <Loader v-if="isLoading" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Loader from '@/components/Loader';

export default {
  components: {
    Loader,
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
    }),
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
  margin: 0;

  font-size: $font-size-regular;
  font-weight: 400;
  font-family: 'Noto Sans JP', 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  width: 100%;
  height: 100%;
}
</style>
