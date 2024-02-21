import './Button.scss'

function Button({buttonText, variant, type="button", onClick, label, style}) {
    return <button type={type} style={style} className={`button ${variant}`} onClick={onClick}>{buttonText}{label}</button>
}

export default Button