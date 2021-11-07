import React, { useState, useEffect } from "react"
import { db } from "../../Utils/firebase"
import {
  query,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore"
import { ref, getDownloadURL, deleteObject } from "firebase/storage"
import {
  CircularProgress,
  Box,
  Button,
  Card,
  Typography,
  Stack,
  Link,
  Alert,
  Snackbar,
} from "@mui/material"
import { storage } from "../../Utils/firebase"
import "./PendingReviews.css"
function ReviewCard(props) {
  const [course] = useState(props.course)
  const [title] = useState(props.title)
  const [content, setContent] = useState(props.content)
  const [type] = useState(props.type)
  const [processing, setProcessing] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [rejected, setRejected] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    setSnackbarOpen(false)
  }

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
    setProcessing(true)
    try {
      if (type === "pdf") {
        await deleteObject(ref(storage, props.content))
      }
      await deleteDoc(doc(db, "pendingUploads", props.id))
      setProcessing(false)
      return setRejected(true)
    } catch (e) {
      setProcessing(false)
      setSnackbarOpen(true)
      setSnackbarMessage("Something went wrong..")
    }
  }
  const handleAccept = async () => {
    setProcessing(true)
    const data = {
      content: content,
      title: title,
      type: type,
      upvotes: 0,
      downvotes: 0,
    }
    try {
      await addDoc(collection(db, course), data).then(async () => {
        await deleteDoc(doc(db, "pendingUploads", props.id))
      })
      setProcessing(false)
      return setAccepted(true)
    } catch (e) {
      setProcessing(false)
      setSnackbarOpen(true)
      setSnackbarMessage("Something went wrong..")
    }
  }
  return (
    <Card sx={{ maxWidth: "800px", width: "100%", my: 2 }}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
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
              {fetching ? <CircularProgress size="inherit" /> : content}
            </Link>
          </Typography>
        </Stack>
        {accepted ? (
          <Stack direction="row" mt={2} spacing={0.5}>
            <Alert severity="success">Accepted</Alert>
          </Stack>
        ) : rejected ? (
          <Stack direction="row" spacing={0.5} mt={2}>
            <Alert severity="error">Rejected</Alert>
          </Stack>
        ) : (
          <>
            <Button
              sx={{ m: 1 }}
              variant="contained"
              disabled={processing}
              onClick={handleAccept}>
              {processing ? (
                <Stack
                  sx={{ display: "flex", alignItems: "center" }}
                  direction="row"
                  spacing={1}>
                  <CircularProgress size={20} /> <p>Please wait...</p>
                </Stack>
              ) : (
                "Accept"
              )}
            </Button>
            <Button
              sx={{ m: 1 }}
              variant="outlined"
              color="error"
              disabled={processing}
              onClick={handleReject}>
              {processing ? (
                <Stack
                  sx={{ display: "flex", alignItems: "center" }}
                  direction="row"
                  spacing={1}>
                  <CircularProgress size={20} /> <p>Please wait...</p>
                </Stack>
              ) : (
                "Reject"
              )}
            </Button>
          </>
        )}
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
