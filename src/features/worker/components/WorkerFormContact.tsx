import React from 'react'
import Worker from '../styles/worker.module.css'
import { WorkerContactInfo } from './WorkerCreate'

interface WorkerFormPersonalProps{
    workerPhone:{
        phone: string
        description: string
        phoneFamily: string
        descriptionFamily: string
        email: string

    }
    setWorkerPhone: React.Dispatch<React.SetStateAction<WorkerContactInfo>>
}

const WorkerFormContact = ({workerPhone:{phone,description,phoneFamily,descriptionFamily,email},setWorkerPhone}:WorkerFormPersonalProps) => {


    return (
        <div className={Worker['worker-create__form-inputs']}>
            <h2>Información de contacto</h2>
            <div className={Worker['worker-create__form--personal']}>
                <div className={Worker['worker-create__form--phone']}>
                    <label htmlFor="phone" className={Worker['worker-create__form-phone--label']}>Teléfono</label>
                    <input type="text" name="phone" id="phone" value={phone} onChange={(e)=>{
                        setWorkerPhone((worker)=>{
                            return{...worker, phone: e.target.value}
                        })
                    }} />
                </div>
                <div className={Worker['worker-create__form--email']}>
                    <label htmlFor="email" className={Worker['worker-create__form-email--label']}>Descripcion</label>
                    <input type="description" name="description" id="description" value={description} onChange={(e)=>{
                        setWorkerPhone((worker)=>{
                            return{...worker, description: e.target.value}
                        })
                    }}/>
                </div>
                <div className={Worker['worker-create__form--email']}>
                    <label htmlFor="email" className={Worker['worker-create__form-email--label']}>Correo electronico</label>
                    <input type="text" name="email" id="email" value={email} onChange={(e)=>{
                        setWorkerPhone((worker)=>{
                            return{...worker, email: e.target.value}
                        })
                    }}/>
                </div>
                <div className={Worker['worker-create__form--phoneFamily']}>
                    <label htmlFor="address" className={Worker['worker-create__form-phoneFamily--label']}>Telefono de contacto familiar</label>
                    <input type="text" name="phoneFamily" id="phoneFamily" value={phoneFamily} onChange={(e)=>{
                        setWorkerPhone((worker)=>{
                            return{...worker, phoneFamily: e.target.value}
                        })
                    }} />
                </div>
                <div className={Worker['worker-create__form--nameContact']}>
                    <label htmlFor="address" className={Worker['worker-create__form-nameContact--label']}>Descripcion</label>
                    <input type="text" name="nameContact" id="nameContact" value={descriptionFamily} onChange={(e)=>{
                        setWorkerPhone((worker)=>{
                            return{...worker, descriptionFamily: e.target.value}
                        })
                    }} />
                </div>
            </div>

        </div>

    )
}

export default WorkerFormContact
