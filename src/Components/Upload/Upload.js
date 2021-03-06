import React, { useEffect } from "react"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import "./Upload.css"
import {
  Button,
  CircularProgress,
  OutlinedInput,
  TextField,
} from "@mui/material"
import { UploadFile } from "@mui/icons-material"
import { db, storage } from "../../Utils/firebase"
import { ref, uploadBytes } from "@firebase/storage"
import { nanoid } from "nanoid"
import { addDoc, collection, doc, getDoc } from "@firebase/firestore"
function Upload() {
  const [type, setType] = React.useState("")
  const [course, setCourse] = React.useState("")
  const [title, setTitle] = React.useState("")
  const [content, setContent] = React.useState("")
  const [file, setFile] = React.useState()
  const [uploading, setUploading] = React.useState(false)
  const [fetching, setFetching] = React.useState(true)
  const [courses, setCourses] = React.useState([])
  async function handleSubmit(e) {
    e.preventDefault()
    setUploading(true)
    const fileName = nanoid(10)
    if (type === "pdf") {
      if (file.type !== "application/pdf") {
        setUploading(false)
        return alert("Please select a pdf file")
      }
      const storageRef = ref(storage, fileName)
      await uploadBytes(storageRef, file).then(async (snapshot) => {
        console.log("Upload Success")
        const data = {
          content: fileName,
          course: course,
          title: title,
          type: type,
        }
        await addDoc(collection(db, "pendingUploads"), data)
        setUploading(false)
        setType("")
        setContent("")
        setCourse("")
        setFile("")
        setTitle("")
      })
      return
    }
    const data = {
      content: content,
      course: course,
      title: title,
      type: type,
    }
    await addDoc(collection(db, "pendingUploads"), data)
    setUploading(false)
    setType("")
    setContent("")
    setCourse("")
    setFile("")
    setTitle("")
  }

  useEffect(() => {
    async function fetchData() {
      const docSnap = await getDoc(doc(db, "courses/course"))
      setCourses(docSnap.data().coursesName)
      setFetching(false)
    }
    fetchData()
  }, [])
  return (
    <div id="upload-page">
      <Box sx={{ maxWidth: 400, width: "100%" }}>
        <Box component="form" sx={{ p: 10 }} onSubmit={handleSubmit}>
          <h1>Upload</h1>
          <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ my: 2 }} fullWidth>
              <InputLabel id="upload-type-label">Type</InputLabel>
              <Select
                labelId="upload-type-label"
                id="upload-type-select"
                value={type}
                label="Type"
                onChange={(e) => setType(e.target.value)}>
                <MenuItem value="youtube">Youtube</MenuItem>
                <MenuItem value="url">URL</MenuItem>
                <MenuItem value="pdf">PDF</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ my: 2 }} fullWidth>
              {fetching ? (
                <>
                  <CircularProgress />
                  <p>Loading Courses</p>
                </>
              ) : (
                <>
                  <InputLabel id="upload-course-label">Course</InputLabel>
                  <Select
                    labelId="upload-course-label"
                    id="upload-course-select"
                    value={course}
                    label="Course"
                    onChange={(e) => setCourse(e.target.value)}>
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
            <TextField
              sx={{ my: 2 }}
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {type === "pdf" ? (
              <OutlinedInput
                sx={{ my: 2 }}
                type="file"
                required
                fullWidth
                id="file"
                name="File"
                onChange={(e) => setFile(e.target.files[0])}
              />
            ) : (
              <TextField
                sx={{ my: 2 }}
                required
                fullWidth
                id="content"
                label="Content"
                name="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            )}
            <Button
              type="Submit"
              variant="contained"
              disabled={uploading}
              fullWidth>
              {" "}
              <UploadFile />
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default Upload
