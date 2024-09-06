import { useContext, useEffect, useState } from 'react'
import DataHeader from '../../period/components/DataHeader'
import { ContentContainer } from '../../ui/container/components/ContentContainer'
import { DataWorker } from './DataWorker'
import { dataGetWorker } from '../interfaces/worker'
import { GetWorker } from '../helpers/GetWorkers'
import { AuthContext } from '../../login/context/AuthContext'
import { DeleteWorker } from '../helpers/DeleteWorker'

export const WorkerShowList = () => {
    const {user}= useContext(AuthContext)
    const [dataWorkerToList, setDataWorkerToList]=useState<dataGetWorker[] | null>(null)
    const [workerDelete, setWorkerDelete]=useState('');

    useEffect(()=>{
        if(!user?.token)return
        GetWorker(user?.token).then(response=>{
            setDataWorkerToList(response)
        }).catch(error=>{
            console.log(error)
            alert('Error al traer los seminaristas')
        })
    },[])

    useEffect(()=>{
        if(!user?.token)return
        if(workerDelete !== ''){
            DeleteWorker({id:workerDelete,token:user?.token}).then(response=>{
                if(response.ok){
                    alert('Trabajador eliminado correctamente')
                    GetWorker(user?.token).then(response=>{
                        setDataWorkerToList(response)
                    }).catch(error=>{
                        console.log(error)
                        alert('Error al traer los seminaristas')
                    })
                }
            }).catch(error=>{
                console.log(error)
                alert('Error al eliminar el trabajador')
            })
        }
    },[workerDelete])

    return (
        <ContentContainer>
            <DataHeader>
                <p>Cedula</p>
                <p>Nombres</p>
                <p>Cargo</p>
                <p>Acciones</p>
            </DataHeader>
            <DataWorker
                dataWorkerToList={dataWorkerToList}
                setWorkerDelete={setWorkerDelete}
            />
        </ContentContainer>
    )
}

