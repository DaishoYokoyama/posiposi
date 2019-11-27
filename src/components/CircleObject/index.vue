<template>
  <div class="circle-object"
       :style="style">
  </div>
</template>

<script>
// TODO performance  fix
// change functional component.

export default {
  props: {
    size: {
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
        width: `${this.size}px`,
        height: `${this.size}px`,
        background: this.color,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.circle-object {
  border-radius: 50%;
}
</style>