import React, { useEffect, useState, ChangeEvent } from 'react'
import { db } from '../App'
import { FirestoreItem } from './FirestoreItem'
import {
    getDocs,
    addDoc,
    deleteDoc,
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

export interface FirestoreData extends FirestoreDocumentData {
    id: string
}

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

    return (
        <div>
            <div>
                {firestoreData.map((data => (
                    <FirestoreItem 
                    key={data.id}
                    data={data}
                    onUpdate={() => getFirestoreData()}
                    onDelete={() => deleteItemFromFirebase(data.id)}/>
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