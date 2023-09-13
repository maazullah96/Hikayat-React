import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth'

import { createContext, useContext, useReducer, useEffect } from 'react'
import { auth } from '../firebase/config'
const AuthContext = createContext()

const initialAuthState = {
  user: null,
  loading: true,
  error: null
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        error: null,

        loading: false
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        user: null,
        loading: false
      }

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        loading: false,
        error: null
      }
    default:
      return state
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: 'SET_USER', payload: user })
      } else {
        dispatch({ type: 'LOGOUT' })
      }
    })

    return () => unsubscribe()
  }, [])
  const login = async ({ email, password }) => {
    console.log('login', email, password)
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      console.log(user)
      dispatch({ type: 'SET_USER', payload: user })

      // dispatch({ type: 'LOGIN_SUCCESS', payload: user })
    } catch (error) {
      console.log(`error ==> ${error}`)
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  const logout = () => {
    // Perform logout logic, such as clearing session data, etc.
    // For example, if you are using Firebase:
    auth
      .signOut()
      .then(() => {
        dispatch({ type: 'LOGOUT' })
        // Clear session data or perform any additional cleanup
        // Navigate to the login page
        // navigate('/login')
      })
      .catch((error) => {
        // Handle any potential logout errors
        console.error('Logout error:', error)
      })
  }

  const signUp = async ({ email, password }) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      console.log(`user ==> ${user.email}`)
      dispatch({ type: 'SET_USER', payload: user })
    } catch (error) {
      console.log(`error ==> ${error}`)
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }
  const signInWithSocial = async (provider) => {
    try {
      const res = await signInWithPopup(auth, provider)
      dispatch({ type: 'SET_USER', payload: res.user })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
    }
  }

  return (
    <AuthContext.Provider
      value={{ ...state, dispatch, login, signInWithSocial, signUp, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthContextProvider')
  }
  return context
}

export default AuthProvider
