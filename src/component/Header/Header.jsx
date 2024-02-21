import './Header.scss'
import logo from '../../assets/logo/aviation_logo-22.png'

function Header() {
    return (
        <>
            <header className='header'>
                <section className='header__container'>
                    <nav className='header__logo-container'>
                        <img src={logo} alt='tarvel logo' className='header__logo'/>
                        <span className='header__web-title'>Trip Planner</span>
                    </nav>
                    <section className='header__nav-link'>
                        <div className='header__active-nav-link'> 
                            <h3 className='header__title'>Home Page</h3>
                        </div>
                        <div className='header__inactive-nav-link'> 
                            <h3 className='header__title'>Suggestions</h3>
                        </div>
                    </section>
                </section>
            </header>
        </>
    )
}

export default Header