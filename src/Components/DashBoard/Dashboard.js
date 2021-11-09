import React, { useState, useEffect } from "react"
import { collection, doc, getDoc, getDocs, query } from "@firebase/firestore"
import { db } from "../../Utils/firebase"
import {
  Box,
  FormControl,
  CircularProgress,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material"

function Dashboard() {
  const [courses, setCourses] = useState("")
  const [fetching, setFetching] = useState(true)
  const [selectedCourse, setSelectedCourse] = useState("")
  const [courseData, setCourseData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchData() {
      const docSnap = await getDoc(doc(db, "courses/course"))
      setCourses(docSnap.data().coursesName)
      setFetching(false)
    }
    fetchData()
  }, [])
  useEffect(() => {
    setCourseData([])
    async function fetchData() {
      setLoading(true)
      if (selectedCourse) {
        const q = query(collection(db, selectedCourse))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          setCourseData((e) => [...e, doc.data()])
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
        ) : (
          courseData.map((data, idx) => (
            <div key={idx}>
              <div>{JSON.stringify(data)}</div>
            </div>
          ))
        )}
      </Box>
    </Box>
  )
}

export default Dashboard
