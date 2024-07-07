import FormCSS from '../../styles/FormCSS.module.css'
import { labelProps } from '../../interfaces/Form'


export const LabelForm = ({children,...labelProps}:labelProps) => {
    return (
        <label
            className={FormCSS['formLabel']}
            {...labelProps}
        >
            {children}
        </label>
    )
}

