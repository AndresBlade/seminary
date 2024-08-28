import {DataContentProps} from "../interfaces/Period"
import PeriodCSS from '../styles/PeriodCSS.module.css'
const DataContent = ({children, ...dataContentProps}:DataContentProps) => {
    return (
        <div
            className={PeriodCSS.dataContent}
            {...dataContentProps}
        >
            {children}
        </div>
    )
}

export default DataContent
