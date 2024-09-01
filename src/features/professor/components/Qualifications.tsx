import { useState,useEffect, useContext } from 'react'
import CreateAssessmentsStyles from '../style/CreateAssessments.module.css'
import { ContentContainer } from '../../ui/container/components/ContentContainer'
import { SelectForm } from '../../form/components/small_components/SelectForm'
import UseGet from '../../../shared/hooks/useGet'
import { Data, Subjects } from '../interfaces/CreateAssessmentsInterfaces'
import { AcademicTerm } from '../../registration/interfaces/interfaces'
import { GetAcademicTerm } from '../../registration/helpers/GetAcademicTerm'
import { AuthContext } from '../../login/context/AuthContext'
import { GetSeminarianListTestScore } from '../helpers/GetSeminarianListTestScore'
import DataHeader from '../../period/components/DataHeader'
import { CreateTestScore } from '../helpers/CreateTestScore'

export const Qualifications = () => {
    const {user} = useContext(AuthContext)
    const idUser= user?.person_id;
    const [academicTermActive, setAcademicTermActive]=useState<AcademicTerm[]>([])
    const academicTermActiveToSend = academicTermActive
        ? academicTermActive
            .filter((academicTerm) => academicTerm.status === "ACTIVO")
            .map((academicTerm) => academicTerm.id)
        : [0];
    const [subjectSelected, setSubjectSelected]=useState(0)
    const apiUrl=`http://127.0.0.1:3000/subject/inst`
    const {data} = UseGet<Subjects[]>(apiUrl)
    const subjectsProfessor = data?.filter(subject => 
        subject.instruction.some(instruction => 
            instruction.academic_term_id === academicTermActiveToSend[0] && instruction.professor_id === idUser
        )
    );
    const [showSeminarianList, setShowSeminarianList]=useState<Data | null>(null)
    const [enableEdit, setEnableEdit]=useState(true);

    useEffect(()=>{
        GetAcademicTerm().then(response=>{
            setAcademicTermActive(response);
        }).catch(error=>{
            console.error(error);
            alert('Error al traer periodo academico activo');
            
        })
    },[])
    useEffect(()=>{
        if(subjectSelected !== 0){
            GetSeminarianListTestScore({subject_id:subjectSelected,academic_term_id:academicTermActiveToSend[0]}).then(response=>{
                setShowSeminarianList(response)
            }).catch(error=>{
                console.log(error)
                alert('Error al traer la lista de seminarista')
            })
        }
    },[subjectSelected])

    return (
        <ContentContainer>
            <div className={CreateAssessmentsStyles.selectSubject}>
                <SelectForm value={subjectSelected} onChange={(e)=>{
                    setSubjectSelected(parseInt(e.target.value))
                }}>
                    <option value="0" selected>Seleccionar materia</option>
                    {subjectsProfessor?.map(subject=>
                        <option key={subject.id} value={subject.id}>{subject.description}</option>
                    )}
                </SelectForm>
            </div>
            <div className={CreateAssessmentsStyles.titleButtonEditContainer}>
                <h3>Lista de estudiantes</h3>
                <button type='button' disabled={subjectSelected === 0} onClick={(e)=>{
                e.preventDefault()
                setEnableEdit(enableEdit ? false : true)
                }} className={CreateAssessmentsStyles.buttonEditEnable}>
                    Editar notas
                </button>
            </div>
            <div className={CreateAssessmentsStyles.dataContainer}>
            <DataHeader>
                <p>Seminarista</p>
                {showSeminarianList === null ? <p>No hay datos para mostrar</p>:
                showSeminarianList?.tests.map(test=>(
                        <p key={test.id} className={CreateAssessmentsStyles.nameTest}>{test.description}
                            <p className={CreateAssessmentsStyles.scoreTest}>Ponderación:{test.maximum_score}</p>
                        </p>
                ))
                
                }
            </DataHeader>
            {
            showSeminarianList?.seminarians.length === 0 || showSeminarianList?.tests.length === 0 ? <p>No hay datos para mostrar</p>:

            showSeminarianList?.seminarians.map(seminarian=>(
                    <div key={seminarian.seminarian_id} className={CreateAssessmentsStyles.dataSeminarian}>
                        <p className={CreateAssessmentsStyles.nameSeminarian}>
                            {seminarian.seminarian_forename + ' ' +
                            seminarian.seminarian_surname}
                            <p className={CreateAssessmentsStyles.seminarianId}>{seminarian.seminarian_id}</p>
                        </p> 
                        {
                            seminarian.test_score.map(test => {
                                const score = seminarian.test_score.find(score => score.test_id === test.test_id);
                                return (
                                    <div key={test.test_id} className={CreateAssessmentsStyles.testsScore}>
                                        <input
                                            key={test.test_id}
                                            disabled={enableEdit}
                                            type="number"
                                            value={score ? score.score : 0}
                                            min={1}
                                            max={20}
                                            onChange={(e)=>{
                                                setShowSeminarianList(data=>{
                                                    if(!data) return null
                                                    const dataClone = {...data}
                                                    const index = dataClone.seminarians.findIndex(seminarianClone=>
                                                        seminarianClone.enrollment_id === seminarian.enrollment_id
                                                    )
                                                    if(index === -1) return null
                                                    const testScoreIndex = dataClone.seminarians[index].test_score.findIndex(testScoreClone=>
                                                        testScoreClone.test_id === score?.test_id
                                                    )
                                                    if(testScoreIndex === -1)return null
                                                    dataClone.seminarians[index].test_score[testScoreIndex].score = e.target.value
                                                    return dataClone
                                                })
                                            }}
                                        />
                                        <p>/20</p>
                                    </div>
                                );
                            })
                            
                        }
                    </div>               
                ))
                }
            </div>
            
            {enableEdit === false ?
                <div className={CreateAssessmentsStyles.buttonActionsContainer}>
                    <button className={CreateAssessmentsStyles.buttonCancel}
                        onClick={(e)=>{
                            e.preventDefault()
                            setSubjectSelected(0)
                            setShowSeminarianList(null)
                            setEnableEdit(true)
                        }}
                        >Cancelar
                    </button>
                    <button type='submit' className={CreateAssessmentsStyles.buttonSave}
                        onClick={(e)=>{
                            e.preventDefault();
                            const testScores=showSeminarianList?.seminarians.map(seminarian=>{
                                return {
                                    enrollment_id:seminarian.enrollment_id,
                                    test: seminarian.test_score.map(testScore=>
                                    ({...testScore, score:+testScore.score})
                                    )
                                }
                                
                            })
                            if(!testScores) return
                            if(!user) return
                            CreateTestScore({data:{tests_score:testScores},token:user?.token}).then(response=>{
                                if(response.ok){
                                    GetSeminarianListTestScore({subject_id:subjectSelected,academic_term_id:academicTermActiveToSend[0]}).then(response=>{
                                        setShowSeminarianList(response)
                                    }).catch(error=>{
                                        console.log(error)
                                        alert('Error al traer la lista de seminarista')
                                    })
                                }
                            }).catch(error=>{
                                console.log(error)
                                alert(error)
                            })
                        }}
                        >Guardar
                    </button>
                </div>
            : null
            }
            
        </ContentContainer>
    )
}

export default Qualifications
