import { useParams } from 'react-router-dom'

import Diocesis from '../features/diocesis/styles/diocesis.module.css'
import ContentTitle from '../features/ui/contentTitle/components/ContentTitle'
import { DiocesisForm } from '../features/diocesis/components/DiocesisForm'
export const DiocesisCreate = () => {
    const {id} = useParams();
    return (
        <div className={Diocesis['diocesis-create__container']}>
            <ContentTitle title="Diocesis" subtitle={isNaN(Number(id)) ? "Crear Diocesis" : "Editar Diocesis"} />
            <DiocesisForm />
        </div>
    ) 
}

