import { selectProps } from '../../interfaces/Form'
import FormCSS from '../../styles/FormCSS.module.css'
export const SelectForm = ({children,...selectProps}:selectProps) => {
    return (
        <select 
            className={FormCSS['selectForm']}
            {
                ...selectProps
            }
        >
            {children}
        </select>
    )
}

