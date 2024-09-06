import EquivalencesCSS from '../styles/EquivalencesCSS.module.css'
import { SelectForm } from '../../form/components/small_components/SelectForm'
import { seminarian, subjects } from '../interfaces/equivalences'
import React, { SetStateAction } from 'react'

interface selectSubjectAndSeminarianProps{
    seminariansToSelect: seminarian[] | null
    subjectsToSelect:subjects | null
    seminarianSelect:string
    subjectSelect:number
    setSeminarianSelect:React.Dispatch<SetStateAction<string>>
    setSubjectSelect:React.Dispatch<SetStateAction<number>>
}
export const SelectSubjectAndSeminarian = ({seminariansToSelect,subjectsToSelect,seminarianSelect,setSeminarianSelect,setSubjectSelect,subjectSelect}:selectSubjectAndSeminarianProps) => {

    return (
        <div className={EquivalencesCSS.selectSubjectAndSeminarian}>

            <p>Seleccionar seminarista</p>
            <SelectForm value={seminarianSelect} onChange={(e)=>{
                setSeminarianSelect(e.target.value)
            }}>
                <option value="">Seleccionar seminarista</option>
                {seminariansToSelect === null ? <option value="">Error al traer seminaristas</option> :
                seminariansToSelect.map(seminarianToSelect=>
                    <option value={seminarianToSelect.person.id} key={seminarianToSelect.person.id}>{
                            seminarianToSelect.person.forename + ' ' +
                            seminarianToSelect.person.surname + ' '+
                            seminarianToSelect.person.id   
                        }
                    </option> 
                )}
            </SelectForm>

            <p>Seleccionar materia</p>
            <SelectForm value={subjectSelect} onChange={(e)=>{
                if(e.target.value === '') return 0
                setSubjectSelect(+e.target.value)
            }}>
                {subjectsToSelect === null ? <option value="">Seleccionar Materia</option>  :
                subjectsToSelect.enrollment.stage.map(subjectsToSelect=>
                    subjectsToSelect.stage.map(subjectsToSelect=>
                    subjectsToSelect.subject.map(subjects=>
                        <option value={subjects.id} key={subjects.id}>{subjects.name}</option>
                    )
                ))}
            </SelectForm>
        </div>
    )
}
