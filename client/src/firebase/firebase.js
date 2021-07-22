import firebase from 'firebase'
import 'firebase/storage'

var firebaseConfig = {
  apiKey: "AIzaSyCdqkl869riQ8QBLNqB_CqoCIGou1TSIAI",
  authDomain: "marketplace-app-8ed18.firebaseapp.com",
  projectId: "marketplace-app-8ed18",
  storageBucket: "marketplace-app-8ed18.appspot.com",
  messagingSenderId: "500007243765",
  appId: "1:500007243765:web:6b4adca60fbf2d88f4dabc",
  measurementId: "G-JXS0945PQ3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const storage = firebase.storage()
export {
  storage, firebase as default
}