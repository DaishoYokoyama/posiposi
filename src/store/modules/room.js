const types = {
  ADD_OBJECTS: 'ADD_OBJECTS',
  UPDATE_OBJECTS: 'UPDATE_OBJECTS',
  REMOVE_OBJECTS: 'REMOVE_OBJECTS',
};

export default {
  namespaced: true,
  state: {
    objescts: [],
  },
  getters: {},
  actions: {},
  mutations: {
    [types.ADD_OBJECTS](state, { objects }) {
      state.objects = [...state.objects, ...objects];
    },
    [types.UPDATE_OBJECTS](state, { objects }) {
      const objectIds = objects.map('id');
      state.objects = [...state.objects.filter(obj => !objectIds.includes(obj.id)), ...objects];
    },
    [types.REMOVE_OBJECTS](state, { objectIds }) {
      state.objects = [...state.objects.filter(obj => !objectIds.includes(obj.id))];
    },
  },
};
