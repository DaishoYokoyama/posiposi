import firebase from 'firebase/app';
const firestore = firebase.firestore();

const rooms = firestore.collection('rooms');
const objects = firestore.collection('roomObjects');

export async function createRoom(roomId) {
  return rooms.doc(roomId).set({ roomId });
}

export async function isExistsRoom(roomId) {
  const doc = await rooms.doc(roomId).get();
  return doc.exists;
}

export async function getRoomObjectRef(roomId) {
  return objects.where('roomId', '==', roomId);
}

export default {
  createRoom,
};
