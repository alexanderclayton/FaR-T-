import React, { useState, ChangeEvent } from 'react'
import { auth, db } from '../App'
import { FirestoreItem } from './FirestoreItem'
import { useFirestoreData, FirestoreData } from '../utils/FirestoreUtils'
import {
    addDoc,
    deleteDoc,
    doc,
    CollectionReference,
    DocumentData,
    collection
} from 'firebase/firestore'
import { FirebaseError } from 'firebase/app'

export const Firestore: React.FC = () => {

    const [stringValue, setStringValue] = useState<string>("")
    const [numberValue, setNumberValue] = useState<number>(0)
    const [boolValue, setBoolValue] = useState<boolean>(false)
    const [result, setResult] = useState<string>("")

    const handleStringChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStringValue(e.target.value)
    }

    const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        const numValue: number = parseInt(e.target.value)
        setNumberValue(numValue)
    }

    const handleBoolChange = (e: ChangeEvent<HTMLInputElement>) => {
        const boolean: boolean = e.target.checked
        setBoolValue(boolean)
    }

    const values = (): void => {
        console.log("String:", stringValue, "Number:", numberValue, "Boolean:", boolValue)
    }

   const [firestoreData, getFirestoreData] = useFirestoreData()
   const testCollectionRef: CollectionReference<DocumentData> = collection(db, "testdata")

    const addItemToFirebase = async (): Promise<void> => {
        try {
            await addDoc(testCollectionRef, {
                string: stringValue,
                number: numberValue,
                bool: boolValue,
                userId: auth?.currentUser?.uid
            })
            setResult("Item successfully added to Firebase!")
            getFirestoreData()
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                if (error.code === "invalid-argument") {
                    setResult("Must be logged in to add items to database!")
                } else {
                    console.error(error.message as string)
                }
            }
        }
    }

    const deleteItemFromFirebase = async (id: string): Promise<void> => {
        try {
            const deleteItem = doc(db, "testdata", id)
            await deleteDoc(deleteItem)
            setResult("Successfully deleted item from Firebase!")
            getFirestoreData()
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                console.error(error.message as string)
            }
        }
    }

    return (
        <div>
            <div>
                {firestoreData.map((data: FirestoreData) => (
                    <FirestoreItem
                        key={data.id}
                        data={data}
                        onUpdate={getFirestoreData}
                        onDelete={() => deleteItemFromFirebase(data.id)} />
                ))}
            </div>
            <div>
                <input
                    placeholder="string"
                    value={stringValue}
                    type="text"
                    onChange={handleStringChange}
                />
                <input
                    placeholder="number"
                    value={numberValue}
                    type="number"
                    onChange={handleNumberChange}
                />
                <input
                    checked={boolValue}
                    type="checkbox"
                    onChange={handleBoolChange} />
                <label>True</label>
                <button onClick={values}>Values</button>
                <button onClick={addItemToFirebase}>Add Item</button>
                <h3>{result}</h3>

            </div>
        </div>
    )
}