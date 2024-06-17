import Worker from '../styles/worker.module.css'

interface WorkerFormPersonalProps{
    name: string
    lastName: string
    id: string
    birthDate: string
}


const WorkerFormPersonal = ({name,lastName,id,birthDate}:WorkerFormPersonalProps) => {
    return (
        <div className={Worker['worker-create__form-inputs']}>
            <h2>Información Personal</h2>
            <div className={Worker['worker-create__form--personal']}>
                <div className={Worker['worker-create__form--name']}>
                    <label htmlFor="name" className={Worker['worker-create__form-name--label']}>Nombres</label>
                    <input type="text" id='name' className='' value={name} />
                </div>
                <div className={Worker['worker-create__form--lastName']}>
                    <label htmlFor="lastName" className={Worker['worker-create__form-lastName--label']}>Apellidos</label>
                    <input type="text" id='lastName' value={lastName}/>
                </div>    
                <div className={Worker['worker-create__form--id']}>                        
                    <label htmlFor="id" className={Worker['worker-create__form-id--label']}>Cedula</label>
                    <input type="text" id='id' value={id}/>
                </div>
                <div className={Worker['worker-create__form--date']}>                        
                    <label htmlFor="date" className={Worker['worker-create__form-date--label']}>Fecha de nacimiento</label>
                    <input type="date" id='date' value={birthDate}/>
                </div>
            </div>

        </div>

    )
}

export default WorkerFormPersonal
