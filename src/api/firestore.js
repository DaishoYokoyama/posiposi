import firebase from 'firebase/app';
const firestore = firebase.firestore();

const rooms = firestore.collection('rooms');
const roomObjects = firestore.collection('roomObjects');

// TODO 然るべき場所に移動
const defaultFieldWidth = 800;
const defaultFieldHeight = 800;

export async function createRoom(roomId) {
  return rooms.doc(roomId).set({
    roomId,
    fieldWidth: defaultFieldWidth,
    fieldHeight: defaultFieldHeight,
  });
}

export async function getRoomInfo(roomId) {
  const doc = await rooms.doc(roomId).get();
  return doc.exists ? doc.data() : null;
}

export async function getRoomObjectRef(roomId) {
  return roomObjects.where('roomId', '==', roomId);
}

export async function createRoomObject(object) {
  return roomObjects.doc(object.objectId).set(object);
}

export default {
  createRoom,
  getRoomInfo,
  getRoomObjectRef,
};
