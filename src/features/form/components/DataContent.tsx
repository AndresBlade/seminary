import FormCSS from '../styles/FormCSS.module.css'
import { DataContent } from '../interfaces/Form'
const DataContent = ({children,...DataContent}:DataContent) => {
    return (
        <div className={FormCSS['dataContent']}
            {...DataContent}

        >
            {children}
        </div>
    )
}

export default DataContent
