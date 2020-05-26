import { useRouter } from 'next/router'

const servePage = (pageName) => {
  const router = useRouter()
  switch (pageName) {
    case 'home':
      router.push('/')
      break;
    case 'daily':
      router.push('/daily')
      break;
    case 'hourly':
      router.push('/hourly', )
      break;
    case 'history':
      router.push('/history')
      break;
    case 'search':
      router.push('/search')
      break;
    default:
      router.push('/not-found')
  }
}

export default servePage
