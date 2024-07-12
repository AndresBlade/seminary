import { titleProps } from '../../interfaces/Form'
import FormCSS from '../../styles/FormCSS.module.css'
export const TitleForm = ({title}:titleProps) => {
    return (
        <h2 className={FormCSS['title']} >{title}</h2>
    )
}

