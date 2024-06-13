import Worker from '../styles/worker.module.css'
import { Dispatch, SetStateAction } from 'react'
import IconArrowForward from '../../../assets/IconArrowForward.svg'
import IconArrowBack from '../../../assets/IconArrowBack.svg'

interface WorkerFormButtonsProps{
    setNumber: Dispatch<SetStateAction<number>>
    initial?: boolean
    final?: boolean
}

const WorkerFormButtons = ({setNumber,initial,final}:WorkerFormButtonsProps) => {
    return (
            <div className={Worker['worker-create__form--button']}>
                {!initial && <button className={Worker['worker-create__form-button--back']}
                        onClick={(e) => 
                            {
                                e.preventDefault()
                                setNumber((value)=>{
                                    return value - 1
                                })
                            }
                        }
                    >
                        <img src={IconArrowBack} alt="Forward" />
                        Anterior
                    </button>

                }
                {!final && <button className={Worker['worker-create__form-button--next']}
                    onClick={(e) => 
                        {
                            e.preventDefault()
                            setNumber((value)=>{
                                return value + 1
                            })
                        }
                    }
                    >
                    Siguiente
                    <img src={IconArrowForward} alt="Forward" />
                </button>}
                
            </div>

    )
}

export default WorkerFormButtons
