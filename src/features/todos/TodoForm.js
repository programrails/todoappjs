import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { useHistory } from 'react-router-dom'
import { createTodo, updateTodo } from './todosSlice'

import FormControl from '@material-ui/core/FormControl';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  'custom-form': {
    width: '210px;',
  },
  'helper-text': {
    'font-style': 'italic',
    'line-height': '12px',
  },
})

export function TodoForm({todo}) {

  const classes = useStyles()

  const id = todo.id

  const submitName = id !== 0 ? 'Update Todo' : 'Create Todo'

  // How many users are there generally available
  const totalUsersCount = 10
  const optionsList = [...Array(totalUsersCount+1).keys()].slice(1)

  const [title, setTitle] = useState(todo.title)
  const [userId, setUserId] = useState(todo.userId !== 0 ? todo.userId : optionsList[0])
  const [completed, setCompleted] = useState(Boolean(todo.completed))
  const [memo, setMemo] = useState(todo.memo)

  const [idCreated, setIdCreated] = useState(0)

  const [isDone, setDone] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onUserIdChanged = (e) => setUserId(e.target.value)
  const onCompletedChanged = (e) => setCompleted(!completed)

  const onMemoChanged = (e) => {    
    const value = e.target.value    
     
    const verified = value.match(/^[a-zA-Z0-9()*_\-!#$:;`%^~&*,."'\][\s]*$/)
    if (!verified) {
       return false
    }
    setMemo(value)
  }

  // Here some other fields can be added
  const canSubmit = [title].every(Boolean)

  // https://stackoverflow.com/a/56608792
  useEffect(() => {
    if (isDone) {
      history.push(`/todos/${id ? id : idCreated}`)
    }
  },[isDone, idCreated, id, history])

  useEffect(() => {
    // To ensure F5 correctness
    setCompleted(todo.completed)
  },[todo.completed])

  useEffect(() => {
    // To ensure F5 correctness
    setMemo(todo.memo)
  },[todo.memo])

  useEffect(() => {
    // To ensure F5 correctness
    setTitle(todo.title)
  },[todo.title])

  useEffect(() => {
    // To ensure F5 correctness
    setUserId(todo.userId)
  },[todo.userId])  

  const onSubmit = async () => {

    if (canSubmit) {
      try {        
        let resultAction
        if (id)
        {          
          const todoAttributes = {title, userId, completed, memo }
          resultAction = await dispatch(
            updateTodo({id, todoAttributes})
          )
        }
        else
          resultAction = await dispatch(
            createTodo({ title, userId, completed, memo })
          )

        const response = unwrapResult(resultAction)
        setIdCreated(response?.id)

        setDone(true)
      } catch (err) {        
      } finally {
      }
    }
  }


  return (
    <Card>
      <CardContent>
        <form className={classes['custom-form']} noValidate="">
        <Box my={3}>
          <FormControl fullWidth>
            <InputLabel htmlFor="title">Title</InputLabel>
            <Input id="title" name="title" value={title} placeholder="Input title" onChange={onTitleChanged} />
          </FormControl>
        </Box>
        <Box my={3}>
           <TextField
              id="User ID"
              fullWidth
              select
              label="User ID"
              onChange={onUserIdChanged}
              SelectProps={{
                native: true,
              }}
              value={userId}
              helperText="Please select user Id"
            >
            {optionsList.map(v => <option key={v} value={v}>{v}</option>)}
          </TextField>      
        </Box>        
        <Box my={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={completed}
                onChange={onCompletedChanged}
                name="completed"
                color="primary"
              />
            }
            label="Completed"
          />        
        </Box>
        <Box my={3}>
          <InputLabel htmlFor="title">Memo</InputLabel>
          <TextareaAutosize aria-label="minimum height" name="memo" value={memo} 
            onChange={onMemoChanged} maxLength="140" rowsMin={5} rowsMax={5} placeholder="Input user memo" />
          <div className={classes['helper-text']}>English only. Max 140 symbols.</div>
        </Box>
        <Box>
          <Button variant="contained" color="primary" onClick={onSubmit}>
            {submitName}
          </Button>
        </Box>
        </form>
      </CardContent>
    </Card>
  )
}
