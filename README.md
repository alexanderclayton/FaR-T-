# FaR(T)
## Firebase and React (TypeScript)

The FaR(T) stack: Firebase for the back-end, React and TypeScript for the front-end.

Initial setup:
`npm create vite@latest`
Followed the prompts to create a React application with Typescript.

Created a new app with Firebase, added the Firebase SDK to my App.tsx file (following the instruction provided by firebase).

Created a basic authentication instance using the `getAuth()` method and a googleAuthentication instance using the `GoogleAuthProvider()` method, both from the firebase/auth package 

Used these authentication instances to execute the following sign-in/sign-out functions, also provided by the firebase/auth package:
`signInWithEmailAndPassword` for signing in an existing user.

`createUserWithEmailAndPassword` for creating a new user.

`signInWithPopup` creates a popup window that allows the user to sign in with Google.

`signOut` signs the current user out.


