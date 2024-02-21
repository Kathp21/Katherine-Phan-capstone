import './Button.scss'

function Button({buttonText, variant, type="button", onClick, label}) {
    return <button type={type} className={`button ${variant}`} onClick={onClick}>{buttonText}{label}</button>
}

export default Button