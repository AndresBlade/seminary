import { useContext, useEffect, useState } from 'react'
import DataHeader from '../../period/components/DataHeader'
import { ContentContainer } from '../../ui/container/components/ContentContainer'
import { DataWorker } from './DataWorker'
import { dataGetWorker } from '../interfaces/worker'
import { GetWorker } from '../helpers/GetWorkers'
import { AuthContext } from '../../login/context/AuthContext'
import { DeleteWorker } from '../helpers/DeleteWorker'
import { InputForm } from '../../form/components/small_components/InputForm'
import { GetWorkerFound } from '../helpers/GetWorkerFound'

export const WorkerShowList = () => {
    const {user}= useContext(AuthContext)
    const [dataWorkerToList, setDataWorkerToList]=useState<dataGetWorker[] | null>(null)
    const [workerDelete, setWorkerDelete]=useState('');
    const [workerToFind,setWorkerToFind]=useState('');
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

    useEffect(()=>{
        if(!user?.token)return
        GetWorkerFound({id:workerToFind,token:user?.token}).then(response=>{
            setDataWorkerToList(response)
        }).catch(error=>{
            console.log(error)
            alert('Error al buscar el trabajador')
        }
        )
    },[workerToFind])
    return (
        <ContentContainer>
            <InputForm type='text'
                placeholder='Buscar trabajador por id. Ejemplo: V-0000000'
                onChange={(e)=>{
                    setWorkerToFind(e.target.value)
                }}
                onKeyDown={(event) => {
                    const allowedKeys = [
                        'ArrowLeft', 'ArrowRight', 'Delete', 'Enter',
                        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'V', 'v','-'
                    ];
                    if (!allowedKeys.includes(event.key)) {
                        event.preventDefault();
                    }
                }}
            />
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

