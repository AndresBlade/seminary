import CreateAssessmentsStyles from '../style/CreateAssessments.module.css'
import { ContentContainer } from '../../ui/container/components/ContentContainer'
import DataHeader from '../../period/components/DataHeader'
import DataContent from '../../period/components/DataContent'
import { Evaluation, TestsSubject } from '../interfaces/CreateAssessmentsInterfaces'
import Modal from '../../period/components/Modal'
import Input from '../../period/components/Input'
import closeModal from '../../../assets/MaterialSymbolsClose.svg'
import { useContext, useState,useEffect } from 'react'
import { SelectForm } from '../../form/components/small_components/SelectForm'
import { AuthContext } from '../../login/context/AuthContext'
import {GetSubjects} from '../helpers/GetSubjects'
import { AcademicTerm } from '../../registration/interfaces/interfaces'
import { GetAcademicTerm } from '../../registration/helpers/GetAcademicTerm'
import { Subjects } from '../interfaces/CreateAssessmentsInterfaces'
import { CreateTests } from '../helpers/CreateTests'
import { GetTestsSubject } from '../helpers/GetTestsSubject'


export const CreateAssessments = () => {
    const {user} = useContext(AuthContext)
    const idUser= user?.person_id;
    const [data,setData]=useState<Subjects[]>([])
    const [academicTermActive, setAcademicTermActive]=useState<AcademicTerm[]>([])
    const [error, setError]=useState(false)
    const [evaluationsToShow, setEvaluationsToShow]=useState<TestsSubject[]>([])
    const academicTermActiveToSend = academicTermActive
    ? academicTermActive
        .filter((academicTerm) => academicTerm.status === "ACTIVO")
        .map((academicTerm) => academicTerm.id)
    : [0];
    const subjectsProfessor = data?.filter(subject => 
        subject.instruction.some(instruction => 
            instruction.academic_term_id === academicTermActiveToSend[0] && instruction.professor_id === idUser
        )
    );
    console.log(subjectsProfessor)
    const [showModal, setShowModal] = useState(false)
    const [evaluations, setEvaluations]=useState([
        {description:"",maximum_score:0},
        {description:"",maximum_score:0},
    ])
    const [subjectSelected, setSubjectSelected]=useState(0);
    const handleAddEvaluation = ()=>{
        if(evaluations.length < 6){
            setEvaluations([...evaluations, {description:"",maximum_score:0}])
        }
    }
    const handleRemoveEvaluation =(index:number)=>{
        if(evaluations.length > 2){
            setEvaluations(evaluations.filter((_,i)=> i !== index))
        }
    }
    const handleDescriptionChange = (index: number, value: string) => {
        const newEvaluations = [...evaluations];
        newEvaluations[index].description = value;
        setEvaluations(newEvaluations);
    };

    const handleScoreChange = (index: number, value: number) => {
        const newEvaluations = [...evaluations];
        newEvaluations[index].maximum_score = value;
        setEvaluations(newEvaluations);
    };
    const calculateTotalScore = (evaluations:Evaluation[] | TestsSubject[])=>{
        let total = 0;
        evaluations.length > 0 ? evaluations.forEach(evaluations=>{
            if (evaluations?.maximum_score !== undefined){
                total += evaluations.maximum_score
            }
        }): total = 0;
        return total
    }

    const totalScore = ~~calculateTotalScore(evaluations) ?? 0;
    const TotalScoreSubjectResgistered = calculateTotalScore(evaluationsToShow) ?? 0;

    
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(!user?.token) return
        console.log(evaluations)

        CreateTests({subject_id:subjectSelected,academic_term_id:academicTermActiveToSend[0],tests:evaluations,token:user.token}).then(response=>{
            if(response.ok){
                alert('Evaluaciones registradas correctamente')
                setShowModal(false)
                GetTestsSubject({id:subjectSelected}).then(response=>{
                    setEvaluationsToShow(response)
                }).catch(error=>{
                    setError(true)
                    console.log(error)
                    alert('Error al mostrar las evaluaciones registradas')
                });
            }
        }).catch(error=>{
            console.log(error)
            alert('Error al registrar las evaluaciones')
        })
    }
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
            GetTestsSubject({id:subjectSelected}).then(response=>{
                setEvaluationsToShow(response)
            }).catch(error=>{
                setError(true)
                console.log(error)
                alert('Error al mostrar las evaluaciones registradas')
            });
        }
        
        GetSubjects().then(response=>{
            setData(response)
        }).catch(error=>{
            console.log(error)
            alert('Error al mostrar las materias que imparte')
        })
        if(subjectSelected === 0){
            setEvaluationsToShow([])
        }
    },[subjectSelected])


    return (
        <ContentContainer>
            <div className={CreateAssessmentsStyles.selectSubject}>
            <SelectForm
                value={subjectSelected}
                onChange={(e) => setSubjectSelected(parseInt(e.target.value))}
            >
                <option value="0" selected>
                Seleccionar materia
                </option>
                {subjectsProfessor?.map((subject) => (
                <option value={subject.id} key={subject.id}>
                    {subject.description}
                </option>
                ))}
            </SelectForm>
            </div>
            <div className={CreateAssessmentsStyles.addNewEvaluationContainer}>
            <h2>Lista de evaluaciones</h2>
            
            <button
                disabled={subjectSelected === 0 || TotalScoreSubjectResgistered ===100}
                className={CreateAssessmentsStyles.buttonAddNewEvaluation}
                onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
                }}
            >
                Agregar nuevo
            </button>
            </div>
            <DataHeader>
                <p>Descripción</p>
                <p className={CreateAssessmentsStyles.scoreTitle}>%</p>
            </DataHeader>
            {error ? (
            <p>Error al traer los datos</p>
            ) : evaluationsToShow.length === 0 ? (
            <p>No hay evaluaciones para mostrar</p>
            ) : (
            evaluationsToShow?.map((test) => (
                <DataContent
                key={test.id}
                className={CreateAssessmentsStyles.testShow}
                >
                    <p>{test.description}</p>
                    <p>{test.maximum_score}</p>
                </DataContent>
            ))
            )}
            <div>
            <p>Total:{TotalScoreSubjectResgistered}%</p>
            </div>

        {showModal === true ? (
            <Modal setShowModal={setShowModal}>
                <form
                action="POST"
                onSubmit={handleSubmit}
                className={CreateAssessmentsStyles.dataAddNewEvaluation}
                >
                <h3>Agregar evaluación</h3>
                {evaluations.map((evaluation, index) => (
                    <div
                    key={index}
                    className={CreateAssessmentsStyles.cardEvaluation}
                    >
                    <div className={CreateAssessmentsStyles.cardEvaluationHeader}>
                        <p>Descripción</p>
                        {evaluations.length > 2 && (
                        <button onClick={() => handleRemoveEvaluation(index)}>
                            <img src={closeModal} alt="" />
                        </button>
                        )}
                    </div>
                    <Input
                        type="text"
                        value={evaluation.description}
                        onChange={(e) =>
                        handleDescriptionChange(index, e.target.value)
                        }
                    />
                    <p>Ponderación</p>
                    <Input
                        type="number"
                        min={0}
                        value={evaluation.maximum_score}
                        onChange={(e) =>
                        handleScoreChange(index, parseFloat(e.target.value))
                        }
                    />
                    </div>
                ))}
                {evaluations.length < 6 && totalScore < 100 && (
                    <button
                    type="button"
                    onClick={handleAddEvaluation}
                    className={CreateAssessmentsStyles.buttonAdd}
                    >
                    Agregar Evaluación
                    </button>
                )}
                <button
                    type="submit"
                    disabled={totalScore !== 100}
                    className={CreateAssessmentsStyles.buttonSave}
                    onClick={() => {
                    console.log("sexo");
                    }}
                >
                    Guardar
                </button>
                </form>
            </Modal>
            ) : null}
        </ContentContainer>
    );
}