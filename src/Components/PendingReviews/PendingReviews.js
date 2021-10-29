import React, {useState, useEffect} from 'react'
import { db } from "../../Utils/firebase"
import {query, collection, getDocs} from 'firebase/firestore'

function PendingReviews(){
    const [data, setData] = useState([]);

    useEffect(async ()=>{
        const q = query(collection(db, 'pendingUploads'))
        const querySnapshot = await getDocs(q)
        var arr = [];
        querySnapshot.forEach((doc)=>{
            arr.push(doc.data())
        })
        setData(arr)
        console.log(data)
    }, []);

    return (<div>
        {data && data.forEach(doc => <div key={doc}>
            <div>{doc.title}</div>
            <div>{doc.content}</div>
            <div>{doc.course}</div>
            <div>{doc.type}</div>
        </div>)}
    </div>)
}
export default PendingReviews 