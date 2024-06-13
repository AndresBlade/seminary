import { FC, HTMLAttributes } from 'react'
import ContentCSS from '../styles/contentCSS.module.css'

interface ContentTitleProps {
    title: string
    subtitle: string

}
export type ContentTitleProp = HTMLAttributes<HTMLDivElement> & ContentTitleProps

const ContentTitle: FC<ContentTitleProps> = ({title,subtitle}) => {
    return (
        <div className={ContentCSS['content-title__container']}>
            <div className={ContentCSS['title-h1']}>
                <h1>{title}</h1>
            </div>
            <div className={ContentCSS['title-h2']}>
                <h2>{subtitle}</h2>
            </div>
        </div>
    )
}

export default ContentTitle