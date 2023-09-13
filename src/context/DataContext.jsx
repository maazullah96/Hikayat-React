import { collection, getDocs } from 'firebase/firestore'

import db from '../firebase/config'

import { createContext, useEffect, useState } from 'react'

const DataContext = createContext()

const initialDataState = {
  authors: [],
  books: [],
  categories: [],
  keywords: [],
  stories: []
}

const useDataFetch = () => {
  const [data, setData] = useState(initialDataState)
  const [state, dispatch] = useReducer(dataReducer, data)

  const addData = (collectionName, data) => {
    dispatch({ type: 'ADD_DATA', payload: { collectionName, data } })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authorsCollection = collection(db, 'authors')
        const booksCollection = collection(db, 'books')
        const categoriesCollection = collection(db, 'categories')
        const keywordsCollection = collection(db, 'keywords')
        const storiesCollection = collection(db, 'stories')

        const authorsSnapshot = await getDocs(authorsCollection)
        const booksSnapshot = await getDocs(booksCollection)
        const categoriesSnapshot = await getDocs(categoriesCollection)
        const keywordsSnapshot = await getDocs(keywordsCollection)
        const storiesSnapshot = await getDocs(storiesCollection)

        const authorsData = authorsSnapshot.docs.map((doc) => doc.data())
        const booksData = booksSnapshot.docs.map((doc) => doc.data())
        const categoriesData = categoriesSnapshot.docs.map((doc) => doc.data())
        const keywordsData = keywordsSnapshot.docs.map((doc) => doc.data())
        const storiesData = storiesSnapshot.docs.map((doc) => doc.data())

        setData({
          authors: authorsData,
          books: booksData,
          categories: categoriesData,
          keywords: keywordsData,
          stories: storiesData
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return { data, addData }
}

const DataProvider = ({ children }) => {
  const { data, addData } = useDataFetch()

  return (
    <DataContext.Provider value={(data, addData)}>
      {children}
    </DataContext.Provider>
  )
}

export { DataContext, DataProvider }
