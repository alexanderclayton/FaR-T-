import { useState, ChangeEvent } from 'react'
import { auth, authProvider } from '../App'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'

export const Authenticate: React.FC = () => {

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const signIn = async (): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      console.log('Successfully signed in!')
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error('Error signing in user', error.message as string)
      }
    }
  }

  const createAccount = async (): Promise<void> => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      console.log('Successfully created user!')
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error('Error creating User:', error.message as string)
      }
    }
  }

  const signInWithGoogle = async (): Promise<void> => {
    try {
      await signInWithPopup(auth, authProvider)
      console.log('Successfully created user!')
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error('Error creating user', error.message as string)
      }
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth)
      console.log('Successfully logged user out!')
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error('Error signing out user', error.message as string)
      }
    }
  }

  const who = () => {
    console.log(auth?.currentUser?.email)
  }

  return (
    <div>
      <input
        placeholder="Email..."
        type="text"
        onChange={handleEmailChange}
      />
      <input
        placeholder="Password..."
        type="password"
        onChange={handlePasswordChange} 
      />
      <button onClick={signIn}>Sign In</button>
      <button onClick={createAccount}>Create Account</button>
      <button onClick={signInWithGoogle}>Sign In with Google</button>
      <button onClick={logout}>Logout</button>
      <button onClick={who}>Who's Logged In?</button>
    </div>
  )
}
