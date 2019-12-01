<template>
  <div class="scale-widget">
    <button class="minus-button"
            :disabled="!canMinus"
            @click.stop="$emit('minus')">-</button>
    <div class="value"
         @click.stop="$emit('reset')">
      {{ scale | toPer }}
    </div>
    <button class="plus-button"
            :disabled="!canPlus"
            @click.stop="$emit('plus')">+</button>
  </div>
</template>

<script>
export default {
  props: {
    scale: {
      type: Number,
      required: true,
    },
    canPlus: {
      type: Boolean,
      default: true,
    },
    canMinus: {
      type: Boolean,
      default: true,
    },
  },
  filters: {
    toPer(val) {
      return `${Math.floor(val * 100)} %`;
    },
  },
};
</script>

<style lang="scss" scoped>
.scale-widget {
  width: 130px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(#000, 0.3);

  display: flex;
  align-items: center;
  justify-content: center;

  .plus-button {
    border-radius: 0 5px 5px 0;
  }
  .minus-button {
    border-radius: 5px 0 0 5px;
  }

  .plus-button,
  .minus-button {
    flex: 0 0 25px;
    height: 25px;
    border: none;
    padding: 0;
    font-size: 20px;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: background-color 0.15s ease-out, color 0.15s ease-out;

    &:hover:not(:disabled) {
      cursor: pointer;
      background: rgba(#000, 0.16);
    }

    &:focus {
      outline: none;
    }
  }

  .value {
    flex: 1 1 auto;

    cursor: pointer;
    font-size: 16px;
    font-weight: 300;

    display: flex;
    align-items: center;
    justify-content: center;

    border-left: 1px solid #efefef;
    border-right: 1px solid #efefef;
  }
}
</style>