import { initializeApp } from 'firebase/app';
import { child, getDatabase, push, ref, remove, update } from 'firebase/database';
import { getDownloadURL, getStorage, listAll, uploadBytes } from 'firebase/storage';
import { ref as sRef } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC0mPMx5r6M7_4dtrcp5XTd6ZQ10iBul-g',
  authDomain: 'mui-panel.firebaseapp.com',
  databaseURL: 'https://mui-panel-default-rtdb.firebaseio.com',
  projectId: 'mui-panel',
  storageBucket: 'mui-panel.appspot.com',
  messagingSenderId: '479247256691',
  appId: '1:479247256691:web:a122b042bf8f68791fee06',
  measurementId: 'G-1HFHMSTYGY',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);

export const addToFirebase = async (path, data) => {
  return push(ref(db, path), data);
};
export const removeFromFirebase = async (path) => {
  return remove(ref(db, path));
};

export const updateInFirebase = async (path, data) => {
  return update(ref(db, path), data);
};

export const uploadImageToFirebase = async (pathName, uploadedImage) => {
  const allImagesRef = sRef(storage, `${pathName}/`);

  try {
    if (uploadedImage) {
      const imageRef = sRef(storage, `${pathName}/${uploadedImage.name}`);
      await uploadBytes(imageRef, uploadedImage);
      const response = await listAll(allImagesRef);
      const latest_image = response.items[response.items.length - 1];
      const imageURL = await getDownloadURL(latest_image);
      return imageURL;
    }
  } catch (err) {
    alert('image upload failed');
  }
};

export { db };
