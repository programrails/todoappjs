import React from 'react';
import { TodoForm } from './TodoForm'
import { Link } from 'react-router-dom'

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


export function TodoNew() {

  const emptyTodo = {
    id: 0,
    title: '',
    userId: 0,
    completed: false,
    memo: '',
  }

  const classes = useStyles()

  return (
    <Container component="main">
      <Typography color="textPrimary" gutterBottom variant="h4" align="center">
        New Todo
      </Typography>

      <TodoForm todo={emptyTodo}/>

      <Box className={classes['nav-link']}>
        <Link to={'/'}>Back</Link>
      </Box>
    </Container>
  )
}
