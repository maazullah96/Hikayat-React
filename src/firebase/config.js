// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore'

import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider
} from 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBWlnf9Ir7hlpohYvGTsLyUsc-4MrZYSNw',
  authDomain: 'hikayat-app-dfbfa.firebaseapp.com',
  databaseURL:
    'https://hikayat-app-dfbfa-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'hikayat-app-dfbfa',
  storageBucket: 'hikayat-app-dfbfa.appspot.com',
  messagingSenderId: '19718006834',
  appId: '1:19718006834:web:b724f6e84d4a2a69c4742b',
  measurementId: 'G-CY4ELES8EF'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()
const twitterProvider = new TwitterAuthProvider()

export { db, auth, googleProvider, githubProvider, twitterProvider }
// Initialize Firebase
