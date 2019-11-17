<template>
  <transition name="fade">
    <div class="overlay">
      <ScaleLoader loading="loading" color="#4c7ee8" width="30" height="30" />
    </div>
  </transition>
</template>

<script>
import ScaleLoader from 'vue-spinner/src/ScaleLoader';

export default {
  components: {
    ScaleLoader,
  },
};
</script>

<style lang="scss" scoped>
.overlay {
  background: rgba(#000, 0.16);

  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
