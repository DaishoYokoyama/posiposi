import firebase from 'firebase/app';
const firestore = firebase.firestore();

const rooms = firestore.collection('rooms');
const roomObjects = firestore.collection('roomObjects');

const defaultFieldWidth = 800;
const defaultFieldHeight = 800;

export async function createRoom(id) {
  return rooms.doc(id).set({
    id,
    width: defaultFieldWidth,
    height: defaultFieldHeight,
  });
}

export async function getRoomInfo(id) {
  const doc = await rooms.doc(id).get();
  return doc.exists ? doc.data() : null;
}

export async function getRoomObjectRef(id) {
  return roomObjects.where('id', '==', id);
}

export async function createRoomObject(object) {
  return roomObjects.doc(object.id).set(object);
}

export default {
  createRoom,
  getRoomInfo,
  getRoomObjectRef,
};
