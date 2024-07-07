import { useState } from 'react'
import FormCSS from '../styles/FormCSS.module.css'
import {SocialMediaCard} from './small_components/SocialMediaCard'
import { SocialMediaInputProps } from '../interfaces/Form'
import { socialMediaModalProps } from '../interfaces/Form'
import { TitleForm } from './small_components/TitleForm'
import { LabelForm } from './small_components/LabelForm'
import { InputForm } from './small_components/InputForm'
import IconClose from '../../../assets/MaterialSymbolsClose.svg'
import UseGet from '../../../shared/hooks/useGet'


export const SocialMediaForm = ({setModal, modal, setSocialMedia,socialMedia}:socialMediaModalProps) => {
    const apiUrl = 'http://localhost:3000/worker/socials/';
    const {data,loading,error} = UseGet<SocialMediaInputProps[]>(apiUrl);
    const [input,setInput] = useState<SocialMediaInputProps[]>([]);
    
    console.log(input)

    return (
        <div className={FormCSS['socialMediaInfo']}>
            {(input as [])?.map((socialMedia:SocialMediaInputProps)=>{
                return(
                    <div className={FormCSS['socialMediaSelected']} key={socialMedia.id}>
                        <div className={FormCSS['socialMediaSelectedInfo']}>
                            <div>
                                <img src={`http://${socialMedia.icon}`} alt={socialMedia.description} className={FormCSS['imgSelected']} />
                                <LabelForm>{socialMedia.description}</LabelForm>
                            </div>
                            <button className={FormCSS['buttonSelected']} onClick={(e)=>{
                                e.preventDefault()
                                setSocialMedia((socialInfo)=>socialInfo.filter((social)=>social.category !== socialMedia.id))
                                setInput((socialInfo)=>{
                                    return socialInfo.filter((social)=>social.id !== socialMedia.id)
                                })
                            }}>
                                <img src={IconClose} alt='cerrar' className={FormCSS['closeSocialMediaSelected']}/>

                            </button>
                        </div>
                        
                        <InputForm type='text' id={socialMedia.id.toString()}
                        
                            onChange={(e)=>{
                                e.preventDefault()
                                setSocialMedia((social)=>{
                                    const filterSocial = social.map((socialMediaFilter)=>{
                                        if(socialMediaFilter.category === socialMedia.id){
                                            return {...socialMediaFilter, link:e.target.value}
                                        }
                                        return socialMediaFilter
                                    })
                                    return filterSocial
                                })
                            }}
                        />


                    </div>
                    )
                })
            }

            <button
                className={FormCSS['addSocialMedia']}
                onClick={(e)=>{
                        e.preventDefault()
                        setModal(true)
                    }
                }
            >
                Agregar red social
            </button>

            {modal ? 
                <div className={FormCSS['modalContainer']}>
                    <div className={FormCSS['modalBody']}>
                        <div className={FormCSS['modalHeader']}>
                            <TitleForm title='Seleccionar red social'/>
                            <button
                                onClick={(e)=>{
                                    e.preventDefault()
                                    setModal(false)
                                }}
                            >
                                <img src={IconClose} alt="Cerrar" className='closeModal' />
                            </button>
                        </div>
                        <div className={FormCSS['modalContent']}>
                            {
                                data?.filter((socialFilter)=> !input.some(inputItem => inputItem.id === socialFilter.id)).map((socialMediaData)=>{
                                    return(
                                        <SocialMediaCard key={socialMediaData.id}
                                            onClick={(e)=>{
                                                e.preventDefault()
                                                setSocialMedia((socialMediaInfo)=>{
                                                    return[...socialMediaInfo,{category:socialMediaData.id,link:''}]
                                                })
                                                setInput((socialInfo)=>{
                                                    return [...socialInfo, socialMediaData]
                                                })
                                                setModal(false)

                                                
                                            }}
                                        >
                                            <img src={`http://${socialMediaData.icon}`} alt={socialMediaData.description} className={FormCSS['socialMediaImg']} />
                                            {socialMediaData.description}
                                        </SocialMediaCard>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            :null
            }
        </div>
    )
}

