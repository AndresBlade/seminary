import { Dispatch, SetStateAction } from 'react';
import registrationCSS from '../styles/registrationCSS.module.css'
import { SubjectsProps } from '../interfaces/interfaces';

interface Subject{
    subjectName:string;
    idSubject:number
    setSubjectSelected:Dispatch<SetStateAction<SubjectsProps[]>>
    subjectSelect: number[]
    courses:{
        id:number
            name:string
            semester:string
    }[][]
}

export const Subject = ({subjectName,idSubject,setSubjectSelected,subjectSelect}:Subject) => {

    const subjectStyle = subjectSelect.find(subject=>{
        return subject === idSubject
    }) ? registrationCSS.subjectSelected : registrationCSS.subject

    return (
        <div className={subjectStyle}>
            <p>{subjectName}</p>
            <input type="checkbox" value={idSubject} onChange={(e)=>{
                setSubjectSelected(subjectSelect=>{
                    if(e.target.checked){
                        return[...subjectSelect,{id:idSubject}]
                    }
                    else{
                        return subjectSelect.filter(subject => subject.id !==idSubject)
                    }
                })
            }} />
        </div>
    )
}
