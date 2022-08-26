import StatusValid from '../../images/StatusValid.svg'
import StatusNoValid from '../../images/StatusNoValid.svg'
import './InfoToolTip.css';
function InfoToolTip({isOpen, onClose, config}) {
    return (
        <>
            <div className={`info popup-info ${isOpen ? 'popup__open' : ''}`}>
                <div className="popup__info info__container">
                    <img className='info__image' alt={config.status ? "Успешная регистрация!" : "Что-то пошло не так!"} src={config.status ? StatusValid : StatusNoValid} ></img>
                    <h2 className="popup__title margin">{config.messageText}</h2>
                    <button className="popup__botton-close" onClick={onClose}></button>
                </div>
            </div>
        </>
    )
}

export default InfoToolTip;