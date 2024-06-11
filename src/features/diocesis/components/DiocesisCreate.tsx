import Diocesis from '../styles/diocesis.module.css'
import ContentTitle from '../../ui/contentTitle/components/ContentTitle'
import { DiocesisForm } from './DiocesisForm'
export const DiocesisCreate = () => {
    return (
        <div className={Diocesis['diocesis-create__container']}>
            <ContentTitle title="Diocesis" subtitle="Crear Diocesis" />
            <DiocesisForm />
        </div>
    )
}

