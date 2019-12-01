<template>
  <div class="circle-object"
       :style="style">
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      default: '#fefefe',
    },
  },
  computed: {
    style() {
      return {
        position: 'absolute',
        left: `${this.x}px`,
        top: `${this.y}px`,
        width: `${this.width}px`,
        height: `${this.height}px`,
        background: this.color,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.circle-object {
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(#000, 0.3);
}
</style>