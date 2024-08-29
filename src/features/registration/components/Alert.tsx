import { ReactNode } from 'react'
import registrationCSS from '../styles/registrationCSS.module.css'
import iconSuccess from '../../../assets/MaterialSymbolsCheckCircleOutlineRounded.svg'
import iconError from '../../../assets/MaterialSymbolsCancelOutlineRounded.svg'

interface AlertProps{
    children?:ReactNode
    textAlert:string
    isSuccess:boolean
}

export const Alert = ({children,textAlert,isSuccess}:AlertProps) => {
    return (
        <div className={isSuccess ? registrationCSS.alertSuccess : registrationCSS.alertError}>
            {isSuccess ?
                <img src={iconSuccess} alt="Success" className={registrationCSS.imgAlert} />
                :
                <img src={iconError} alt="Error" className={registrationCSS.imgAlert} />
            }
            <p>{textAlert}</p>
            {children}
            
        </div>
    )
}

