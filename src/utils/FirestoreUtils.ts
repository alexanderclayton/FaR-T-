import { useState, useEffect } from 'react'
import { getDocs, CollectionReference, DocumentData, collection, QuerySnapshot } from "firebase/firestore"
import { FirebaseError } from 'firebase/app'
import { db } from '../App'



interface FirestoreDocumentData {
    string: string
    number: number
    bool: boolean
    userId: any
}

export interface FirestoreData extends FirestoreDocumentData {
    id: string
}

export const useFirestoreData = (): [FirestoreData[], () => Promise<void>] => {
    const [firestoreData, setFirestoreData] = useState<FirestoreData[]>([])
    const testCollectionRef: CollectionReference<DocumentData> = collection(db, "testdata")

    const getFirestoreData = async (): Promise<void> => {
        try {
            const data: QuerySnapshot<DocumentData> = await getDocs(testCollectionRef)
            const filteredData: FirestoreData[] = data.docs.map((doc) => ({
                ...doc.data() as FirestoreDocumentData,
                id: doc.id
            }))
            setFirestoreData(filteredData)
        } catch(error:unknown) {
            if (error instanceof FirebaseError) {
                console.error(error.code as string)
            }
        }
    }

    useEffect(() => {
        getFirestoreData()
    }, [])

    return [firestoreData, getFirestoreData]
}