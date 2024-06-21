import React from 'react'
import Worker from '../styles/worker.module.css'
import { WorkerJobAndMedical } from './WorkerCreate'

interface WorkerFormLaborProps{
    jobPosition: string
    blood: string
    condition: string
    setWorkerJobPositionAndMedical: React.Dispatch<React.SetStateAction<WorkerJobAndMedical>>
}


const WorkerFormLabor = ({blood,condition,jobPosition,setWorkerJobPositionAndMedical}:WorkerFormLaborProps) => {
    return (
        <div className={Worker['worker-create__form-inputs']}>
            <h2>Información laboral</h2>
            <div className={Worker['worker-create__form--personal']}>
                <div className={Worker['worker-create__form--post']}>
                <label htmlFor="post" className={Worker['worker-create__form-post--label']}>Cargo actual</label>
                <input type="text" name='post' id='post' value={jobPosition} 
                    onChange={(e)=>{
                        
                        setWorkerJobPositionAndMedical((worker)=>{
                            return{...worker, jobPosition: e.target.value}
                        })
                    }}
                />
            </div>
            <h2>Información de salud</h2>
            <div className={Worker['worker-create__form--blood']}>
                <label htmlFor="blood" className={Worker['worker-create__form-lastName--label']}>Tipo de sangre</label>
                <input type="text" name='blood' id='blood' value={blood} onChange={(e)=>{
                        
                        setWorkerJobPositionAndMedical((worker)=>{
                            return{...worker, blood: e.target.value}
                        })
                    }} />
            </div>    
            <div className={Worker['worker-create__form--condition']}>                        
                <label htmlFor="condition" className={Worker['worker-create__form-id--label']}>Condicion medica</label>
                <input type="text" name="condition" id="condition" value={condition}
                    onChange={(e)=>{
                        
                        setWorkerJobPositionAndMedical((worker)=>{
                            return{...worker, condition: e.target.value}
                        })
                    }} 
                />
                </div>
                </div>
        </div>

    )
}

export default WorkerFormLabor
