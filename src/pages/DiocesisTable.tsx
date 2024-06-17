import Diocesis from '../features/diocesis/styles/diocesis.module.css'
import ContentTitle from '../features/ui/contentTitle/components/ContentTitle'
import DiocesisShowData from '../features/diocesis/components/DiocesisShowData'

export const DiocesisTable = () => {
    return (
        <div className={Diocesis['diocesis-table__container']}>
            <ContentTitle title="Diocesis" subtitle="Lista Diocesis" />
            <DiocesisShowData />
        </div>
    )
}
