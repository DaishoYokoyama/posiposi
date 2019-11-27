<template>
  <div class="pos">
    <template v-if="roomId === null">
      <button class="create-room-button"
              @click.stop="onCreateRoomButtonClick">
        <AddIcon class="add-icon" />
        <span>新しく部屋を作る</span>
      </button>
    </template>

    <template v-else>
      <div class="viewport">
        <div class="field"
             :style="{ width: `${fieldWidth}px`, height: `${fieldHeight}px` }"
             @click.stop="onFieldClick($event)">
          <CircleObject v-for="playerObject in playerObjects"
                        :key="playerObject.objectId"
                        :x="playerObject.x"
                        :y="playerObject.y"
                        :size="playerObject.size"
                        :color="roleToColor(playerObject.role)" />
        </div>
      </div>
      <section class="room-info">
        <h2 class="room-id">{{ `RoomID: ${roomId}` }}</h2>
        <button class="copy-button"
                @click.stop="onCopyButtonClick">
          <CopyIcon />
        </button>
      </section>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import uuidv4 from 'uuid/v4';

import { copyToClipboard, roleToColor } from '@/util';
import { createRoom, getRoomInfo, createRoomObject, getRoomObjectRef } from '@/api/firestore';

import CircleObject from '@/components/CircleObject';

import CopyIcon from '@/assets/images/copy-icon.svg';
import AddIcon from '@/assets/images/add-icon.svg';

export default {
  data() {
    return {
      listener: {
        roomObject: null,
      },
    };
  },
  props: {
    roomId: {
      type: String,
      default: null,
    },
  },
  components: {
    CircleObject,
    CopyIcon,
    AddIcon,
  },
  methods: {
    roleToColor,
    ...mapActions({
      showLoading: 'showLoading',
      hideLoading: 'hideLoading',
      initRoom: 'room/init',
      setRoomInfo: 'room/setRoomInfo',
      addRoomObjects: 'room/addRoomObjects',
      updateRoomObjects: 'room/updateRoomObjects',
      removeRoomObjects: 'room/removeRoomObjects',
    }),
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
    async onCreateRoomButtonClick() {
      const roomId = uuidv4();

      this.showLoading();
      await createRoom(roomId);
      this.hideLoading();
      this.$router.push({ name: 'pos', params: { roomId } });
    },
    async setRoomObjectListener(roomId) {
      if (this.listener.roomObject) {
        // unsubscribe
        this.listener.roomObject();
      }

      const roomObject = await getRoomObjectRef(roomId);

      this.listener.roomObject = roomObject.onSnapshot(snapshot => {
        const changes = snapshot.docChanges();
        const adds = changes.filter(x => x.type === 'added').map(x => x.doc.data());
        const modifieds = changes.filter(x => x.type === 'modified').map(x => x.doc.data());
        const removes = changes.filter(x => x.type === 'removed').map(x => x.doc.data());
        if (adds.length > 0) this.addRoomObjects({ roomObjects: adds });
        if (modifieds.length > 0) this.updateRoomObjects({ roomObjects: modifieds });
        if (removes.length > 0) this.removeRoomObjects({ ids: removes.map(x => x.id) });
      });
    },
    async onFieldClick(e) {
      const playerObject = {
        objectId: uuidv4(),
        type: 'player',
        roomId: this.roomId,
        size: 100,
        x: e.offsetX,
        y: e.offsetY,
        role: 'dps',
      };

      await createRoomObject(playerObject);
    },
  },
  computed: {
    ...mapGetters({
      fieldWidth: 'room/fieldWidth',
      fieldHeight: 'room/fieldHeight',
      playerObjects: 'room/playerObjects',
    }),
  },
  async beforeRouteEnter(to, from, next) {
    if (!to.params.roomId) {
      next();
      return;
    }

    if (to.params.roomId) {
      const roomInfo = await getRoomInfo(to.params.roomId);
      if (roomInfo) {
        next(vm => {
          vm.setRoomInfo({ roomInfo });
          vm.setRoomObjectListener(to.params.roomId);
        });
        return;
      }

      next({ name: 'pos' });
    }
  },
  async beforeRouteUpdate(to, from, next) {
    const fromRoomId = from.params.roomId;
    const toRoomId = to.params.roomId;

    if (toRoomId && fromRoomId !== toRoomId) {
      const roomInfo = await getRoomInfo(to.params.roomId);
      if (roomInfo) {
        next(vm => {
          vm.setRoomInfo({ roomInfo });
          vm.setRoomObjectListener(to.params.roomId);
        });
      }
    } else {
      if (this.listener.roomObjects) {
        this.listener.roomObjects();
        this.listener.roomObjects = null;
      }
      this.initRoom();
    }
    next();
  },
  beforeRouteLeave(to, from, next) {
    if (this.listener.roomObject) {
      this.listener.roomObject.unscribe();
    }
    next();
  },
};
</script>

<style lang="scss" scoped>
.pos {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  .viewport {
    width: 100%;
    height: 100%;
    overflow: scroll;

    display: flex;
    align-items: center;
    justify-content: center;

    .field {
      position: relative;
      border: 1px solid #ddd;
      border-radius: 50%;
      box-shadow: 0 2px 6px rgba(#000, 0.16);
    }
  }

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
