import firebase from 'firebase/app';
const firestore = firebase.firestore();

const rooms = firestore.collection('rooms');

export async function createRoom(roomId) {
  return rooms.doc(roomId).set({ roomId });
}

export async function isExistsRoom(roomId) {
  const doc = await rooms.doc(roomId).get();
  return doc.exists;
}

export async function getRoomObjectsRef(roomId) {
  return rooms.doc(roomId).collection('objects');
}

export default {
  createRoom,
};
