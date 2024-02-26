import './Loading.scss'

export default function Loading({text = 'LOADING'}) {
    const characters = text.split('')
    
    return (
        <div className='loading'>
            <div className='loading__container'>
                <div className='loading__text'>     
                    {characters.map((char, index) => (
                        <span key={index} style={{ margin: '0 2px' }}>{char}</span>
                    ))}
                </div>
                
            </div>
        </div>
    )
}