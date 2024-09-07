import  { useContext, useEffect, useState } from 'react'
import { ContentContainer } from '../../ui/container/components/ContentContainer';
import { GetAcademicTermSeminarianInterfaces, NotesBySubjectSeminarianInterfaces } from '../interfaces/seminarian';
import { GetAcademicTermSeminarian } from '../helpers/GetAcademicTermSeminarian';
import { AuthContext } from '../../login/context/AuthContext';
import { GetNotesByPeriod } from '../helpers/GetNotesByPeriod';
import AcademicTermSeminarian from './AcademicTermSeminarian';
import SubjectsSeminarian from './SubjectsSeminarian';
import Modal from '../../period/components/Modal';
import SeminarianCSS from '../styles/seminarianCSS.module.css'
export const SeminarianNotes = () => {
    const {user}=useContext(AuthContext)
    const [period,setPeriod]=useState<number>(0);
    const [dataAcademicterm, setDataAcademicTerm]=useState<GetAcademicTermSeminarianInterfaces | null>(null);
    const [notesByPeriod, setNotesByPeriod]=useState<NotesBySubjectSeminarianInterfaces[] | null>(null)
    const [showModal,setShowModal]=useState(false)
    const [scoreDetailsBySubject,setScoreDetailsBySubject]=useState(0);
    
    console.log(dataAcademicterm)

    useEffect(()=>{
        if(!user)return
        GetAcademicTermSeminarian({id:user?.person_id,token:user.token}).then(response=>{
            setDataAcademicTerm(response)
        }).catch(error=>{
            alert('Error al consultar los periodos academicos')
            console.log(error)
        })
        if(period !== 0){
            GetNotesByPeriod({id:user.person_id,period:period,token:user.token}).then(response=>{
                setNotesByPeriod(response)
            }).catch(error=>{
                alert('Error al mostrar las notas')
                console.log(error)
            })
        }
    },[period])

    return (
        <ContentContainer>
            <AcademicTermSeminarian
                setPeriod={setPeriod}
                dataAcademicterm={dataAcademicterm}
            />
            <SubjectsSeminarian
                notesByPeriod={notesByPeriod}
                setShowModal={setShowModal}
                setScoreDetailsBySubject={setScoreDetailsBySubject}
                dataAcademicTerm={dataAcademicterm}
            />
            {showModal ? (
                <Modal setShowModal={setShowModal}>
                    <div className={SeminarianCSS.detailsSubjectHeader}>
                        <p>
                            Notas detalladas
                        </p>
                    </div>
                    {notesByPeriod?.map(subject => 
                        subject.enrollment.find(enrollment => {
                            return enrollment.subject_id === scoreDetailsBySubject && enrollment.academic_term_id === period
                        })
                    ).map(enrollment =>
                        enrollment?.test_score.map(testScore=>
                            <div key={enrollment.subject_id} className={SeminarianCSS.testDetails}>
                                <p>{testScore.test_description}</p>
                                <p>{testScore.test_score_out_max_test_score}</p>
                            </div>
                        )
                    )}
                </Modal>
            ) :null

            }
        </ContentContainer>
    )
}


