import React from 'react';
import { TodoForm } from './TodoForm'
import { Link, useParams } from "react-router-dom"
import { useSelector } from 'react-redux'

import Container from "@material-ui/core/Container"
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  'nav-link': {
    display: 'block',
    margin: '15px 0px',
  },
})


export function TodoEdit() {

  const emptyTodo = {
    id: 0,
    title: '',
    userId: 0,
    completed: false,
    memo: '',
  }  

  const {id} = useParams()

  const todo = useSelector((state) => state.todos.data.find(x => x.id === Number(id)))  

  const classes = useStyles()

  return (
    <Container component="main">
      <Typography color="textPrimary" gutterBottom variant="h4" align="center">
        Editing Todo
      </Typography>

      <TodoForm todo={todo ? todo : emptyTodo}/>

      <Box className={classes['nav-link']}>
        <Link to={`/todos/${id}`}>Show</Link> | <Link to={'/'}>Back</Link>
      </Box>
    </Container>
  )
}
