import {Dispatch, SetStateAction, useState } from 'react'
import Worker from '../styles/worker.module.css'
import Close from '../../../assets/MaterialSymbolsCloseSmallOutlineRounded.svg'
import UseGet from '../../../shared/hooks/useGet'
import { SocialMedia } from './WorkerCreate'

interface WorkerModalProps{
    id:number,
    description: string
    icon: string
}
interface WorkerFormSocialMediaProps{
    setModal: Dispatch<SetStateAction<boolean>>
    modal: boolean
    workerSocialMedia:{
        category?: number,
        link: string
    }[]
    setWorkerSocialMedia: Dispatch<SetStateAction<SocialMedia[]>>
}
const WorkerFormSocialMedia = ({workerSocialMedia,setModal,modal,setWorkerSocialMedia, }:WorkerFormSocialMediaProps) => {
    const apiUrl= 'http://localhost:3000/worker/socials/'
    const {data,loading,error} = UseGet(apiUrl)
    const [input,setInput] = useState<WorkerModalProps[]>([])
    
    return (
        <div className={Worker['worker-create__form-inputs']}>
            <h2>Redes Sociales</h2>
            <div className={Worker['worker-create__form--socialMedia']}>
                {(input as [])?.map((socialMedia:WorkerModalProps)=>{
                    return(
                        <div className={Worker[`worker-create__form--${socialMedia.description}`]} key={socialMedia.id}>
                        <div className={Worker['worker-create__form--close']}>
                            <label htmlFor={socialMedia.description} className={Worker[`worker-create__form-${socialMedia.description}--label`]}>
                                <img src={`http://${socialMedia.icon}`} alt={socialMedia.description} />
                                {socialMedia.description}
                            </label>
                            <button
                                onClick={(e)=>{
                                    e.preventDefault()
                                    setWorkerSocialMedia((socialInfo)=>socialInfo.filter((social)=>social.category !== socialMedia.id))
                                    setInput((socialInfo)=>{
                                        return socialInfo.filter((social)=>social.id !== socialMedia.id)
                                    })
                                }}
                            ><img src={Close} alt="Cerrar" /></button>
                        </div>
                        
                        <input type="text" name={socialMedia.description} id={socialMedia.description} value={workerSocialMedia.find(workerSocialMediaElement=>{
                            return workerSocialMediaElement.category === socialMedia.id
                        })?.link} onChange={(e)=>{
                            e.preventDefault()
                            setWorkerSocialMedia((social)=>{
                                const filterSocial = social.map((socialMediaFilter)=>{
                                    if(socialMediaFilter.category === socialMedia.id){
                                        return {...socialMediaFilter, link: e.target.value}
                                    }
                                    return socialMediaFilter
                                })
                                return filterSocial
                            })
                        }}/>
                    </div>
                    )
                })}      
                </div>
                <div className={Worker['worker-create__form--buttonAdd']}>
                        <button onClick={(e)=>{
                            e.preventDefault()
                            setModal(true)
                        }}>
                            Agregar red social
                        </button>
                    </div>
                
                {
                modal ?
                    <div className={Worker['worker-create__form--modal-container']}>
                        <div className={Worker['worker-create__form--modal']}>
                            <div className={Worker['worker-create__form--modal-close']}>
                                <button onClick={(e)=>{
                                    e.preventDefault()
                                    setModal(false)
                                }}>
                                    <img src={Close} alt="close" />
                                </button>
                            </div>
                            <div className={Worker['worker-create__form--modal-title']}>
                                <h2>Seleccione una red social</h2>
                            </div>
                            <div className={Worker['worker-create__form--modal-options']}>
                                {loading ? <div className={Worker['animation-container']}>
                                    <div className={Worker['animation-loading']}></div>
                                    <div className={Worker['animation-loading__two']}></div>
                                </div> : 
                                error ? <p>Hubo un error</p> :
                                (data as [])?.map((social:WorkerModalProps)=>{
                                    return(
                                        <button key={social.id} onClick={(e)=>{
                                            e.preventDefault()
                                            setWorkerSocialMedia((socialMediaInfo)=>{
                                                return[...socialMediaInfo, {category: social.id, link: ''} ]
                                            })
                                            setInput((socialInfo)=>{
                                                return [...socialInfo, social]
                                            })
                                            setModal(false)
                                        }}> 
                                            <img src={`http://${social.icon}`} alt={social.description} />
                                            {social.description}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    : null
                }
        </div>
    )
}

export default WorkerFormSocialMedia
