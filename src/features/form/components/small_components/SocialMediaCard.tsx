import FormCSS from '../../styles/FormCSS.module.css'
import { socialMediaModalCardProps } from '../../interfaces/Form'

export const SocialMediaCard = ({children,...socialMediaProps}:socialMediaModalCardProps) => {
    return (
        <button className={FormCSS['socialMediaButton']}
            {...socialMediaProps}
        >
            {children}
        </button>
    )
}

