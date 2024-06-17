import Worker from '../styles/worker.module.css'
import WorkerShowData from './WorkerShowData'
const WorkerTable = () => {
    return (
        <div className={Worker['worker-table__container']}>
            <WorkerShowData />
        </div>
    )
}

export default WorkerTable
