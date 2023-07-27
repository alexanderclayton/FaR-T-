import React from 'react'
import { Authenticate } from './components/Authenticate'
import { Firestore } from './components/Firestore'
import './App.css'

import { initializeApp, FirebaseApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, Auth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyARTeq-Ax0jPpnuMHMZM8B3O0QE3KfdiIo",
  authDomain: "chat-f33cf.firebaseapp.com",
  projectId: "chat-f33cf",
  storageBucket: "chat-f33cf.appspot.com",
  messagingSenderId: "724002537601",
  appId: "1:724002537601:web:4b29d6635fbe74c7818d80",
  measurementId: "G-L3L2QWJVH4"
}

const firebaseApp: FirebaseApp = initializeApp(firebaseConfig)
export const auth: Auth = getAuth(firebaseApp)
export const authProvider = new GoogleAuthProvider()
authProvider.setCustomParameters({
  prompt: 'select_account',
})
export const db = getFirestore(firebaseApp)

const App: React.FC = () => {

  return (
    <div className="App">
      <h1>FaR(T) Chat</h1>
      <Authenticate />
      <Firestore />
    </div>
  )
}

export default App
