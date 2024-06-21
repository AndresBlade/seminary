import Parish from '../features/parish/styles/parish.module.css'
import ContentTitle from '../features/ui/contentTitle/components/ContentTitle'
import {ParishForm} from '../features/parish/components/ParishForm'
export const ParishCreate = () => {
    return (
        <div className={Parish['parish-create__container']}>
            <ContentTitle title="Eclesiástico" subtitle="Agregar parroquia" />
            <ParishForm />
        </div>
    )
}

