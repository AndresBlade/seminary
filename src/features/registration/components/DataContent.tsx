import { ReactNode } from 'react'
import registrationCSS from '../styles/registrationCSS.module.css'

interface DataContent{
    children: ReactNode
}

export const DataContent = ({children}:DataContent) => {
    return (
        <div className={registrationCSS.dataContent}>   
            {children}
        </div>
    )
}

