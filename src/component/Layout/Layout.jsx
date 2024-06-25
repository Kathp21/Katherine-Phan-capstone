import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import backgroundImage from '../../assets/images/background-img.jpg'

const Layout = () => {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/recommendations' || location.pathname === '/' || location.pathname === '/dashboard' || location.pathname.startsWith('/itinerary-details')) {
      document.body.style.backgroundImage = 'none'
      document.body.style.backgroundColor = '#cde7f9'
    } else {
      document.body.style.backgroundImage = `url(${backgroundImage})`
      document.body.style.backgroundColor = 'transparent'
    }
  }, [location])

  return null
}

export default Layout
