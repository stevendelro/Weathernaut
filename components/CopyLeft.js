import Link from './Link'

export default function Copyleft() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyleft © '}
      <Link color='inherit' href='https://github.com/stevendelro'>
        Steven Del Rosario
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
