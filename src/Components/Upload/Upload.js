import React from "react"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import "./Upload.css"
import { Button, OutlinedInput, TextField } from "@mui/material"
import { UploadFile } from "@mui/icons-material"
import { db, storage } from "../../Utils/firebase"
import { ref, uploadBytes } from "@firebase/storage"
import { nanoid } from "nanoid"
import { addDoc, collection } from "@firebase/firestore"
function Upload() {
  const [type, setType] = React.useState("")
  const [course, setCourse] = React.useState("")
  const [title, setTitle] = React.useState("")
  const [content, setContent] = React.useState("")
  const [file, setFile] = React.useState("")
  const [uploading, setUploading] = React.useState(false)
  async function handleSubmit(e) {
    e.preventDefault()
    setUploading(true)
    console.log("Type : ", type)
    if (type === "pdf") {
      const fileName = nanoid(10)
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
  }

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
              <InputLabel id="upload-course-label">Course</InputLabel>
              <Select
                labelId="upload-course-label"
                id="upload-course-select"
                value={course}
                label="Course"
                onChange={(e) => setCourse(e.target.value)}>
                <MenuItem value="theoryofcomputation">
                  Theory of Computation
                </MenuItem>
                <MenuItem value="dbms">DBMS</MenuItem>
                <MenuItem value="mathematics">Mathematics</MenuItem>
              </Select>
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
