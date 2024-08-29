import { Dispatch, ReactNode, SetStateAction } from 'react'
import registrationCSS from '../styles/registrationCSS.module.css'
import close from '../../../assets/MaterialSymbolsClose.svg'
interface ModalProps{
    text:string
    children:ReactNode
    setModal:Dispatch<SetStateAction<boolean>>
}

const Modal = ({text,children,setModal}:ModalProps) => {
    return (
        <div className={registrationCSS.modal}>
            <div className={registrationCSS.modalBody}>
                <div className={registrationCSS.modalHeader}>
                    <h2>{text}</h2>
                    <button onClick={(e)=>{
                        e.preventDefault()
                        setModal(false)
                    }}>
                        <img src={close} alt="Cerrar" />
                    </button>
                </div>
                {children}
            </div>
            
        </div>
    )
}

export default Modal
