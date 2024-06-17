import { FC, useState, useEffect } from 'react'
import Worker from '../styles/worker.module.css'
import EditIcon from '../../../assets/editIcon.svg'
import DeleteIcon from '../../../assets/deleteIcon.svg'
import useDelete from '../../../shared/hooks/useDelete'
interface WorkerDataContentProps {
    job?: string
    name: string
    id:string

}

const WorkerDataContent: FC<WorkerDataContentProps> = ({id,name,job}) => {
    const apiUrl = 'http://localhost:3001/worker/';
    const [workerDelete, setWorkerDelete] = useState<string>('');
    const {deleteData} = useDelete({apiUrl,idDelete:workerDelete});

    useEffect(()=>{
        if(workerDelete !== ''){
            deleteData().catch(console.error);
            setTimeout(() => {
                window.location.reload()
            },2000)
        }
    },[workerDelete,deleteData])

    console.log(`id para eliminar: ${workerDelete}`)
    return (
        <div className={Worker['data-content']} key={id} >
            <div className={Worker['data-info']}>
                <p>{id}</p>
                <p>{name}</p>
                <p>{job}</p>
            </div>
            <div className={Worker['data-buttons']}>
                <button>
                    <img src={EditIcon} alt="Editar"/>                     
                </button>
                <button type='button' onClick={()=>{
                    setWorkerDelete(id)
                }}>
                    <img src={DeleteIcon} alt="Eliminar" />
                </button>
            </div>
        </div>
    )
}

export default WorkerDataContent