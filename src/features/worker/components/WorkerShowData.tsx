import Worker from '../styles/worker.module.css'
import WorkerDataContent from './WorkerDataContent'
import UseGet from '../../../shared/hooks/useGet'

interface WorkerData {
    id: string
    name: string
    job: string
}

const WorkerShowData = () => {
    const apiUrl = 'http://localhost:3001/worker';
    const {data,loading,error} = UseGet(apiUrl);
    return (

        <section className={Worker['data-show__container']}>
            <div className={Worker['data-show__title']}>
                <h2>Cedula</h2>
                <h2>Nombre</h2>
                <h2>Cargo</h2>
            </div>
            <div className={Worker['data-content__container']}>
                {loading ? <tr className={Worker['animation-container']}>
                                    <td className={Worker['animation-loading']}></td>
                                    <td className={Worker['animation-loading__two']}></td>
                                </tr>

                :
                
                    error ? <tr><td>Error al cargar los datos</td></tr>
                :

                (data as [])?.map((worker:WorkerData) =>{
                    return <WorkerDataContent 
                        key={worker.id}
                        id={worker.id}
                        name={worker.name}
                        job={worker.job}
                    />
                })
            }
            </div>
        </section>
    )
}

export default WorkerShowData