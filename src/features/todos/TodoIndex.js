import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { deleteTodo } from './todosSlice'

import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import Checkbox from '@material-ui/core/Checkbox'
import { DataGrid } from '@material-ui/data-grid'
import { makeStyles } from "@material-ui/core/styles"


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles({
  'nav-link': {
    display: 'block',
    margin: '15px 0px',
  },
})


export function TodoIndex() {

  const data = useSelector((state) => state.todos.data)

  const dispatch = useDispatch()    

  const [open, setOpen] = useState(false);

  const [id, setId] = useState(0);

  const handleClickOpen = (e) => {
    e.preventDefault()

    const href = e.currentTarget.getAttribute('href')

    const href_id = Number(href.split('/')[2])

    setId(href_id)

    setOpen(true)
  }

  const handleAgree = () => {
    setOpen(false)
    DeleteTodo()
  }

  const handleClose = () => {
    setOpen(false)
  }

  const DeleteTodo = async () => {

    try {
      const resultAction = await dispatch(
        deleteTodo(id)
      )

      unwrapResult(resultAction)      
    } catch (err) {
    } finally {
    }
  }
  

  const columns = [
    { field: 'id', headerName: 'ID', disableClickEventBubbling: true, width: 205 },
    { field: 'userId', headerName: 'User ID', disableClickEventBubbling: true, width: 205 },

    { field: 'title', headerName: 'Title', disableClickEventBubbling: true, width: 205 },

    { field: 'completed', headerName: 'Completed',
    renderCell: (params) => (
      <Checkbox disabled checked={Boolean(params.value)} />
    ),
    disableClickEventBubbling: true, width: 205 },

    { field: 'memo', headerName: 'Memo',
    disableClickEventBubbling: true, width: 205 },

    { field: 'actions', headerName: 'Actions',
    renderCell: (params) => (
      <React.Fragment>
        <Link to={`/todos/${params.row['id']}`} style={{marginRight: 15}}>Show</Link>
        <Link to={`/todos/${params.row['id']}/edit`}style={{marginRight: 15}}>Edit</Link>
        <Link to={`/todos/${params.row['id']}`} onClick={handleClickOpen}>Delete</Link>
      </React.Fragment>
    ),
    disableClickEventBubbling: true, width: 205 },
  ]

  const classes = useStyles()

  return (
    <Container component="main">

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"WARNING:"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Delete the todo with id "{id}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleAgree} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>



      <Typography color="textPrimary" gutterBottom variant="h4" align="center">
        Todo Application
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <DataGrid pagination rows={data} columns={columns}/>
        </div>
      </div>
      <Link to={'/todos/new'} className={classes['nav-link']}>New Todo</Link>
    </Container>
  )
}
