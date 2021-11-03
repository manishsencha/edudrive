import React, { useState, useEffect } from "react"
import { db } from "../../Utils/firebase"
import { query, collection, getDocs, deleteDoc, doc } from "firebase/firestore"
import { ref, getDownloadURL, deleteObject } from "firebase/storage"
import {
  CircularProgress,
  Box,
  Button,
  Card,
  Typography,
  Stack,
  Link,
} from "@mui/material"
import { storage } from "../../Utils/firebase"
import "./PendingReviews.css"
function ReviewCard(props) {
  const [course] = useState(props.course)
  const [title] = useState(props.title)
  const [content, setContent] = useState(props.content)
  const [type] = useState(props.type)
  const [rejecting, setRejecting] = useState(false)
  const [fetching, setFetching] = useState(false)
  useEffect(() => {
    async function fetchPdf() {
      if (type === "pdf") {
        setFetching(true)
        await getDownloadURL(ref(storage, props.content)).then((url) =>
          setContent(url)
        )
      }
      setFetching(false)
    }
    fetchPdf()
  }, [type, props.content])
  const handleReject = async () => {
    setRejecting(true)
    if (type === "pdf") {
      await deleteObject(ref(storage, props.content)).then(async () => {
        await deleteDoc(doc(db, "pendingUploads", props.id))
      })

      setRejecting(false)
      return window.location.reload()
    }
    await deleteDoc(doc(db, "pendingUploads", props.id))
    setRejecting(false)
    return window.location.reload()
  }
  return (
    <Card sx={{ maxWidth: "800px", width: "100%", my: 2 }}>
      <Box sx={{ p: 2 }}>
        <Stack spacing={0.5}>
          <Typography>
            <b>Course : </b>
            {course}
          </Typography>
          <Typography>
            <b>Title : </b>
            {title}
          </Typography>
          <Typography>
            <b>URL : </b>
            <Link
              href={content}
              target="_blank"
              sx={{ textOverflow: "ellipsis" }}>
              {fetching ? <CircularProgress /> : content}
            </Link>
          </Typography>
        </Stack>
        <Button sx={{ m: 1 }} variant="contained">
          Accept
        </Button>
        <Button
          sx={{ m: 1 }}
          variant="outlined"
          color="error"
          disabled={rejecting}
          onClick={handleReject}>
          {rejecting ? "Rejecting..." : "Reject"}
        </Button>
      </Box>
    </Card>
  )
}

function PendingReviews() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchData() {
      const q = query(collection(db, "pendingUploads"))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        setData((e) => [...e, { id: doc.id, ...doc.data() }])
      })
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <div className="pending-review-container">
      {loading ? (
        <div
          style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <CircularProgress />
        </div>
      ) : (
        <div className="pending-review-container">
          {data.length
            ? data.map((doc, idx) => (
                <ReviewCard
                  key={idx}
                  id={doc.id}
                  type={doc.type}
                  content={doc.content}
                  title={doc.title}
                  course={doc.course}
                />
              ))
            : ""}
        </div>
      )}
    </div>
  )
}
export default PendingReviews
