import firebase from 'firebase/app';
import 'firebase/firestore';

const clientCredentials = {
  apiKey: 'AIzaSyC05PBxh7IzzIToYMiq2euVRPAKW7zvLmw',
  authDomain: 'refri-6254f.firebaseapp.com',
  projectId: 'refri-6254f',
  storageBucket: 'refri-6254f.appspot.com',
  messagingSenderId: '618011802658',
  appId: '1:618011802658:web:f2aa54480cf72e27ae5e7b',
};

if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials);
}

export default firebase;
