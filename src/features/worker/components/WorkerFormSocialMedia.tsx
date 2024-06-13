import { Dispatch, useState, SetStateAction } from 'react'
import Worker from '../styles/worker.module.css'
import IconFacebook from '../../../assets/FacebookIcon.svg'
import IconInstagram from '../../../assets/InstagramIcon.svg'
import IconTwitter from '../../../assets/XIcon.svg'
import IconLinkedin from '../../../assets/LinkedinIcon.svg'
import IconYoutube from '../../../assets/YoutubeIcon.svg'
import IconTiktok from '../../../assets/TiktokIcon.svg'
import Close from '../../../assets/MaterialSymbolsCloseSmallOutlineRounded.svg'

interface WorkerFormSocialMediaProps{
    setModal: Dispatch<SetStateAction<boolean>>
    modal: boolean
}

const WorkerFormSocialMedia = ({setModal,modal}:WorkerFormSocialMediaProps) => {
    const [facebook, setFacebook] = useState<boolean>(false)
    const [instagram, setInstagram] = useState<boolean>(false)
    const [twitter, setTwitter] = useState<boolean>(false)
    const [linkedin, setLinkedin] = useState<boolean>(false)
    const [youtube, setYoutube] = useState<boolean>(false)
    const [tiktok, setTiktok] = useState<boolean>(false)

    return (
        <div className={Worker['worker-create__form-inputs']}>
            <h2>Redes Sociales</h2>
            <div className={Worker['worker-create__form--socialMedia']}>
                {facebook ?
                    <div className={Worker['worker-create__form--facebook']}>
                        <div>
                            <label htmlFor="facebook" className={Worker['worker-create__form-facebook--label']}>
                                <img src={IconFacebook} alt="" />
                                Facebook
                            </label>
                            <button className={Worker['']} onClick={(e)=>{
                                e.preventDefault()
                                setFacebook(false)
                            }} >
                                <img src={Close} alt="close" />
                            </button>
                        </div>
                        
                        <input type="text" name="facebook" id="facebook" />
                    </div>
                    : instagram ?
                    <div className={Worker['worker-create__form--instagram']}>
                        <div>

                            <label htmlFor="instagram" className={Worker['worker-create__form-instagram--label']}>
                                <img src={IconInstagram} alt="" />
                                Instagram</label>
                            <button className={Worker['']} onClick={(e)=>{
                                e.preventDefault()
                                setInstagram(false)
                            }} >
                                <img src={Close} alt="close" />
                            </button>
                        </div>
                            <input type="text" name="instagram" id="instagram" />
                    </div>
                    : twitter ?
                    <div className={Worker['worker-create__form--twitter']}>
                        <div>

                            <label htmlFor="twitter" className={Worker['worker-create__form-twitter--label']}>
                                <img src={IconTwitter} alt="" />
                                Twitter</label>
                            <button className={Worker['']} onClick={(e)=>{
                                e.preventDefault()
                                setTwitter(false)
                            }} >
                                <img src={Close} alt="close" />
                            </button>
                        </div>
                            <input type="text" name="twitter" id="twitter" />
                    </div>
                    : linkedin ?
                    <div className={Worker['worker-create__form--linkedin']}>
                        <div>

                            <label htmlFor="linkedin" className={Worker['worker-create__form-linkedin--label']}>
                                <img src={IconLinkedin} alt="" />
                                Linkedin</label>
                            <button className={Worker['']} onClick={(e)=>{
                                e.preventDefault()
                                setLinkedin(false)
                            }}  >
                                <img src={Close} alt="close" />
                            </button>
                            
                        </div>
                        <input type="text" name="linkedin" id="linkedin" />
                    </div>
                    : youtube ?
                    <div className={Worker['worker-create__form--youtube']}>
                        <div>
                            <label htmlFor="Youtube" className={Worker['worker-create__form-youtube--label']}>
                                <img src={IconYoutube} alt="" />
                                Youtube</label>
                            <button className={Worker['']} onClick={(e)=>{
                                e.preventDefault()
                                setYoutube(false)
                            }} >
                                <img src={Close} alt="close" />
                            </button>
                        </div>
                        
                        <input type="text" name="youtube" id="youtube" />
                    </div>
                    : tiktok ?
                    <div className={Worker['worker-create__form--tiktok']}>
                        <div>

                            <label htmlFor="tiktok" className={Worker['worker-create__form-tiktok--label']}>
                                <img src={IconTiktok} alt="" />
                                Tiktok</label>
                            <button className={Worker['']} onClick={(e)=>{
                                e.preventDefault()
                                setTiktok(false)
                            }} >
                                <img src={Close} alt="close" />
                            </button>
                        </div>
                        <input type="text" name="tiktok" id="tiktok" />
                    </div>
                    : null
                }
                    <div className={Worker['worker-create__form--buttonAdd']}>
                        <button onClick={(e)=>{
                            e.preventDefault()
                            setModal(true)
                        }}>
                            Agregar red social
                        </button>
                    </div>
                {modal ?
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
                                <button onClick={(e)=>{
                                    e.preventDefault()
                                    setFacebook(true)
                                                                                                                                        setModal(false)
                                }}>
                                    <img src={IconFacebook} alt="Facebook" />
                                    Facebook
                                </button>
                                <button onClick={(e)=>{
                                    e.preventDefault()
                                    setInstagram(true)
                                                                                                                                        setModal(false)
                                }}>
                                    <img src={IconInstagram} alt="Instagram" />
                                    Instagram
                                </button>
                                <button onClick={(e)=>{
                                    e.preventDefault()
                                    setTwitter(true)
                                                                                                                                        setModal(false)
                                }}>
                                    <img src={IconTwitter} alt="Twitter" />
                                    Twitter
                                </button>
                                <button onClick={(e)=>{
                                    e.preventDefault()
                                    setLinkedin(true)
                                                                                                                                        setModal(false)

                                }}>
                                    <img src={IconLinkedin} alt="Linkedin" />
                                    Linkedin
                                </button>
                                <button onClick={(e)=>{
                                    e.preventDefault()
                                    setYoutube(true)
                                                                                                                                        setModal(false)
                                }}>
                                    <img src={IconYoutube} alt="Youtube" />
                                    Youtube
                                </button>
                                <button onClick={(e)=>{
                                    e.preventDefault()
                                    setTiktok(true)
                                                                                                                                        setModal(false)
                                }}>
                                    <img src={IconTiktok} alt="Tiktok" />
                                    Tiktok
                                </button>
                            </div>
                        </div>
                    </div>
                    : null
                }
            </div>
        </div>

    )
}

export default WorkerFormSocialMedia
