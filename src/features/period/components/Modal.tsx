import { ModalProps } from "../interfaces/Period"
import PeriodCSS from '../styles/PeriodCSS.module.css'
import CloseIcon from '../../../assets/MaterialSymbolsClose.svg'
import { Dispatch, ReactNode, SetStateAction } from "react"

interface Modal extends ModalProps {
    setShowModal:Dispatch<SetStateAction<boolean>>
    children: ReactNode
}

const Modal = ({setShowModal,children,...modalProps}:Modal) => {
    return (
        <div
            className={PeriodCSS.modal}
            {...modalProps}
        >
            <div className={PeriodCSS.modalContent}>
                <button className={PeriodCSS.buttonClose} onClick={()=>{
                    setShowModal(false)
                }}><img src={CloseIcon} alt="close" /></button>
                {children}

            </div>
        </div>
    )
}

export default Modal
