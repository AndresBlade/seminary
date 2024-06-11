import Diocesis from '../styles/diocesis.module.css'
import ContentTitle from '../../ui/contentTitle/components/ContentTitle'
import DiocesisShowData from './DiocesisShowData'
export const DiocesisTable = () => {
    return (
        <div className={Diocesis['diocesis-table__container']}>
            <ContentTitle title="Diocesis" subtitle="Lista Diocesis" />
            <DiocesisShowData />
        </div>
    )
}
