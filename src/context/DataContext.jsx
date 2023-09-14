import { collection, getDocs } from 'firebase/firestore'

import { db } from '../firebase/config'

import {
  createContext,
  useEffect,
  useState,
  useReducer,
  useContext
} from 'react'

const DataContext = createContext()

const initialDataState = {
  authors: [],
  books: [],
  categories: [],
  keywords: [],
  stories: []
}
const dataReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_DATA':
      const { collectionName, data } = action.payload
      return {
        ...state,
        [collectionName]: data
      }
    case 'SET_DATA':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

// Function to fetch data from the database
const fetchData = async (db) => {
  try {
    const authorsCollection = collection(db, 'author')
    const booksCollection = collection(db, 'book')
    const categoriesCollection = collection(db, 'category')
    const keywordsCollection = collection(db, 'keyword')
    const storiesCollection = collection(db, 'story')

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

    return {
      authors: authorsData,
      books: booksData,
      categories: categoriesData,
      keywords: keywordsData,
      stories: storiesData
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return null
  }
}

// const fetchData = async (db) => {
//   try {
//     const authorsCollection = collection(db, 'authors');
//     const booksCollection = collection(db, 'books');
//     const categoriesCollection = collection(db, 'categories');
//     const keywordsCollection = collection(db, 'keywords');
//     const storiesCollection = collection(db, 'stories');

//     const authorsSnapshot = await getDocs(authorsCollection);
//     const booksSnapshot = await getDocs(booksCollection);
//     const categoriesSnapshot = await getDocs(categoriesCollection);
//     const keywordsSnapshot = await getDocs(keywordsCollection);
//     const storiesSnapshot = await getDocs(storiesCollection);

//     const authorsData = authorsSnapshot.docs.map((doc) => doc.data());
//     const booksData = booksSnapshot.docs.map((doc) => doc.data());
//     const categoriesData = categoriesSnapshot.docs.map((doc) => doc.data());
//     const keywordsData = keywordsSnapshot.docs.map((doc) => doc.data());

//     const storiesData = await Promise.all(
//       storiesSnapshot.docs.map(async (doc) => {
//         const story = doc.data();
//         // Get the value of ID from another collection
//         const otherCollection = collection(db, 'otherCollection');
//         const otherDoc = await docRef.get();
//         const otherData = otherDoc.exists ? otherDoc.data() : null;

//         return {
//           ...story,
//           otherData,
//         };
//       })
//     );

//     return {
//       authors: authorsData,
//       books: booksData,
//       categories: categoriesData,
//       keywords: keywordsData,
//       stories: storiesData,
//     };
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return null;
//   }
// };

// Function to set data using dispatch
const setData = (dispatch, fetchedData) => {
  dispatch({ type: 'SET_DATA', payload: fetchedData })
}

// Function to add data using dispatch
const addData = (dispatch, collectionName, data) => {
  dispatch({ type: 'ADD_DATA', payload: { collectionName, data } })
}

// Custom hook for data fetching and management
const useDataFetch = () => {
  const [data, dispatch] = useReducer(dataReducer, initialDataState)

  useEffect(() => {
    const fetchDataAndSetData = async () => {
      const fetchedData = await fetchData(db)
      if (fetchedData) {
        setData(dispatch, fetchedData)
      }
    }

    fetchDataAndSetData()
  }, [])

  return { data, addData }
}

const DataProvider = ({ children }) => {
  const { data, addData } = useDataFetch()

  return (
    <DataContext.Provider value={{ data, addData }}>
      {children}
    </DataContext.Provider>
  )
}
export const useDataContext = () => {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useDataContext must be used within DataContextProvider')
  }
  return context
}
export { DataContext, DataProvider }
