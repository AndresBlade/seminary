import React, { useContext, useEffect, useState } from 'react'
import EquivalencesCSS from '../styles/EquivalencesCSS.module.css'
import { ContentContainer } from '../../ui/container/components/ContentContainer'
import { seminarian, subjects } from '../interfaces/equivalences'
import { SelectSubjectAndSeminarian } from './SelectSubjectAndSeminarian'
import { GetSeminariansToEquivalences } from '../helpers/GetSeminariansToEquivalences'
import { GetSubjectToEquivalences } from '../helpers/GetSubjectToEquivalences'
import { AuthContext } from '../../login/context/AuthContext'
import { CreateEquivalences } from '../helpers/CreateEquivalences'

const EquivalencesCreate = () => {
    const {user}= useContext(AuthContext);
    const [seminariansToSelect, setSeminariansToSelect]=useState<seminarian[] | null>(null)
    const [subjectsToSelect, setSubjectsToSelect]=useState<subjects | null>(null)
    const [seminarianSelect, setSeminarianSelect]=useState('')
    const [subjectSelect, setSubjectSelect]=useState(0)
    const [score, setScore]=useState(0);

    useEffect(()=>{
        if(!user?.token) return
        GetSeminariansToEquivalences(user?.token).then(response=>{
            return (
                setSubjectsToSelect(null),
                setSeminariansToSelect(response))
        }).catch(error=>{
            console.log(error)
            alert('Error al listar los seminaristas para equivalencias')
        })
    },[])

    useEffect(()=>{
        if(seminarianSelect !== ''){
            GetSubjectToEquivalences(seminarianSelect).then(response=>
                setSubjectsToSelect(response)
            ).catch(error=>{
                console.log(error)
                alert('Error al listar las materias para equivalencias')
            })
        }
        if(seminarianSelect === ''){
            setSubjectSelect(0)
            setScore(0)
            setSubjectsToSelect(null)
        }
    },[seminarianSelect])

    const handleSubmit =(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(!user?.token)return

        CreateEquivalences({id:seminarianSelect,subject_id:subjectSelect,score:score,token:user?.token}).then(response=>{
            if(response.ok){
                alert('Registrado con exito')
                setSeminarianSelect('')
                setSubjectsToSelect(null)
                setScore(0)
                setSubjectSelect(0)
            } 
        }).catch(error=>{
            console.log(error)
            alert('Error al inscribir la equivalencia')
        })
        
    }
    console.log(score)
    return (
        <ContentContainer>
            
            <SelectSubjectAndSeminarian
                seminariansToSelect={seminariansToSelect}
                subjectsToSelect={subjectsToSelect}
                seminarianSelect={seminarianSelect}
                subjectSelect={subjectSelect}
                setSeminarianSelect={setSeminarianSelect}
                setSubjectSelect={setSubjectSelect}
            />
            {subjectSelect !== 0 ? (
                <div className={EquivalencesCSS.scoreAndButtonContainer}>
                    <p>Calificación</p>
                    <input
                    className={EquivalencesCSS.inputScore}
                        type='text'
                        min={0}
                        max={100}
                        onChange={(e)=>{{
                            if(+e.target.value < 0){ e.target.value = '0'}
                            
                            setScore(parseFloat(parseFloat(e.target.value).toFixed(2)))
                        }}}
                        onKeyDown={(event) => {
                            const allowedKeys = [
                                'ArrowLeft', 'ArrowRight', 'Delete', 'Enter',
                                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'
                            ];
                            if (!allowedKeys.includes(event.key)) {
                                event.preventDefault();
                            }
                        }}
                    />
                    <form onSubmit={handleSubmit} className={EquivalencesCSS.buttonsContainer}>
                        <button type='button'
                            className={EquivalencesCSS.buttonCancel}
                            onClick={()=>{
                                setSeminarianSelect('')
                                setSubjectsToSelect(null)
                                setScore(0)
                                setSubjectSelect(0)
                            }}
                        >
                            Cancelar
                        </button>
                        <button type='submit'
                            className={EquivalencesCSS.buttonSend}
                            disabled={score < 60 || score > 100 || Number.isNaN(score)
                            }
                        >
                            Guardar
                        </button>
                        

                    </form>
                </div>

            ) : null
            }
        </ContentContainer>
    )
}

export default EquivalencesCreate
