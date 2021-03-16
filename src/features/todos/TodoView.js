import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Container from "@material-ui/core/Container"
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 12,
  },
  'nav-link': {
    display: 'block',
    margin: '15px 0px',
  },
  'memo-content': {
    'overflow-wrap': 'anywhere',
  }
})


export function TodoView() {

  const classes = useStyles()

  const { id } = useParams()

  const todo = useSelector((state) => state.todos.data.find(x => x.id === Number(id)))

  const todoCard = (
    <Card>
      <CardContent>
        <Box>
          <Typography gutterBottom component="span" className={classes.title}>
            UserId:
          </Typography>
          <Typography gutterBottom component="span">
            {todo?.userId}
          </Typography>
        </Box>

        <Box>
          <Typography gutterBottom component="span" className={classes.title}>
            Id:
          </Typography>
          <Typography gutterBottom component="span">
            {todo?.id}
          </Typography>
        </Box>

        <Box>
          <Typography gutterBottom component="span" className={classes.title}>
            Title:
          </Typography>
          <Typography gutterBottom component="span">
            {todo?.title}
          </Typography>
        </Box>

        <Box>
          <Typography gutterBottom component="span" className={classes.title}>
            Completed:
          </Typography>
          <Typography gutterBottom component="span">
            {String(Boolean(todo?.completed))}
          </Typography>
        </Box>

        <Box>
          <Typography gutterBottom component="span" className={classes.title}>
            Memo:
          </Typography>
          <Typography gutterBottom component="span" className={classes['memo-content']}>
            {todo?.memo}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )

  const todoMissingCard = (
    <Card>
      <CardContent>
        <Box>
          <Typography gutterBottom component="span" className={classes.title}>
            No ToDo found.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )

  return (
    <Container component="main">
      <Typography color="textPrimary" gutterBottom variant="h4" align="center">
        Todo
      </Typography>
      { todo ? todoCard : todoMissingCard }
      <Box className={classes['nav-link']}>
        <Link to={`/todos/${id}/edit`}>Edit</Link> | <Link to={'/'}>Back</Link>
      </Box>
    </Container>
  )
}
