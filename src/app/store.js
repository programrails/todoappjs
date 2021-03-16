import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/todosSlice'
import globalReducer from '../features/global/globalSlice'

export default configureStore({
  reducer: {
    todos: todosReducer,
    global: globalReducer,
  },
})
