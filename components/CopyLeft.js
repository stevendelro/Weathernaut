import Typography from '@material-ui/core/Typography'

export default function CopyLeft() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyleft © '}
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
