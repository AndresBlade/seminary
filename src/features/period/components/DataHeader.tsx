import { DataHeaderProps } from "../interfaces/Period"
import PeriodCSS from "../styles/PeriodCSS.module.css"
const DataHeader = ({children,...dataHeaderProps}:DataHeaderProps) => {
    return (
        <div
            className={PeriodCSS.dataHeader}
            {...dataHeaderProps}
        >
            {children}
        </div>
    )
}

export default DataHeader
