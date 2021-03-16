import React, { useEffect } from 'react'
import { TodoIndex } from './features/todos/TodoIndex'
import { TodoView } from './features/todos/TodoView'
import { TodoNew } from './features/todos/TodoNew'
import { TodoEdit } from './features/todos/TodoEdit'
import { GlobalAlert } from './app/GlobalAlert'
import { unwrapResult } from '@reduxjs/toolkit'
import { listTodos } from './features/todos/todosSlice'

import { useDispatch } from 'react-redux'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

function App() {

  const dispatch = useDispatch()

  const onPageRefresh = async () => {
    try {
      const resultAction = await dispatch(
        listTodos()
      )
      unwrapResult(resultAction)
    } catch (err) {

    } finally {
    }
  }

  useEffect(() => {
    onPageRefresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const theme = createMuiTheme({
    overrides: {
      // Style sheet name ⚛️
      MuiContainer: {
        // Name of the rule
        root: {
          // Some CSS
          'margin-top': '30px'
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
          <GlobalAlert />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <TodoIndex />
              )}
            />
            <Route exact path="/todos" component={TodoIndex} />
            <Route exact path="/todos/new" component={TodoNew} />
            <Route exact path="/todos/:id" component={TodoView} />
            <Route exact path="/todos/:id/edit" component={TodoEdit} />
          </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App;
