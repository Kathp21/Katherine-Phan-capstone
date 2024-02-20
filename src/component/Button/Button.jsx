import './Button.scss'

function Button({buttonText, variant, type="button", onClick}) {
    return <button type={type} className={`button ${variant}`} onClick={onClick}>{buttonText}</button>
}

export default Button