import Parish from '../styles/parish.module.css'
import ContentTitle from '../../ui/contentTitle/components/ContentTitle'
import {ParishShowData} from '../../../pages/ParishShowData'
const ParishTable = () => {
    return (
        <div className={Parish['parish-table__container']}>
            <ContentTitle title="Eclesiástico" subtitle="Lista de parroquias" />
            <ParishShowData />
        </div>
    )
}

export default ParishTable
