import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './Layout.scss'; // Import your CSS file

const Layout = () => {
  const location = useLocation()

  useEffect(() => {
 
    const bodyClassList = document.body.classList

    const uuidPattern = /^\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

    if (
      location.pathname === '/recommendations' || 
      location.pathname === '/' || 
      location.pathname === '/dashboard' ||
      uuidPattern.test(location.pathname)
    ) {
      bodyClassList.add('background-color')
      bodyClassList.remove('background-image')
    
    } else {
      bodyClassList.add('background-image')
      bodyClassList.remove('background-color')
    }

    // Cleanup function to reset styles
    return () => {
      bodyClassList.remove('background-color')
      bodyClassList.remove('background-image')
    };

  }, [location])

  return null
};

export default Layout
