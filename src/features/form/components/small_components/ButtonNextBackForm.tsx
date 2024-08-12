import { buttonNextBackProps } from "../../interfaces/Form"
import FormCSS from '../../styles/FormCSS.module.css'
import IconArrowForward from '../../../../assets/MaterialSymbolsArrowForwardIos.svg'
import IconArrowBack from '../../../../assets/MaterialSymbolsArrowBackIos.svg'

export const ButtonNextBackForm = ({setNumber,initial,final}:buttonNextBackProps) => {
    return (
        <div className={FormCSS['buttonsNextBack']}>
            {!initial && <button
                className={FormCSS['buttonBack']}
                onClick={(e)=>{
                    e.preventDefault()
                    setNumber((value)=>{
                        return value - 1
                    })
                }
                    
            }
        >
            <img src={IconArrowBack} alt="Atr
            a" className={FormCSS['imgButton']}/>
            Anterior
            </button>
            }
            {!final && <button
                className={FormCSS['buttonNext']}
                onClick={(e)=>{
                    e.preventDefault()
                    setNumber((value)=>{
                        return value + 1
                    })
                }
                    
            }
        >
            Siguiente
            <img src={IconArrowForward} alt="Adelante" className={FormCSS['imgButton']}/>
            </button>
            }
        </div>
    )
}