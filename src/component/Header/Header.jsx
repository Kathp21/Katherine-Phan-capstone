import './Header.scss'
import logo from '../../assets/logo/aviation_logo-22.png'
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';

function Header() {
    const [activeLink, setActiveLink] = useState('')
    const location = useLocation();

    const updateActiveLink = (linkName) => {
        setActiveLink(linkName)
    }

    useEffect(() => {
        setActiveLink(location.pathname)
    }, [location.pathname])


    return (
        <header className='header'>
            <section className='header__container'>
                <nav className='header__logo-container'>
                    <Link to={`/`} onClick={() => updateActiveLink('/')}>
                        <img src={logo} alt='travel logo' className='header__logo'/>
                        <span className='header__web-title'>Trip Crafters</span>
                    </Link>
                </nav>
                <section className='header__nav-link'>
                    <div className={`header__state ${activeLink === '/' ? 'header__active-nav-link' : 'header__inactive-nav-link'}`}>
                        <Link to={`/`} onClick={() => updateActiveLink('/')}>
                            <h3 className='header__title'>User Input</h3>
                        </Link>
                    </div>
                    <div className={`header__state ${activeLink === '/recommendations' ? 'header__active-nav-link' : 'header__inactive-nav-link'}`}>
                        <Link to={`/recommendations`} onClick={() => updateActiveLink('recommendations')}>
                            <h3 className='header__title'>Travel Plan</h3>
                        </Link> 
                    </div>
                    <div className={`header__state ${activeLink === '/login' ? 'header__active-nav-link' : 'header__inactive-nav-link'}`}>
                        <Link to={`/login`} onClick={() => updateActiveLink('recommendations')}>
                            <h3 className='header__title'>Login</h3>
                        </Link> 
                    </div>
                    <div className={`header__state ${activeLink === '/login' ? 'header__active-nav-link' : 'header__inactive-nav-link'}`}>
                        <Link to={`/login`} onClick={() => updateActiveLink('recommendations')}>
                            <h3 className='header__title'>User Account</h3>
                        </Link> 
                    </div>
                </section>
            </section>
        </header>
    )
}
 
export default Header