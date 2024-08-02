import PeriodCSS from '../styles/PeriodCSS.module.css';
import { ContentContainer } from '../../ui/container/components/ContentContainer';
import DataHeader from './DataHeader';
import DataContent from './DataContent'
import AddIcon from '../../../assets/MaterialSymbolsAddCircleOutline.svg'
import Input from './Input'
import editIcon from '../../../assets/editIcon.svg'
import deleteIcon from '../../../assets/deleteIcon.svg'
import { useContext, useEffect, useState } from 'react'
import Modal from './Modal'
import Label from './Label'
import { CreatePeriod, GetPeriod } from '../interfaces/Period'
import { CreateAcademicPeriod } from '../helpers/CreateAcademicPeriod'
import { AuthContext } from '../../login/context/AuthContext'
import useGet from '../../../shared/hooks/useGet';
import { DeletePeriod } from '../helpers/DeletePeriod';
import { GetPeriods } from '../helpers/GetPeriods';
import { UpdateUser } from '../helpers/UpdateUser';
export const Period = () => {
    const apiUrl = 'http://127.0.0.1:3000/AcademicTerm'
    const {user} = useContext(AuthContext)
    const [showModal,setShowModal]=useState(false);
    const [deleteUser, setDeleteUser]= useState(0);
    const {data,loading,error,setData}=useGet<GetPeriod[]>(apiUrl)
    const [updateUser, setUpdateUser]=useState(0);
    const [createPeriod, setCreatePeriod] = useState<CreatePeriod>({
        start_date:'',
        end_date:''
        }
    )

    useEffect(()=>{
        if(!user?.token)return
        if(deleteUser === 0 || updateUser === 0) return
        if(deleteUser !== 0){
            DeletePeriod({id:deleteUser.toString(),token:user?.token,url:apiUrl}).then(()=>{
                    alert('Eliminado correctamente')
                    setDeleteUser(0)
                    return GetPeriods({id:'0'});
            }).then(period => setData(period)).catch(error=>{
                console.log(error)
                alert('Error al eliminar' + error)
            })
        }
        if(updateUser !== 0){
            GetPeriods({id:updateUser.toString()}).then(response=>{
                response.map(period=>{
                    setCreatePeriod({
                        start_date:period.start_strin,
                        end_date: period.end_string
                    })
                })
            }).catch(error=>{
                console.log(error)
                alert('Error al traer datos para actualizar')
                return GetPeriods({id:'0'});
            })
        }
    },[deleteUser,user?.token,setData,updateUser])


    const handleSubmit =(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log('desde el handle')
        if(!user?.token) return

        if(updateUser === 0){
            CreateAcademicPeriod({data:createPeriod,token:user?.token}).then((response)=>{
                if(response.ok){
                    alert('Periodo creado exitosamente')
                    setShowModal(false)
                    return GetPeriods({id:'0'}).then(period=>setData(period)).catch(error=>{
                        console.log(error)
                        alert('Error al listar periodos')
                    })
                    
                }
                else{
                    throw new Error
                }
            }).catch((error)=>{
                console.log(createPeriod)
                alert('Error al crear periodo' + error)
            })
        }else{
            UpdateUser({id:updateUser.toString(), token:user?.token,start_date:createPeriod.start_date,end_date:createPeriod.end_date}).then(()=>{
                alert('actualizado correctamente')
                setUpdateUser(0)
                return GetPeriods({id:'0'});
            }).catch((error)=>{
                console.log(error)
                alert('Error al actualizar')
            })
        }
        
    }

    console.log(data)

    return (
        <ContentContainer>
            <div className={PeriodCSS.addPeriod}>
                <h2>Lista periodos académicos</h2>
                <button className={PeriodCSS.buttonAddPeriod} onClick={(e)=>{
                    e.preventDefault()
                    setShowModal(true)
                }}>
                    <img src={AddIcon} alt="añadir" />
                    Agregar nuevo
                </button>
            </div>
            <div className={PeriodCSS.findPeriod}>
                <Input type='text' placeholder='Busca aquí...'/>
                <button className={PeriodCSS.buttonFind}>
                    Buscar
                </button>
            </div>

            <DataHeader>
                <p>Periodo</p>
                <p>Fecha inicio</p>
                <p>Fecha Final</p>
                <p>Semestre</p>
                <p>Actual</p>
                <p className={PeriodCSS.dataHeaderActions}>Acciones</p>
            </DataHeader>
                {   error ? <p>Error al traer los datos</p>:
                    data?.length === 0 ? <p>No hay datos</p>:
                    data?.map((period)=>(
                        <DataContent key={period.id}>
                            <p>{period.name}</p>
                            <p>{period.start_strin}</p>
                            <p>{period.end_string}</p>
                            <p className={PeriodCSS.dataContentSemester}>{period.semester}</p>
                            <p>{period.status}</p>
                            <div className={PeriodCSS.statusPeriodContainer}>
                                <div className={PeriodCSS.statusPeriod}></div>
                                
                            </div>          
                            <div>
                                <button className={PeriodCSS.buttonActions} onClick={()=>{
                                    setUpdateUser(period.id)
                                    setTimeout(()=>{
                                        setShowModal(true)
                                    },1000)
                                }}>
                                    <img src={editIcon} alt="editar" />
                                </button>
                                <button className={PeriodCSS.buttonActions} onClick={()=>{
                                        setDeleteUser(period.id)
                                    }
                                }>
                                    <img src={deleteIcon} alt="eliminar" />
                                </button>
                            </div>
                        </DataContent>

                    ))
                }
                

            {
                showModal ? (
                    <Modal
                        setShowModal={setShowModal}
                    >
                        <p className={PeriodCSS.titleModal}>Agregar periodo academico</p>

                        <form action="POST" onSubmit={handleSubmit}>
                            <Label>Fecha Inicio</Label>
                            <Input type='date' value={createPeriod.start_date} onChange={(e)=>{
                                e.preventDefault();
                                setCreatePeriod((period)=>{
                                    return {...period, start_date:e.target.value}
                                })
                            }}/>
                            <Label>Fecha Culminación</Label>
                            <Input type='date' value={createPeriod.end_date} onChange={(e)=>{
                                e.preventDefault();
                                setCreatePeriod((period)=>{
                                    return {...period, end_date:e.target.value}
                                })
                            }}/>

                            <button type='submit' className={PeriodCSS.buttonSave}>Guardar</button>
                        </form>
                        
                    </Modal>
                ):null
            }
            
        </ContentContainer>
    )
}
