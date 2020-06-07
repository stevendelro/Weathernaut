import Typography from '@material-ui/core/Typography'

export default function NameStamp() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      <a
        color='inherit'
        href='https://github.com/stevendelro'
        style={{ textDecoration: 'none', color: 'grey' }}>
        Steven Del Rosario
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
