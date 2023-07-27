import { useState, ChangeEvent } from 'react'
import { FirebaseError } from 'firebase/app'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../App'
import { FirestoreData } from '../utils/FirestoreUtils'

interface FirestoreItemProps {
    data: FirestoreData
    onUpdate: () => void
    onDelete: () => void
}

export const FirestoreItem: React.FC<FirestoreItemProps> = ({ data, onUpdate, onDelete }) => {
    const [updatedString, setUpdatedString] = useState<string>("")

    const handleStringUpdate = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdatedString(e.target.value)
    }

    const updateStringValue = async (): Promise<void> => {
        try {
            const updateItem = doc(db, "testdata", data.id)
            await updateDoc(updateItem, { string: updatedString })
            onUpdate()
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                console.error(error.message as string)
            }
        }
        setUpdatedString("")
    }

    return (
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
            <button onClick={updateStringValue}>Update String</button>
            <button onClick={onDelete}>Delete Item</button>
        </div>
    )
}