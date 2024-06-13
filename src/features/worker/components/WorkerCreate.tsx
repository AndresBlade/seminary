import { useState } from 'react'
import Worker from '../styles/worker.module.css'
import WorkerFormLabor from './WorkerFormLabor'
import WokerFormPersonal from './WorkerFormPersonal'
import WorkerFormContact from './WorkerFormContact'
import WorkerFormSocialMedia from './WorkerFormSocialMedia'
import WorkerFormPhoto from './WorkerFormPhoto'
import WorkerFormButtons from './WorkerFormButtons'
import ContentTitle from '../../ui/contentTitles/components/ContentTitle'

const WorkerCreate = () => {
    const [number, setNumber] = useState<number>(1)
    const [modal, setModal] = useState<boolean>(false)
    return (
        <div className={Worker['worker-create__container']}>
            <div className={modal ? Worker['worker-create__background--modal'] : Worker['worker-create__background--hidden']}></div>
            <ContentTitle title='Trabajador' subtitle='Agregar Trabajador' />
            <form className={Worker['worker-create__form']}>
                {number === 1 ?
                    <div key={1}>
                        <WokerFormPersonal />
                        <WorkerFormButtons 
                            initial
                            setNumber={setNumber}
                        />
                    </div>
                : number === 2 ?
                    <div key={2}>
                        <WorkerFormLabor />
                        <WorkerFormButtons 
                            setNumber={setNumber}/>
                    </div> 
                : number === 3 ?
                    <div key={3}>
                        <WorkerFormContact />
                        <WorkerFormButtons 
                            setNumber={setNumber}/>
                        
                    </div>
                : number === 4 ? 
                    <div className='worker-create__form--inputs-media' key={4}>
                        <WorkerFormSocialMedia
                            setModal={setModal}
                            modal={modal}
                        />
                        <WorkerFormButtons 
                            setNumber={setNumber}/>
                    </div>
                : number === 5 ?
                    <div key={5}>
                        <WorkerFormPhoto />
                        <WorkerFormButtons
                            final 
                            setNumber={setNumber}/>
                    </div>
                    : null             
                }
            </form>
        </div>
    )
}

export default WorkerCreate
