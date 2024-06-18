import './Header.scss'
import logo from '../../assets/logo/aviation_logo-22.png'
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../contexts/AuthContext';

function Header() {
    const [activeLink, setActiveLink] = useState('')
    const [ menuOpen, setMenuOpen ] = useState(false)
    // const [ isDesktop, setIsDesktop ] = useState(window.innerWidth >= 768)
    const location = useLocation();
    const { isLoggedIn } = useAuth()

    // const updateActiveLink = (linkName) => {
    //     if(isDesktop) {
    //         setActiveLink(linkName)
    //     }

    //     setMenuOpen(false) //Close menu when a link is clicked
    // }

    const updateActiveLink = (linkName) => {
        setActiveLink(linkName)
        setMenuOpen(false) //Close menu when a link is clicked
    }

    const toggleMenu = () => {
        setMenuOpen(prevState => !prevState)
    }

    // const handleResize = () => {
    //     setIsDesktop(window.innerWidth >= 768)
    // }

    // useEffect(() => {
    //     window.addEventListener('resize', handleResize)
    //     return () => window.removeEventListener('resize', handleResize)
    // }, [])

    // useEffect(() => {
    //     if(isDesktop) {
    //         setActiveLink(location.pathname)
    //     }
    // }, [location.pathname, isDesktop])

    useEffect(() => {
        setActiveLink(location.pathname)
    }, [location.pathname])


//     return (
//         <header className='header'>
//             <section className='header__container'>
//                 <nav className='header__logo-container'>
//                     <Link to={`/`} onClick={() => updateActiveLink('/')}>
//                         <img src={logo} alt='travel logo' className='header__logo'/>
//                         <span className='header__web-title'>Trip Crafters</span>
//                     </Link>
//                     <FontAwesomeIcon
//                         icon={menuOpen ? faTimes : faBars}
//                         className='header__burger'
//                         onClick={toggleMenu}
//                     />
//                 </nav>
//                 <section className={`header__nav-link ${menuOpen ? 'header__nav-link--open' : ''}`}>
//                     <div className={`header__state ${activeLink === '/' ? 'header__active-nav-link' : ''}`}>
//                         <Link to={`/`} onClick={() => updateActiveLink('/')}>
//                             <h3 className='header__title'>User Input</h3>
//                         </Link>
//                     </div>
//                     <div className={`header__state ${activeLink === '/recommendations' ? 'header__active-nav-link' : ''}`}>
//                         <Link to={`/recommendations`} onClick={() => updateActiveLink('recommendations')}>
//                             <h3 className='header__title'>Travel Plan</h3>
//                         </Link> 
//                     </div>
//                     <div className={`header__state ${activeLink === '/login' ? 'header__active-nav-link' : ''}`}>
//                         <Link to={`/login`} onClick={() => updateActiveLink('login')}>
//                             <h3 className='header__title'>Login</h3>
//                         </Link> 
//                     </div>
//                     <div className={`header__state ${activeLink === '/dashboard' ? 'header__active-nav-link' : ''}`}>
//                         <Link to={`/dashboard`} onClick={() => updateActiveLink('dashboard')}>
//                             <h3 className='header__title'>User Account</h3>
//                         </Link> 
//                     </div>
//                 </section>
//             </section>
//         </header>
//     )
// }

    return (
        <header className='header'>
            <section className='header__container'>
                <nav className='header__logo-container'>
                    <Link to={`/`} onClick={() => updateActiveLink('/')} className='header__logo-link'>
                        <img src={logo} alt='travel logo' className='header__logo' />
                        <span className='header__web-title'>Trip Crafters</span>
                    </Link>
                    <FontAwesomeIcon
                        icon={menuOpen ? faTimes : faBars}
                        className='header__burger'
                        onClick={toggleMenu}
                    />
                </nav>
                <section className={`header__nav-link ${menuOpen ? 'header__nav-link--open' : ''}`}>
                    <div className={`header__state ${activeLink === '/' ? 'header__active-nav-link' : ''}`}>
                        <Link to={`/`} onClick={() => updateActiveLink('/')}>
                            <h3 className='header__title'>User Input</h3>
                        </Link>
                    </div>
                    <div className={`header__state ${activeLink === '/recommendations' ? 'header__active-nav-link' : ''}`}>
                        <Link to={`/recommendations`} onClick={() => updateActiveLink('/recommendations')}>
                            <h3 className='header__title'>Travel Plan</h3>
                        </Link>
                    </div>
                    {!isLoggedIn && (
                        <div className={`header__state ${activeLink === '/login' ? 'header__active-nav-link' : ''}`}>
                            <Link to={`/login`} onClick={() => updateActiveLink('/login')}>
                                <h3 className='header__title'>Login</h3>
                            </Link>
                        </div>
                    )}
                    <div className={`header__state ${activeLink === '/dashboard' ? 'header__active-nav-link' : ''}`}>
                        <Link to={`/dashboard`} onClick={() => updateActiveLink('/dashboard')}>
                            <h3 className='header__title'>User Account</h3>
                        </Link>
                    </div>
                </section>
            </section>
        </header>
    )
}

 
export default Header