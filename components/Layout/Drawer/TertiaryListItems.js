import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import GitHubIcon from '@material-ui/icons/GitHub'

export default function TertiaryListItems () {
  return (
    <>
      <ListSubheader inset>Source Code</ListSubheader>
      <ListItem
        button
        onClick={() =>
          (window.location.href =
            'https://github.com/stevendelro/react-weather-dashboard')
        }>
        <ListItemIcon>
          <GitHubIcon />
        </ListItemIcon>
        <ListItemText primary='GitHub' />
      </ListItem>
    </>
  )
}
