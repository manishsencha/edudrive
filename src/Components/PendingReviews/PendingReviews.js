import React, { useState, useEffect } from "react"
import { db } from "../../Utils/firebase"
import { query, collection, getDocs } from "firebase/firestore"
import {
  CircularProgress,
  Box,
  Card,
  Typography,
  Stack,
  Link,
} from "@mui/material"
import "./PendingReviews.css"
function ReviewCard(props) {
  const { data } = props
  return (
    <Card sx={{ maxWidth: "800px" }}>
      <Box sx={{ p: 2, display: "flex", width: "100%" }}>
        <Stack spacing={0.5}>
          <Typography>
            <b>Course : </b>
            {data.course}
          </Typography>
          <Typography>
            <b>Title : </b>
            {data.title}
          </Typography>
          <Typography>
            <b>URL : </b>
            <Link href={data.content} target="_blank">
              {data.content}
            </Link>
          </Typography>
        </Stack>
      </Box>
    </Card>
  )
}

function PendingReviews() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchData() {
      setData([])
      const q = query(collection(db, "pendingUploads"))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        setData((e) => [...e, doc.data()])
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
            ? data.map((doc, idx) => <ReviewCard key={idx} data={doc} />)
            : ""}
        </div>
      )}
    </div>
  )
}
export default PendingReviews
