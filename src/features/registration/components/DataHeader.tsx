import { ReactNode } from 'react'
import registrationCSS from '../styles/registrationCSS.module.css'
interface DataHeader{
    children:ReactNode
}

const DataHeader = ({children}:DataHeader) => {
    return (
        <div className={registrationCSS.dataHeader}>
            {children}
        </div>
    )
}

export default DataHeader
