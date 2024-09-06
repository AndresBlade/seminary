import React from 'react'
import WorkerCSS from '../styles/WokerCSS.module.css'
import { dataGetWorker } from '../interfaces/worker'
import deleteIcon from '../../../assets/deleteIcon.svg'
import editIcon from '../../../assets/editIcon.svg'
interface dataWorkerProps{
    dataWorkerToList:dataGetWorker[] | null;
}

export const DataWorker = ({dataWorkerToList}:dataWorkerProps) => {
    return (
        <div className={WorkerCSS.dataWorkerContainer}>
            {dataWorkerToList === null ? <p>No hay datos para mostrar</p>:
            dataWorkerToList?.map(worker=>
                <div key={worker.person.id} className={WorkerCSS.dataWorker}>
                    <p>{worker.person.id}</p>
                    <p>{worker.person.forename + ' '+ worker.person.surname}</p>   
                    <p>{worker.position}</p>
                    <div className={WorkerCSS.buttonsActions}>
                        <button>
                            <img src={editIcon} alt="Editar" />
                        </button>
                        <button><img src={deleteIcon} alt="Eliminar" /></button>
                    </div>
                </div>
                
            )}
        </div>
    )
}

