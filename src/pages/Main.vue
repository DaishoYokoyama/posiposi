<template>
  <div class="main">
    <section class="side-menu"
             :class="{ 'is-close': isSideMenuClosed }">
      <template v-if="!isSideMenuClosed">
        <router-link class="menu-item"
                     active-class="is-active"
                     tag="button"
                     :to="{ name: 'pos' }">
          POS
        </router-link>
      </template>
      <button class="knob"
              @click.stop="isSideMenuClosed = !isSideMenuClosed">
        <span class="text"
              :class="{
            'is-turn': isSideMenuClosed,
          }">＜</span>
      </button>
    </section>
    <router-view class="content" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSideMenuClosed: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  background: $base-color;

  display: flex;

  .side-menu {
    flex: 0 0 auto;
    width: 72px;
    height: 100%;
    background: $sub-color;
    box-shadow: $box-shadow-normal;
    z-index: 1;

    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    transition: $transition-fast;

    &.is-close {
      width: 0;
    }

    .menu-item {
      @extend %empty-button;
      width: 48px;
      height: 48px;
      margin-top: 10px;

      background: $base-color;
      border: none;
      border-radius: 10px;

      transition: $transition-fast;

      &:hover {
        background: darken($base-color, 20%);
      }
      &:active {
        transform: scale(0.9);
        background: darken($base-color, 20%);
      }
      &.is-active {
        border: 2px solid $border-color-active;
      }
    }

    .knob {
      @extend %empty-button;
      width: 20px;
      height: 50px;

      font-weight: bold;
      background: $sub-color;
      border-radius: 0 5px 5px 0;

      position: absolute;
      bottom: 10px;
      right: -19px;

      &:hover {
        > .text {
          transform: translateX(-2px);
        }
      }

      > .text {
        color: $base-color;
        transition: $transition-fast;
        &.is-turn {
          transform: rotate(180deg);
        }
      }
    }
  }

  .content {
    flex: 1 1 auto;
    z-index: 0;
  }
}
</style>
