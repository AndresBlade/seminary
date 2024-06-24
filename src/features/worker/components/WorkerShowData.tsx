import Worker from '../styles/worker.module.css'
import WorkerDataContent from './WorkerDataContent'
import UseGet from '../../../shared/hooks/useGet'

interface WorkerData {
    person:{
        id:string,
        profile_picture_path:string,
        forename:string,
        surname:string,
        email:string,
        birthdate:string,
        medical_record:string,
        BloodType:string
    },
    social:{
        id:string,
        person_id:string,
        social_Cate:string,
        link:string
    }[],
    phone:{
        id:string,
        phone_number:string,
        person_id:string,
        description:string
    }[],
    position:string
}[]

const WorkerShowData = () => {
    const apiUrl = 'http://127.0.0.1:3000/worker/';
    const {data,loading,error} = UseGet(apiUrl);
    console.log(data)
    return (

        <section className={Worker['data-show__container']}>
            <div className={Worker['data-search']}>
                <input type="search" />
                <button type='submit'>Buscar</button>
            </div>
            <div className={Worker['data-show__title']}>
                <h2>Cedula</h2>
                <h2>Nombre</h2>
                <h2>Cargo</h2>
                <h2>Acciones</h2>
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
                    return (
                        <WorkerDataContent 
                            key={worker.person.id}
                            id={worker.person.id}
                            name={worker.person.forename + worker.person.surname}
                            job={worker.position
                            }
                        />
                    )
                })
            }
            </div>
        </section>
    )
}

export default WorkerShowData