const types = {
  INIT_ROOM: 'INIT_ROOM',
  ADD_ROOM_OBJECTS: 'ADD_ROOM_OBJECTS',
  UPDATE_ROOM_OBJECTS: 'UPDATE_ROOM_OBJECTS',
  REMOVE_ROOM_OBJECTS: 'REMOVE_ROOM_OBJECTS',
};

export default {
  namespaced: true,
  state: {
    roomObjects: [],
  },
  getters: {
    roomObjects: state => state.roomObjects,
  },
  actions: {
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
      state.roomObjects = [];
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
