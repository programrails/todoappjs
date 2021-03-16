import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = {
  data: [],
  status: 'idle',
  error: [],
  success: [],
}

export const listTodos = createAsyncThunk(
  'todos/listTodos',
  async () => {
    const response = await client.get('todos')
    return response
  }
)

export const createTodo = createAsyncThunk(
  'todos/createTodo',
  async (todoAttributes) => {
    const response = await client.post('todos', todoAttributes)
    return response
  }
)

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async (todoParams) => {
    const response = await client.put(`todos/${todoParams.id}`, todoParams.todoAttributes)
    return response
  }
)

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id) => {
    const response = await client.delete(`todos/${id}`)
    return response
  }
)

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    clearTodos(state, action) {
      state.status = 'Clear succeeded'
      state.data = []
      state.error = []
      state.success = []
    },    
  },
  extraReducers: {
    [listTodos.pending]: (state, action) => {
      state.status = 'loading'
      state.error = []
      state.success = []
    },
    [listTodos.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.data = action.payload      
      state.error = []
      state.success = []
    },
    [listTodos.rejected]: (state, action) => {
      state.status = 'failed'
      state.error.push(action.error.message)
    },
    [createTodo.pending]: (state, action) => {
      state.status = 'loading'
      state.error = []
      state.success = []
    },
    [createTodo.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.data.push(action.payload)
      state.error = []
      state.success.push('Create succeeded')
    },
    [createTodo.rejected]: (state, action) => {
      state.status = 'failed'
      state.error.push(action.error.message)
      state.success = []
    },
    [updateTodo.pending]: (state, action) => {
      state.status = 'loading'
      state.error = []
      state.success = []
    },
    [updateTodo.fulfilled]: (state, action) => {
      state.status = 'succeeded'
       // https://redux-toolkit.js.org/usage/immer-reducers#updating-nested-data
      const todo = state.data.find(todo => todo.id === action.payload.id)
      if (todo) {
        // ✅ CORRECT: This object is still wrapped in a Proxy, so we can "mutate" it
        todo.title = action.payload.title
        todo.userId = action.payload.userId
        todo.completed = action.payload.completed
        todo.memo = action.payload.memo
      }
      state.error = []
      state.success.push('Update succeeded')
    },
    [updateTodo.rejected]: (state, action) => {
      state.status = 'failed'
      state.error.push(action.error.message)
      state.success = []
    },
    [deleteTodo.pending]: (state, action) => {
      state.status = 'loading'
      state.error = []
      state.success = []
    },
    [deleteTodo.fulfilled]: (state, action) => {
      // The server responds with an empty response
      // so we need to take the deleted id from somewhere
      const deletedId = action.meta.arg      
      //https://redux-toolkit.js.org/usage/immer-reducers#mutating-and-returning-state
      const newTodos = state.data.filter(todo => todo.id !== deletedId)
      // "Mutate" the existing state to save the new array
      state.data = newTodos
      state.status = 'succeeded'
      state.error = []
      state.success.push('Delete succeeded')
    },
    [deleteTodo.rejected]: (state, action) => {
      state.status = 'failed'
      state.error.push(action.error.message)
      state.success = []
    },    
  },
})

export const { clearTodos } = todosSlice.actions

export default todosSlice.reducer
