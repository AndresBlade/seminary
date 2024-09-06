import { useContext, useEffect, useState } from 'react'
import DataHeader from '../../period/components/DataHeader'
import { ContentContainer } from '../../ui/container/components/ContentContainer'
import { DataWorker } from './DataWorker'
import { dataGetWorker } from '../interfaces/worker'
import { GetWorker } from '../helpers/GetWorkers'
import { AuthContext } from '../../login/context/AuthContext'

export const WorkerShowList = () => {
    const {user}= useContext(AuthContext)
    const [dataWorkerToList, setDataWorkerToList]=useState<dataGetWorker[] | null>(null)


    useEffect(()=>{
        if(!user?.token)return
        GetWorker(user?.token).then(response=>{
            setDataWorkerToList(response)
        }).catch(error=>{
            console.log(error)
            alert('Error al traer los seminaristas')
        })
    },[])

    return (
        <ContentContainer>
            <DataHeader>
                <p>Cedula</p>
                <p>Nombres</p>
                <p>Posicion</p>
                <p>Acciones</p>
            </DataHeader>
            <DataWorker
                dataWorkerToList={dataWorkerToList}
            />
        </ContentContainer>
    )
}

