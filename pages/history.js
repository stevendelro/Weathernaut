import { useEffect } from 'react'
import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import PinDropIcon from '@material-ui/icons/PinDrop'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}))

function SearchHistoryPage({ history }) {
  const classes = useStyles()
  const { historyList } = history
  return (
    <Container className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <List>
            {historyList
              .map(listItem => (
                <Paper key={uuidv4()} className={classes.paper}>
                  <ListItem>
                    <ListItemIcon>
                      <PinDropIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={listItem.location}
                      secondary={
                        <>
                          <Typography
                            component='span'
                            variant='body2'
                            className={classes.inline}
                            color='textPrimary'>
                            {listItem.timeSearched}
                          </Typography>
                        </>
                      }
                    />
                    <Divider />
                  </ListItem>
                </Paper>
              ))
              .reverse()}
          </List>
        </Grid>
      </Grid>
    </Container>
  )
}
const mapStateToProps = ({ history }) => ({ history })
export default connect(mapStateToProps, null)(SearchHistoryPage)
