# FaR(T)
## Firebase and React (TypeScript)

The FaR(T) stack: Firebase for the back-end, React and TypeScript for the front-end.

Initial setup:
`npm create vite@latest`
Followed the prompts to create a React application with Typescript.

Created a new app with Firebase, added the Firebase SDK to my App.tsx file (following the instruction provided by firebase).

Created a basic authentication instance using the `getAuth()` method and a googleAuthentication instance using the `GoogleAuthProvider()` method, both from the firebase/auth package.

Used these authentication instances to execute the following sign-in/sign-out functions, also provided by the firebase/auth package:

`signInWithEmailAndPassword` for signing in an existing user.

`createUserWithEmailAndPassword` for creating a new user.

`signInWithPopup` creates a popup window that allows the user to sign in with Google.  Ran across an issue where the popup window would disappear after an initial successful login.  The signInWithPopup method was automatically selecting a user to sign in.  This was resolved by setting a custom parameter to my `GoogleAuthProvider()` instance:
`authProvider.setCustomParameters({ prompt: 'select_account })`

`signOut` signs the current user out.

Handled authentication errors with console.logs specific to the error codes.

Setup CRUD operations:

Created a new collection in Firestore.

Used the `getDocs` method from 'firebase/firestore to retrieve all the data from the collection and render it to the page.

Used the `addDoc` method to add an item to the existing collection.

Used the `deleteDoc` method to delete and item from the collection.

Used the `updateDoc` method to update a doc in the collection.

Separated the array.map displaying each item in the Firestore into a separate component so the `updateDoc` method remained unique to the specific item the button renders with.


