import FormCSS from '../../styles/FormCSS.module.css'
import { containerProps } from '../../interfaces/Form'

export const ContainerForm = ({children,...containerProps}:containerProps) => {
    return (
        <div className={FormCSS['containerForm']}
            {...containerProps}
        >
            {children}
        </div>
    )
}

