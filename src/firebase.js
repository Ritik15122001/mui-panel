import { initializeApp } from 'firebase/app';
import { child, getDatabase, push, ref, remove, update, onValue } from 'firebase/database';
import { getDownloadURL, getStorage, listAll, uploadBytes } from 'firebase/storage';
import { ref as sRef } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: 'AIzaSyC0mPMx5r6M7_4dtrcp5XTd6ZQ10iBul-g',
//   authDomain: 'mui-panel.firebaseapp.com',
//   databaseURL: 'https://mui-panel-default-rtdb.firebaseio.com',
//   projectId: 'mui-panel',
//   storageBucket: 'mui-panel.appspot.com',
//   messagingSenderId: '479247256691',
//   appId: '1:479247256691:web:a122b042bf8f68791fee06',
//   measurementId: 'G-1HFHMSTYGY',
// };
const firebaseConfig = {
  apiKey: 'AIzaSyBU30CqhdM2kIqcZXMUQrfDiC0j9VhpfBc',
  authDomain: 'mui-panel-ce6a6.firebaseapp.com',
  databaseURL: 'https://mui-panel-ce6a6-default-rtdb.firebaseio.com',
  projectId: 'mui-panel-ce6a6',
  storageBucket: 'mui-panel-ce6a6.appspot.com',
  messagingSenderId: '571997720741',
  appId: '1:571997720741:web:fa111b137c726f2e423d4c',
  measurementId: 'G-20B3NW0WP7',
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

export const readFirebase = (path) => {
  const dataRef = ref(db, path);

  return new Promise((resolve, reject) => {
    onValue(
      dataRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const dataKeys = Object.keys(data);
          const dataArray = dataKeys.map((item) => ({
            key: item,
            ...data[item],
          }));
          // console.log('dataArray-->', dataArray);
          resolve(dataArray);
        } else {
          // Handle the case where there is no data
          resolve([]);
        }
      },
      (error) => {
        // Handle any errors that occur.
        console.error('Error reading Firebase data:', error);
        reject(error);
      },
    );
  });
};

export const uploadImageToFirebase = async (pathName, uploadedImage) => {
  const allImagesRef = sRef(storage, `${pathName}/`);

  try {
    if (uploadedImage) {
      const imageRef = sRef(storage, `${pathName}/${uploadedImage.name}`);
      const existingImages = await listAll(allImagesRef);
      const imageExists = existingImages.items.some((item) => item.name === uploadedImage.name);

      if (!imageExists) {
        // Image doesn't exist, so upload it
        await uploadBytes(imageRef, uploadedImage);
      }
      // await uploadBytes(imageRef, uploadedImage);
      const imageURL = await getDownloadURL(imageRef);

      return imageURL;
      // const response = await listAll(allImagesRef);
      // const latest_image = response.items[response.items.length - 1];
      // const imageURL = await getDownloadURL(latest_image);
      // return imageURL;
    }
  } catch (err) {
    alert('image upload failed');
  }
};

export { db };
