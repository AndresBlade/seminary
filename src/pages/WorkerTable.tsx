import Worker from '../features/worker/styles/worker.module.css'
import WorkerShowData from '../features/worker/components/WorkerShowData'
import ContentTitle from '../features/ui/contentTitles/components/ContentTitle'
export const WorkerTable = () => {
    return (
        <div className={Worker['worker-table__container']}>
            <ContentTitle title='Trabajador' subtitle='Lista trabajadores'/>
            <WorkerShowData />
        </div>
    )
}

