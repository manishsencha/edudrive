import React from "react"
import { Button } from "@mui/material"
import home_banner from "./Assets/Home_banner.png"
import "./Home.css"

function Home() {
  return (
    <div className="home-container">
      <div className="home-inner-container">
        <div>
          <img src={home_banner} alt="home-banner" />
        </div>
        <div className="home-content">
          <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
            EduDrive
          </h1>
          <p>Giving new dimension to modern education</p>
          <div className="home-nav">
            <a href="/signin">
              <Button
                style={{
                  backgroundColor: "rgb(var(--btn-color))",
                  color: "white",
                }}
                variant="contained">
                Login
              </Button>
            </a>
            <a href="/signup">
              <Button
                style={{
                  backgroundColor: "rgb(var(--btn-color))",
                  color: "white",
                }}
                variant="contained">
                Signup
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
