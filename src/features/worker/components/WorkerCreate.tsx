import React, { useState } from 'react'
import Worker from '../styles/worker.module.css'
import IconArrowForward from '../../../assets/IconArrowForward.svg'
import IconArrowBack from '../../../assets/IconArrowBack.svg'
import IconFacebook from '../../../assets/FacebookIcon.svg'
import IconInstagram from '../../../assets/InstagramIcon.svg'
import IconTwitter from '../../../assets/XIcon.svg'
import IconLinkedin from '../../../assets/LinkedinIcon.svg'
import IconYoutube from '../../../assets/YoutubeIcon.svg'
import IconTiktok from '../../../assets/TiktokIcon.svg'

const WorkerCreate = () => {
    const [number, setNumber] = useState<number>(1)
    const [facebook, setFacebook] = useState<boolean>(false)
    const [instagram, setInstagram] = useState<boolean>(false)
    const [twitter, setTwitter] = useState<boolean>(false)
    const [linkedin, setLinkedin] = useState<boolean>(false)
    const [youtube, setYoutube] = useState<boolean>(false)
    const [tiktok, setTiktok] = useState<boolean>(false)
    const [modal, setModal] = useState<boolean>(true)

    return (
        <div className={Worker['worker-create__container']}>
            <div className={Worker['worker-create__container--titles']}>
                <div className={Worker['worker-create__h1-title']}>
                    <h1>Trabajador</h1>
                </div>
                <div className={Worker['worker-create__h2-title']}>
                    <h2>Agregar trabajador</h2>
                </div>
            </div>

            <form className={Worker['worker-create__form']}>
                {number === 1 ?
                    <div>
                        <div className={Worker['worker-create__form-inputs']}>
                    <h2>Información Personal</h2>
                    <div className={Worker['worker-create__form--personal']}>
                        <div className={Worker['worker-create__form--name']}>
                            <label htmlFor="name" className={Worker['worker-create__form-name--label']}>Nombres</label>
                            <input type="text" id='name' className='' />
                        </div>
                        <div className={Worker['worker-create__form--lastName']}>
                            <label htmlFor="lastName" className={Worker['worker-create__form-lastName--label']}>Apellidos</label>
                            <input type="text" id='lastName' />
                        </div>    
                        <div className={Worker['worker-create__form--id']}>                        
                            <label htmlFor="id" className={Worker['worker-create__form-id--label']}>Cedula</label>
                            <input type="text" id='id'/>
                        </div>
                        <div className={Worker['worker-create__form--date']}>                        
                            <label htmlFor="date" className={Worker['worker-create__form-date--label']}>Fecha de nacimiento</label>
                            <input type="date" id='date'/>
                        </div>
                        <div className={Worker['worker-create__form--button']}>
                            <button className={Worker['worker-create__form-button--next']}
                                onClick={(e) => {
                                        e.preventDefault(),
                                        setNumber(2)
                                    }
                                }
                            >
                                Siguiente
                                <img src={IconArrowForward} alt="Forward" />
                            </button>
                        </div>
                    </div>

                </div>
                    </div>
                : number === 2 ?
                    <div>
                        <div className={Worker['worker-create__form-inputs']}>
                            <h2>Información laboral</h2>
                            <div className={Worker['worker-create__form--personal']}>
                                <div className={Worker['worker-create__form--post']}>
                                <label htmlFor="name" className={Worker['worker-create__form-post--label']}>Cargo actual</label>
                                <select name="post" id="post" >
                                    <option value="post1">Post 1</option>
                                    <option value="post2">Post 2</option>
                                    <option value="post3">Post 3</option>
                                </select>
                            </div>
                        <h2>Información de salud</h2>
                        <div className={Worker['worker-create__form--blood']}>
                            <label htmlFor="lastName" className={Worker['worker-create__form-lastName--label']}>Tipo de sangre</label>
                            <select name="blood" id="blood" >
                                <option value="post1">Post 1</option>
                                <option value="post2">Post 2</option>
                                <option value="post3">Post 3</option>
                            </select>                        </div>    
                        <div className={Worker['worker-create__form--condition']}>                        
                            <label htmlFor="id" className={Worker['worker-create__form-id--label']}>Condicion medica</label>
                            <input type="text" name="condition" id="condition" />
                        </div>
                        <div className={Worker['worker-create__form--button']}>
                                    <button className={Worker['worker-create__form-button--back']}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setNumber(1);
                                        }}
                                    >
                                        <img src={IconArrowBack} alt="Forward" />
                                        Anterior
                                    </button>
                                    <button className={Worker['worker-create__form-button--next']}
                                        onClick={(e) => {
                                                e.preventDefault();
                                                setNumber(3);
                                            }
                                        }
                                    >
                                        Siguiente
                                        <img src={IconArrowForward} alt="Forward" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> 
                    : number === 3 ?
                        <div>
                            <div className={Worker['worker-create__form-inputs']}>
                                <h2>Información de contacto</h2>
                                <div className={Worker['worker-create__form--personal']}>
                                    <div className={Worker['worker-create__form--phone']}>
                                        <label htmlFor="phone" className={Worker['worker-create__form-phone--label']}>Teléfono</label>
                                        <input type="text" name="phone" id="phone" />
                                    </div>
                                    <div className={Worker['worker-create__form--email']}>
                                        <label htmlFor="email" className={Worker['worker-create__form-email--label']}>Correo</label>
                                        <input type="email" name="email" id="email" />
                                    </div>
                                    <div className={Worker['worker-create__form--phoneFamily']}>
                                        <label htmlFor="address" className={Worker['worker-create__form-phoneFamily--label']}>Telefono de contacto familiar</label>
                                        <input type="text" name="phoneFamily" id="phoneFamily" />
                                    </div>
                                    <div className={Worker['worker-create__form--nameContact']}>
                                        <label htmlFor="address" className={Worker['worker-create__form-nameContact--label']}>Telefono de contacto familiar</label>
                                        <input type="text" name="nameContact" id="nameContact" value='' />
                                    </div>
                                    <div className={Worker['worker-create__form--button']}>
                                        <button className={Worker['worker-create__form-button--back']}
                                            onClick={(e) => 
                                                {
                                                    e.preventDefault()
                                                    setNumber(2)

                                                }
                                            }
                                        >
                                            <img src={IconArrowBack} alt="Forward" />
                                            Anterior
                                        </button>
                                        <button className={Worker['worker-create__form-button--next']}
                                            onClick={(e) =>{
                                                e.preventDefault()
                                                setNumber(4)}
                                            }
                                        >
                                            Siguiente
                                            <img src={IconArrowForward} alt="Forward" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : number === 4 ? 
                            <div className='worker-create__form--inputs-media'>
                                <div className={Worker['worker-create__form-inputs']}>
                                    <h2>Redes Sociales</h2>
                                    <div className={Worker['worker-create__form--socialMedia']}>
                                        {facebook ?
                                            <div className={Worker['worker-create__form--facebook']}>
                                                <label htmlFor="facebook" className={Worker['worker-create__form-facebook--label']}>Facebook</label>
                                                <input type="text" name="facebook" id="facebook" />
                                            </div>
                                            : instagram ?
                                            <div className={Worker['worker-create__form--instagram']}>
                                                <label htmlFor="instagram" className={Worker['worker-create__form-instagram--label']}>Instagram</label>
                                                <input type="text" name="instagram" id="instagram" />
                                            </div>
                                            : twitter ?
                                            <div className={Worker['worker-create__form--twitter']}>
                                                <label htmlFor="twitter" className={Worker['worker-create__form-twitter--label']}>Twitter</label>
                                                <input type="text" name="twitter" id="twitter" />
                                            </div>
                                            : linkedin ?
                                            <div className={Worker['worker-create__form--linkedin']}>
                                                <label htmlFor="linkedin" className={Worker['worker-create__form-linkedin--label']}>Linkedin</label>
                                                <input type="text" name="linkedin" id="linkedin" />
                                            </div>
                                            : youtube ?
                                            <div className={Worker['worker-create__form--youtube']}>
                                                <label htmlFor="Youtube" className={Worker['worker-create__form-youtube--label']}>Youtube</label>
                                                <input type="text" name="youtube" id="youtube" />
                                            </div>
                                            : tiktok ?
                                            <div className={Worker['worker-create__form--tiktok']}>
                                                <label htmlFor="tiktok" className={Worker['worker-create__form-tiktok--label']}>Tiktok</label>
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
                                                            X
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
                                        <div className={Worker['worker-create__form--button']}>
                                            <button className={Worker['worker-create__form-button--back']}
                                                onClick={(e) => 
                                                    {
                                                        e.preventDefault()
                                                        setNumber(3)
                                                    }
                                                }
                                            >
                                                <img src={IconArrowBack} alt="Forward" />
                                                Anterior
                                            </button>
                                            <button className={Worker['worker-create__form-button--next']}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    setNumber(5)
                                                }}
                                            >
                                                Siguiente
                                                <img src={IconArrowForward} alt="Forward" />
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        : number === 5 ?
                        <div>
                                <div className={Worker['worker-create__form-inputs']}>
                                    <h2>Foto del trabajador</h2>
                                    <div className={Worker['worker-create__form--photo']}>
                                        <div className={Worker['worker-create__form--facebook']}>
                                            <img src="" alt="photoWorker" />
                                            <label htmlFor="facebook" className={Worker['worker-create__form-facebook--label']}>Seleccione una foto</label>
                                            <input type="file" name="photo" id="photo" />
                                        </div>
                                        <div className={Worker['worker-create__form--button']}>
                                            <button className={Worker['worker-create__form-button--back']}
                                                onClick={(e) => 
                                                    {
                                                        e.preventDefault()
                                                        setNumber(4)
                                                    }
                                                }
                                            >
                                                <img src={IconArrowBack} alt="Forward" />
                                                Anterior
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        : null
                        
                }
            </form>
        </div>
    )
}

export default WorkerCreate
