import React, { createContext, useContext, useEffect, useState } from "react"
import { getAuth } from "firebase/auth"
import app, { db } from "../Utils/firebase"
import { doc, getDoc } from "@firebase/firestore"
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
  const [admin, setAdmin] = useState(false)
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  async function signup(name, email, password) {
    return createUserWithEmailAndPassword(auth, email, password).then(
      async (userCred) => {
        const user = userCred.user
        if (user) {
          await updateProfile(user, { displayName: name })
          console.log(user)
        }
      }
    )
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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user)
      try {
        const docSnap = await getDoc(doc(db, "adminData/data"))
        if (docSnap.exists()) {
          if (docSnap.data().emails.includes(currentUser.email)) {
            setAdmin(true)
          }
        }
      } catch (e) {
        setAdmin(false)
      }
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    admin,
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
