import { useState, ChangeEvent } from 'react'
import { auth, authProvider } from '../App'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'

export const Authenticate: React.FC = () => {

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [message, setMessage] = useState<string>("")

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const signIn = async (): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      setMessage("Successfully signed in!")
      setEmail("")
      setPassword("")
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/wrong-password") {
          setMessage("Incorrect Password!")
        } else if (error.code === "auth/user-not-found") {
          setMessage("No user with that email found!")
        } else if (error.code === "auth/invalid-email") {
          setMessage("Must enter a valid email!")
        } else {
          console.error('Error signing in user', error.message as string)
          setMessage(`Error signing in user: ${error.code}`)
        }
      }
    }
  }

  const createAccount = async (): Promise<void> => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      setMessage("Successfully created user!")
      setEmail("")
      setPassword("")
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          setMessage("A user with that email address already exists!")
        } else if (error.code === "auth/invalid-email") {
          setMessage("Must enter a valid email!")
        } else {
          console.error('Error creating User:', error.message as string)
          setMessage(`Error creating user: ${error.code}`)
        }
      }
    }
  }

  const signInWithGoogle = async (): Promise<void> => {
    try {
      await signInWithPopup(auth, authProvider)
      setMessage("Successfully signed in!")
      setEmail("")
      setPassword("")
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error('Error signing in user', error.message as string)
        setMessage(`Error signing in user: ${error.code}`)
      }
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth)
      setMessage("Successfully logged user out!")
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error('Error signing out user', error.message as string)
        setMessage(`Error signing out user: ${error.code}`)
      }
    }
  }

  const who = () => {
    if (auth.currentUser === null) {
      setMessage("Nobody's logged in :(")
    } else {
      setMessage(auth?.currentUser?.email as string)
    }
  }

  return (
    <div>
      <input
        placeholder="Email..."
        value={email}
        type="text"
        onChange={handleEmailChange}
      />
      <input
        placeholder="Password..."
        value={password}
        type="password"
        onChange={handlePasswordChange}
      />
      <button onClick={signIn}>Sign In</button>
      <button onClick={createAccount}>Create Account</button>
      <button onClick={signInWithGoogle}>Sign In with Google</button>
      <button onClick={logout}>Logout</button>
      <button onClick={who}>Who's Logged In?</button>
      <h4>{message}</h4>
    </div>
  )
}
