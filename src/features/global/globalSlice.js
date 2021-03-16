import { createSlice } from '@reduxjs/toolkit'

const initialState = {  
  errors: [],
  successes: [],
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    addGlobalError(state, action) {
    state.errors.push(action.payload)
    },    
    removeGlobalError(state, action) {
    //https://redux-toolkit.js.org/usage/immer-reducers#mutating-and-returning-state
    const newErrors = state.errors.filter(error => error.id !== action.payload)
    // "Mutate" the existing state to save the new array
    state.errors = newErrors
    },  
    addGlobalSuccess(state, action) {
    state.successes.push(action.payload)
    },    
    removeGlobalSuccess(state, action) {
    //https://redux-toolkit.js.org/usage/immer-reducers#mutating-and-returning-state
    const newSuccesses = state.successes.filter(success => success.id !== action.payload)
    // "Mutate" the existing state to save the new array
    state.successes = newSuccesses
    },
  },
  extraReducers: {},
})

export const { addGlobalError, removeGlobalError, addGlobalSuccess, removeGlobalSuccess } = globalSlice.actions

export default globalSlice.reducer
