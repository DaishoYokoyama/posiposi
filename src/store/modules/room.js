import _ from 'lodash';
import * as util from '@/util';

const types = {
  INIT_ROOM: 'INIT_ROOM',
  SET_ROOM_INFO: 'SET_ROOM_INFO',
  ADD_ROOM_OBJECTS: 'ADD_ROOM_OBJECTS',
  UPDATE_ROOM_OBJECTS: 'UPDATE_ROOM_OBJECTS',
  REMOVE_ROOM_OBJECTS: 'REMOVE_ROOM_OBJECTS',
  SET_SCALE: 'SET_SCALE',
};

export default {
  namespaced: true,
  state: {
    roomInfo: null,
    roomObjects: [],
    scale: 1.0,
    minScale: 0.1,
    maxScale: 2.0,
  },
  getters: {
    fieldWidth: state => (state.roomInfo === null ? 0 : state.roomInfo.width),
    fieldHeight: state => (state.roomInfo === null ? 0 : state.roomInfo.height),
    roomObjects: state => state.roomObjects,
    playerObjects: state => _.filter(state.roomObjects, x => x.type === 'player'),
    scale: state => state.scale,
    canUpScale: state => state.scale < state.maxScale,
    canDownScale: state => state.scale > state.minScale,
  },
  actions: {
    init({ commit }) {
      commit(types.INIT_ROOM);
    },
    setRoomInfo({ commit }, { roomInfo }) {
      commit(types.SET_ROOM_INFO, { roomInfo });
    },
    addRoomObjects({ commit }, { roomObjects }) {
      commit(types.ADD_ROOM_OBJECTS, { roomObjects });
    },
    updateRoomObjects({ commit }, { roomObjects }) {
      commit(types.UPDATE_ROOM_OBJECTS, { roomObjects });
    },
    removeRoomObjects({ commit }, { ids }) {
      commit(types.REMOVE_ROOM_OBJECTS, { ids });
    },
    upScale({ commit, state }) {
      const { scale, maxScale } = state;
      commit(types.SET_SCALE, { scale: util.upScale(scale, maxScale) });
    },
    downScale({ commit, state }) {
      const { scale, minScale } = state;
      commit(types.SET_SCALE, { scale: util.downScale(scale, minScale) });
    },
    resetScale({ commit }) {
      commit(types.SET_SCALE, { scale: 1.0 });
    },
  },
  mutations: {
    [types.INIT_ROOM](state) {
      state.roomInfo = null;
      state.roomObjects = [];
    },
    [types.SET_ROOM_INFO](state, { roomInfo }) {
      state.roomInfo = roomInfo;
    },
    [types.ADD_ROOM_OBJECTS](state, { roomObjects }) {
      state.roomObjects = [...state.roomObjects, ...roomObjects];
    },
    [types.UPDATE_ROOM_OBJECTS](state, { roomObjects }) {
      const ids = roomObjects.map(x => x.id);
      state.roomObjects = [...state.roomObjects.filter(obj => !ids.includes(obj.id)), ...roomObjects];
    },
    [types.REMOVE_ROOM_OBJECTS](state, { ids }) {
      state.roomObjects = [...state.roomObjects.filter(obj => !ids.includes(obj.id))];
    },
    [types.SET_SCALE](state, { scale }) {
      state.scale = scale;
    },
  },
};
