import React, { useState, useEffect } from "react"
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from "@firebase/firestore"
import { db } from "../../Utils/firebase"
import {
  Box,
  FormControl,
  CircularProgress,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Card,
  CardContent,
  Typography,
  Link,
  CardActions,
  Button,
} from "@mui/material"
import {
  ThumbDownAlt,
  ThumbDownOffAlt,
  ThumbUpAlt,
  ThumbUpOffAlt,
} from "@mui/icons-material"
import { useAuth } from "../../Contexts/AuthContext"
function DataCard(props) {
  const { title, url, upvotes, downvotes, course, id } = props
  const { currentUser } = useAuth()
  console.log(props)
  const [upvoted, setUpvoted] = useState(props.upvoted)
  const [downvoted, setDownvoted] = useState(props.downvoted)
  const [upvoteCount, setUpvoteCount] = useState(upvotes)
  const [downvoteCount, setDownvoteCount] = useState(downvotes)
  const [updating, setUpdating] = useState(false)
  const handleUpvote = async (e) => {
    e.preventDefault()
    setUpdating(true)
    if (upvoted) {
      setUpdating(false)
      return
    }
    try {
      if (downvoted) {
        await updateDoc(doc(db, "userData", currentUser.uid), {
          downvoteIds: arrayRemove(id),
        })
        setDownvoteCount((a) => a - 1)
        setDownvoted(false)
        await updateDoc(doc(db, course, id), {
          downvotes: downvoteCount,
        })
      }
      await updateDoc(doc(db, "userData", currentUser.uid), {
        upvoteIds: arrayUnion(id),
      })
      setUpvoteCount((a) => a + 1)
      setUpvoted(true)
      await updateDoc(doc(db, course, id), {
        upvotes: upvoteCount,
      })
      setUpdating(false)
    } catch (e) {
      setUpdating(false)
    }
  }
  const handleDownvote = async (e) => {
    e.preventDefault()
    setUpdating(true)
    if (downvoted) {
      setUpdating(false)
      return
    }
    try {
      if (upvoted) {
        await updateDoc(doc(db, "userData", currentUser.uid), {
          upvoteIds: arrayRemove(id),
        })
        setUpvoteCount((a) => a - 1)
        setUpvoted(false)
        await updateDoc(doc(db, course, id), {
          upvotes: upvoteCount,
        })
      }
      await updateDoc(doc(db, "userData", currentUser.uid), {
        downvoteIds: arrayUnion(id),
      })
      setDownvoteCount((a) => a + 1)
      setDownvoted(true)
      await updateDoc(doc(db, course, id), {
        downvotes: downvoteCount,
      })
      setUpdating(false)
    } catch (e) {
      setUpdating(false)
    }
  }
  return (
    <Card sx={{ minWidth: 275, my: 1 }}>
      <CardContent>
        <Typography fontSize={20}>{title}</Typography>
        <Typography>
          <Link href={url}>{url}</Link>
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="success" onClick={handleUpvote}>
          {updating ? (
            <CircularProgress size={16} />
          ) : (
            <React.Fragment>
              <span style={{ marginRight: 5, fontSize: 18 }}>
                {upvoteCount}
              </span>
              {upvoted ? <ThumbUpAlt /> : <ThumbUpOffAlt />}
            </React.Fragment>
          )}
        </Button>
        <Button variant="contained" color="error" onClick={handleDownvote}>
          {updating ? (
            <CircularProgress size={16} />
          ) : (
            <React.Fragment>
              <span style={{ marginRight: 5, fontSize: 18 }}>
                {downvoteCount}
              </span>
              {downvoted ? <ThumbDownAlt /> : <ThumbDownOffAlt />}
            </React.Fragment>
          )}
        </Button>
      </CardActions>
    </Card>
  )
}

function Dashboard() {
  const [courses, setCourses] = useState([])
  const [fetching, setFetching] = useState(true)
  const [selectedCourse, setSelectedCourse] = useState("")
  const [courseData, setCourseData] = useState([])
  const [loading, setLoading] = useState(true)
  const [upvotedIds, setUpvotedIds] = useState([])
  const [downvotedIds, setDownvotedIds] = useState([])

  const { currentUser } = useAuth()
  useEffect(() => {
    async function fetchData() {
      const docSnap = await getDoc(doc(db, "courses/course"))
      setCourses(docSnap.data().coursesName)
      const data = await getDoc(doc(db, "userData", currentUser.uid))
      if (data.data()) {
        setUpvotedIds(data.data().upvoteIds)
        setDownvotedIds(data.data().downvoteIds)
      }
      console.log(data)
      setFetching(false)
    }
    fetchData()
  }, [currentUser])
  useEffect(() => {
    setCourseData([])
    async function fetchData() {
      setLoading(true)
      if (selectedCourse) {
        const q = query(collection(db, selectedCourse))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          console.log(doc)
          setCourseData((e) => [...e, { id: doc.id, ...doc.data() }])
        })
      }
      setLoading(false)
    }
    fetchData()
  }, [selectedCourse])
  return (
    <Box
      sx={{
        pt: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}>
      <Box sx={{ maxWidth: 800, width: "90%", mx: 2 }}>
        <FormControl sx={{ my: 2 }} fullWidth>
          {fetching ? (
            <Stack
              sx={{ display: "flex", alignItems: "center" }}
              direction="row"
              spacing={0.5}>
              <CircularProgress />
              <p>Loading Courses...</p>
            </Stack>
          ) : (
            <>
              <InputLabel id="upload-course-label">Course</InputLabel>
              <Select
                labelId="upload-course-label"
                id="upload-course-select"
                value={selectedCourse}
                label="Course"
                onChange={(e) => setSelectedCourse(e.target.value)}>
                {courses.length
                  ? courses.map((e, i) => (
                      <MenuItem key={i} value={e}>
                        {e}
                      </MenuItem>
                    ))
                  : ""}
              </Select>
            </>
          )}
        </FormControl>
      </Box>
      <Box>
        {loading ? (
          <Stack
            sx={{ display: "flex", alignItems: "center" }}
            direction="row"
            spacing={0.5}>
            <CircularProgress />
            <p>Loading Courses...</p>
          </Stack>
        ) : courseData.length ? (
          courseData.map((data) => (
            <DataCard
              key={data.id}
              id={data.id}
              course={selectedCourse}
              title={data.title}
              url={data.content}
              upvotes={data.upvotes}
              downvotes={data.downvotes}
              upvoted={upvotedIds.includes(data.id)}
              downvoted={downvotedIds.includes(data.id)}
            />
          ))
        ) : (
          "Looks like nothing here"
        )}
      </Box>
    </Box>
  )
}

export default Dashboard
