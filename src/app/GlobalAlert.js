import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addGlobalError, removeGlobalError, addGlobalSuccess, removeGlobalSuccess } from '../features/global/globalSlice'
import { nanoid } from 'nanoid'

import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

export const GlobalAlert = () => {

  const todosError = useSelector((state) => state.todos.error[0])
  const globalErrors = useSelector((state) => state.global.errors)

  const todosSuccess = useSelector((state) => state.todos.success[0])
  const globalSuccesses = useSelector((state) => state.global.successes)

  const dispatch = useDispatch()

  useEffect(() => {
    if (todosError) {

      const errorObject = {
        id: nanoid(),
        message: todosError,
      }

      dispatch(addGlobalError(errorObject))
    }
  }, [todosError, dispatch])

  const onClickErrorClose = (id) => {
    dispatch(removeGlobalError(id))
  }

  useEffect(() => {
    if (todosSuccess) {

      const successObject = {
        id: nanoid(),
        message: todosSuccess,
      }

      dispatch(addGlobalSuccess(successObject))
    }
  }, [todosSuccess, dispatch])

  const onClickSuccessClose = (id) => {
    dispatch(removeGlobalSuccess(id))
  }

  const classes = useStyles();

  return (
    <React.Fragment>
      {
        globalSuccesses.map(successObj => {
          return (
            <div key={successObj.id} className={classes.root}>
              <Alert severity="success" onClose={()=>onClickSuccessClose(successObj.id)}>{successObj.message}</Alert>
            </div>
          )
        })
      }      
      {
        globalErrors.map(errorObj => {
          return (
            <div key={errorObj.id} className={classes.root}>
              <Alert severity="error" onClose={()=>onClickErrorClose(errorObj.id)}>{errorObj.message}</Alert>
            </div>
          )
        })
      }
    </React.Fragment>
  )
}
