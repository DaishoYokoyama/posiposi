<template>
  <div class="pos">
    <template v-if="roomId === null">
      <button class="create-room-button">
        <AddIcon class="add-icon" />
        <span>新しく部屋を作る</span>
      </button>
    </template>

    <template v-else>
      <section class="room-info">
        <h2 class="room-id">{{ `RoomID: ${roomId}` }}</h2>
        <button class="copy-button" @click.stop="onCopyButtonClick">
          <CopyIcon />
        </button>
      </section>
    </template>
  </div>
</template>

<script>
import { copyToClipboard } from '@/util';

import CopyIcon from '@/assets/images/copy-icon.svg';
import AddIcon from '@/assets/images/add-icon.svg';

export default {
  props: {
    roomId: {
      type: String,
      default: null,
    },
  },
  components: {
    CopyIcon,
    AddIcon,
  },
  methods: {
    onCopyButtonClick() {
      const copyResult = copyToClipboard(location.href);
      if (copyResult) {
        this.$notify({
          group: 'default',
          type: 'success',
          text: '共有用アドレスをコピーしました！',
        });
      } else {
        this.$notify({
          group: 'default',
          type: 'error',
          text: '共有用アドレスのコピーに失敗しました！',
        });
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
};
</script>

<style lang="scss" scoped>
.pos {
  width: 100%;
  height: 100%;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .room-info {
    width: auto;
    padding: 10px;
    background: $base-color;
    box-shadow: $box-shadow-strong;
    border-radius: 10px;

    position: absolute;
    top: 10px;
    left: 10px;

    display: flex;
    align-items: center;

    color: $font-color-normal;

    > .room-id {
      font-size: $font-size-regular;
      font-weight: 300;
    }

    > .copy-button {
      width: 24px;
      height: 24px;
      margin-left: 16px;
      padding: 4px;
      background: $base-color;
      border: 1px solid $border-color-normal;
      border-radius: 5px;

      transition: $transition-fast;
      fill: currentColor;

      &:focus {
        outline: none;
      }

      &:hover {
        background: darken($base-color, 16%);
      }

      &:active {
        background: darken($base-color, 16%);
      }
    }
  }

  .create-room-button {
    @extend %empty-button;
    height: 500px;
    width: 100%;
    max-width: 1000px;
    margin: 0 30px;
    font-size: $font-size-x-large;

    border: 5px dotted $border-color-normal;
    border-radius: 20px;

    transition: $transition-fast;

    &:hover {
      background: darken($base-color, 16%);
      border: 5px dotted darken($border-color-normal, 16%);
    }

    > .add-icon {
      fill: currentColor;
      width: 32px;
      height: 32px;
      margin-right: 16px;
    }
  }
}
</style>
