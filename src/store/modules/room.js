const types = {
  INIT_ROOM: 'INIT_ROOM',
  SET_ROOM_INFO: 'SET_ROOM_INFO',
  ADD_ROOM_OBJECTS: 'ADD_ROOM_OBJECTS',
  UPDATE_ROOM_OBJECTS: 'UPDATE_ROOM_OBJECTS',
  REMOVE_ROOM_OBJECTS: 'REMOVE_ROOM_OBJECTS',
};

export default {
  namespaced: true,
  state: {
    roomInfo: null,
    roomObjects: [],
  },
  getters: {
    fieldWidth: state => (state.roomInfo === null ? 0 : state.roomInfo.fieldWidth),
    fieldHeight: state => (state.roomInfo === null ? 0 : state.roomInfo.fieldHeight),
    roomObjects: state => state.roomObjects,
  },
  actions: {
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
  },
};
