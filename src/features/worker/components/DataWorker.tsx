import React, { SetStateAction } from 'react'
import WorkerCSS from '../styles/WokerCSS.module.css'
import { dataGetWorker } from '../interfaces/worker'
import deleteIcon from '../../../assets/deleteIcon.svg'
import editIcon from '../../../assets/editIcon.svg'
import { useNavigate } from 'react-router-dom'
interface dataWorkerProps{
    dataWorkerToList:dataGetWorker[] | null;
    setWorkerDelete:React.Dispatch<SetStateAction<string>>
}

export const DataWorker = ({dataWorkerToList,setWorkerDelete}:dataWorkerProps) => {
    const navigate = useNavigate()
    return (
        <div className={WorkerCSS.dataWorkerContainer}>
            {dataWorkerToList === null ? <p>No hay datos para mostrar</p>:
            dataWorkerToList?.map(worker=>
                <div key={worker.person.id} className={WorkerCSS.dataWorker}>
                    <p>{worker.person.id}</p>
                    <p>{worker.person.forename + ' '+ worker.person.surname}</p>   
                    <p>{worker.position}</p>
                    <div className={WorkerCSS.buttonsActions}>
                        <button
                            onClick={()=>{
                                navigate(`${worker.person.id}`)            
                            }}
                        >
                            <img src={editIcon} alt="Editar" />
                        </button>
                        <button type='button'
                            onClick={(e)=>{
                                e.preventDefault()
                                setWorkerDelete(worker.person.id)
                            }}
                        >
                            <img src={deleteIcon} alt="Eliminar" />
                        </button>
                    </div>
                </div>
                
            )}
        </div>
    )
}

