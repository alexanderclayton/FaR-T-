import React, { useEffect, useState, ChangeEvent } from 'react'
import { db } from '../App'
import {
    getDocs,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    collection,
    CollectionReference,
    DocumentData,
    QuerySnapshot
} from 'firebase/firestore'
import { FirebaseError } from 'firebase/app'

interface FirestoreDocumentData {
    string: string
    number: number
    bool: boolean
}

interface FirestoreData extends FirestoreDocumentData {
    id: string
}

export const Firestore: React.FC = () => {

    const [stringValue, setStringValue] = useState<string>("")
    const [numberValue, setNumberValue] = useState<number>(0)
    const [boolValue, setBoolValue] = useState<boolean>(false)
    const [result, setResult] = useState<string>("")
    const [updatedString, setUpdatedString] = useState<string>("")

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

    const handleStringUpdate = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdatedString(e.target.value)
    }

    const [firestoreData, setFirestoreData] = useState<FirestoreData[]>([])
    const testCollectionRef: CollectionReference<DocumentData> = collection(db, "testdata")

    const getFirestoreData = async () => {
        try {
            const data: QuerySnapshot<DocumentData> = await getDocs(testCollectionRef)
            const filteredData: FirestoreData[] = data.docs.map((doc) => ({
                ...doc.data() as FirestoreDocumentData,
                id: doc.id
            }))
            console.log(filteredData)
            setFirestoreData(filteredData)
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                console.error(error.message as string)
            }
        }
    }

    useEffect(() => {
        getFirestoreData()
    }, [])

    const addItemToFirebase = async (): Promise<void> => {
        try {
            await addDoc(testCollectionRef, {
                string: stringValue,
                number: numberValue,
                bool: boolValue
            })
            setResult("Item successfully added to Firebase!")
            getFirestoreData()
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                console.error(error.message as string)
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

    const updateStringValue = async (id: string): Promise<void> => {
        try {
            const updateItem = doc(db, "testdata", id)
            await updateDoc(updateItem, { string: updatedString })
            setResult("Successfully updated item!")
            getFirestoreData()
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                console.error(error.message as string)
            }
        }
        setUpdatedString("")
    }

    return (
        <div>
            <div>
                {firestoreData.map((data => (
                    <div key={data.id}>
                        <h1>String: {data.string}</h1>
                        <h2>Number: {data.number}</h2>
                        <h3>Bool: {data.bool.toString()}</h3>
                        <input
                            placeholder="Update String"
                            value={updatedString}
                            type="text"
                            onChange={handleStringUpdate}
                        />
                        <button onClick={() => updateStringValue(data.id)}>Update String</button>
                        <button onClick={() => deleteItemFromFirebase(data.id)}>Delete Item</button>
                    </div>
                )))}
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