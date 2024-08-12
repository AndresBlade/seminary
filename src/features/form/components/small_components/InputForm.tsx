import FormCSS from '../../styles/FormCSS.module.css'
import { inputProps } from '../../interfaces/Form'

export const InputForm = (inputProps:inputProps) => {
    return (
        <input className={FormCSS['inputForm']}
        {...inputProps}
        />
    )
}