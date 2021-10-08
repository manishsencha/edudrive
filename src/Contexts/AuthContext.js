import React, { createContext, useContext, useEffect, useState } from "react"
import { getAuth } from "firebase/auth"
import app from "../Utils/firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth"
export const auth = getAuth(app)
const AuthContext = createContext()
export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }
  function logout() {
    return signOut(auth)
  }
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }
  function emailUpdate(email) {
    return updateEmail(currentUser, email)
  }
  function passwordUpdate(password) {
    return updatePassword(currentUser, password)
  }
  function profileUpdate(name) {
    return updateProfile(currentUser, { displayName: name })
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    emailUpdate,
    passwordUpdate,
    profileUpdate,
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
