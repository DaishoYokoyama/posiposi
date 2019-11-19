<template>
  <transition name="fade">
    <div class="overlay">
      <ScaleLoader loading="loading"
                   :color="color"
                   :width="`${width}px`"
                   :height="`${height}px`" />
    </div>
  </transition>
</template>

<script>
import ScaleLoader from 'vue-spinner/src/ScaleLoader';

export default {
  props: {
    color: {
      type: String,
      default: '#4c7ee8',
    },
    width: {
      type: Number,
      default: 5,
    },
    height: {
      type: Number,
      default: 25,
    },
  },
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
